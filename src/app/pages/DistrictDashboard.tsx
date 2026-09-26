import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Plus, Pencil, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type EventRow = {
  id: string;
  event_name: string;
  registration_deadline: string;
};

type Participant = {
  id: string;
  event_id: string;
  district_id: string;
  name: string;
  dob: string;
  age: number | null;
  gender: 'Male' | 'Female';
  category: 'Senior' | 'Junior' | 'Sub-Junior';
  father_name: string | null;
  mother_name: string | null;
  address: string | null;
  contact_no: string | null;
  email: string | null;
  event_type: 'Team Event' | 'Regu Event' | 'Quad Event' | 'Double Event';
  participant_role: 'Player' | 'Coach' | 'Manager';
};

const EMPTY_FORM = {
  name: '', dob: '', gender: 'Male' as const, category: 'Senior' as const,
  father_name: '', mother_name: '', address: '', contact_no: '', email: '',
  event_type: 'Team Event' as const, participant_role: 'Player' as const,
};

function calcAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function DistrictDashboard() {
  const navigate = useNavigate();
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [districtName, setDistrictName] = useState('');

  const [events, setEvents] = useState<EventRow[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');

  const [allParticipants, setAllParticipants] = useState<Participant[]>([]); // for cap counting (all events)
  const [loadingList, setLoadingList] = useState(true);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('district_id, districts(district_name)')
        .eq('id', session.user.id)
        .single();

      const dId = (profile as any)?.district_id;
      const dName = (profile as any)?.districts?.district_name;
      if (dId) setDistrictId(dId);
      if (dName) setDistrictName(dName);

      const { data: eventRows } = await supabase
        .from('events')
        .select('id, event_name, registration_deadline')
        .order('registration_deadline', { ascending: false });
      setEvents(eventRows || []);
      if (eventRows && eventRows.length > 0) setSelectedEventId(eventRows[0].id);

      if (dId) {
        const { data: participants } = await supabase
          .from('participants')
          .select('*')
          .eq('district_id', dId);
        setAllParticipants(participants || []);
      }
      setLoadingList(false);
    }
    init();
  }, []);

  const reloadParticipants = async () => {
    if (!districtId) return;
    const { data } = await supabase.from('participants').select('*').eq('district_id', districtId);
    setAllParticipants(data || []);
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const isOpen = selectedEvent ? new Date(selectedEvent.registration_deadline) > new Date() : false;

  const listForEvent = useMemo(
    () => allParticipants.filter((p) => p.event_id === selectedEventId),
    [allParticipants, selectedEventId]
  );

  // Cap counts — per district + category + event (matches the DB trigger)
  const capCounts = useMemo(() => {
    const inCategory = allParticipants.filter((p) => p.category === form.category && p.event_id === selectedEventId);
    return {
      boys: inCategory.filter((p) => p.participant_role === 'Player' && p.gender === 'Male').length,
      girls: inCategory.filter((p) => p.participant_role === 'Player' && p.gender === 'Female').length,
      coaches: inCategory.filter((p) => p.participant_role === 'Coach').length,
      managers: inCategory.filter((p) => p.participant_role === 'Manager').length,
    };
  }, [allParticipants, form.category, selectedEventId]);

  const capLimitFor = (role: string, gender: string) => {
    if (role === 'Coach') return 2;
    if (role === 'Manager') return 2;
    return 12; // Player, either gender
  };
  const currentCountFor = (role: string, gender: string) => {
    if (role === 'Coach') return capCounts.coaches;
    if (role === 'Manager') return capCounts.managers;
    return gender === 'Male' ? capCounts.boys : capCounts.girls;
  };
  const isAtCap = !editingId && currentCountFor(form.participant_role, form.gender) >= capLimitFor(form.participant_role, form.gender);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleEdit = (p: Participant) => {
    setForm({
      name: p.name, dob: p.dob, gender: p.gender, category: p.category,
      father_name: p.father_name || '', mother_name: p.mother_name || '',
      address: p.address || '', contact_no: p.contact_no || '', email: p.email || '',
      event_type: p.event_type, participant_role: p.participant_role,
    });
    setEditingId(p.id);
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this participant?')) return;
    const { error } = await supabase.from('participants').delete().eq('id', id);
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    reloadParticipants();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!districtId || !selectedEventId) {
      setMessage({ type: 'error', text: 'Select an event first.' });
      return;
    }
    if (!isOpen) {
      setMessage({ type: 'error', text: 'Registration is closed for this event.' });
      return;
    }

    setSubmitting(true);
    const payload = {
      event_id: selectedEventId,
      district_id: districtId,
      name: form.name.trim(),
      dob: form.dob,
      age: calcAge(form.dob),
      gender: form.gender,
      category: form.category,
      father_name: form.father_name.trim() || null,
      mother_name: form.mother_name.trim() || null,
      address: form.address.trim() || null,
      contact_no: form.contact_no.trim() || null,
      email: form.email.trim() || null,
      event_type: form.event_type,
      participant_role: form.participant_role,
    };

    const { error } = editingId
      ? await supabase.from('participants').update(payload).eq('id', editingId)
      : await supabase.from('participants').insert(payload);

    setSubmitting(false);

    if (error) {
      setMessage({ type: 'error', text: error.message.includes('Limit reached') ? error.message : `Could not save: ${error.message}` });
      return;
    }

    setMessage({ type: 'success', text: editingId ? 'Participant updated.' : 'Participant added.' });
    resetForm();
    reloadParticipants();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <main className="bg-background min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              District Dashboard
            </div>
            <h1
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, textTransform: 'uppercase' }}
            >
              {districtName || 'Loading…'}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            style={{ fontSize: '13px' }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>

        {/* Event selector */}
        <div className="mb-8">
          <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
            Event
          </label>
          <select
            value={selectedEventId}
            onChange={(e) => { setSelectedEventId(e.target.value); resetForm(); setMessage(null); }}
            className="w-full sm:w-96 bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            style={{ fontSize: '14px' }}
          >
            {events.length === 0 && <option>No events available</option>}
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.event_name}</option>
            ))}
          </select>
          {selectedEvent && (
            <div
              className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 uppercase"
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
                background: isOpen ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                color: isOpen ? '#16a34a' : '#dc2626',
              }}
            >
              {isOpen
                ? `Open — closes ${new Date(selectedEvent.registration_deadline).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
                : `Closed since ${new Date(selectedEvent.registration_deadline).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div
              className="text-foreground uppercase mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              {editingId ? 'Edit Participant' : 'Add Participant'}
            </div>

            {/* Cap summary for the selected category */}
            <div className="border border-border bg-card p-4 mb-4 grid grid-cols-2 gap-3">
              <div style={{ fontSize: '12px' }}>
                <span className="text-muted-foreground">Boys: </span>
                <span className="text-foreground" style={{ fontWeight: 700 }}>{capCounts.boys}/12</span>
              </div>
              <div style={{ fontSize: '12px' }}>
                <span className="text-muted-foreground">Girls: </span>
                <span className="text-foreground" style={{ fontWeight: 700 }}>{capCounts.girls}/12</span>
              </div>
              <div style={{ fontSize: '12px' }}>
                <span className="text-muted-foreground">Coaches: </span>
                <span className="text-foreground" style={{ fontWeight: 700 }}>{capCounts.coaches}/2</span>
              </div>
              <div style={{ fontSize: '12px' }}>
                <span className="text-muted-foreground">Managers: </span>
                <span className="text-foreground" style={{ fontWeight: 700 }}>{capCounts.managers}/2</span>
              </div>
                <p className="col-span-2 text-muted-foreground mt-1" style={{ fontSize: '11px' }}>
                Counted for {form.category} category, for this event only.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="border border-border bg-card p-6 flex flex-col gap-4">
              <fieldset disabled={!isOpen} className="flex flex-col gap-4 disabled:opacity-50">
                <div>
                  <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Name of Participant</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>DOB</label>
                    <input type="date" required value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Age</label>
                    <input type="text" readOnly value={calcAge(form.dob) ?? ''} placeholder="Auto"
                      className="w-full bg-muted border border-border px-3 py-2 text-muted-foreground" style={{ fontSize: '13px' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Gender</label>
                    <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }}>
                      <option>Senior</option>
                      <option>Junior</option>
                      <option>Sub-Junior</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Father Name</label>
                    <input type="text" value={form.father_name} onChange={(e) => setForm({ ...form, father_name: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Mother Name</label>
                    <input type="text" value={form.mother_name} onChange={(e) => setForm({ ...form, mother_name: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                  </div>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Address</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Contact No</label>
                    <input type="tel" value={form.contact_no} onChange={(e) => setForm({ ...form, contact_no: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Email ID</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Event Name</label>
                    <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value as any })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }}>
                      <option>Team Event</option>
                      <option>Regu Event</option>
                      <option>Quad Event</option>
                      <option>Double Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Role</label>
                    <select value={form.participant_role} onChange={(e) => setForm({ ...form, participant_role: e.target.value as any })}
                      className="w-full bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: '13px' }}>
                      <option>Player</option>
                      <option>Coach</option>
                      <option>Manager</option>
                    </select>
                  </div>
                </div>

                {isAtCap && (
                  <div className="flex items-start gap-2 text-destructive" style={{ fontSize: '12px' }}>
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>Limit reached for {form.participant_role === 'Player' ? `${form.gender} Players` : form.participant_role + 's'} in {form.category}.</span>
                  </div>
                )}
                {message && (
                  <div className={`flex items-start gap-2 ${message.type === 'success' ? 'text-green-600' : 'text-destructive'}`} style={{ fontSize: '12px' }}>
                    {message.type === 'success' ? <CheckCircle2 size={14} className="shrink-0 mt-0.5" /> : <AlertCircle size={14} className="shrink-0 mt-0.5" />}
                    <span>{message.text}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="submit" disabled={submitting || isAtCap}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 hover:bg-primary/90 transition-colors uppercase disabled:opacity-60"
                    style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}>
                    <Plus size={14} /> {submitting ? 'Saving…' : editingId ? 'Update' : 'Add Participant'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm}
                      className="border border-border px-4 text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '12px' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </fieldset>
              {!isOpen && (
                <p className="text-muted-foreground text-center" style={{ fontSize: '12px' }}>
                  Registration for this event is closed — no changes can be made.
                </p>
              )}
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-3">
            <div
              className="text-foreground uppercase mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              Submitted ({listForEvent.length})
            </div>
            <div className="border border-border bg-card overflow-x-auto">
              {loadingList ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</div>
              ) : listForEvent.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>No participants submitted for this event yet.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Name</th>
                      <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Category</th>
                      <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Role</th>
                      <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Event Type</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listForEvent.map((p) => (
                      <tr key={p.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-foreground" style={{ fontSize: '13px' }}>{p.name}</td>
                        <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.category}</td>
                        <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.participant_role} · {p.gender}</td>
                        <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.event_type}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(p)} disabled={!isOpen} className="text-muted-foreground hover:text-primary disabled:opacity-40 transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} disabled={!isOpen} className="text-muted-foreground hover:text-destructive disabled:opacity-40 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}