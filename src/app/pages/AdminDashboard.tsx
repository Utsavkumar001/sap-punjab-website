import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Plus, Pencil, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AdminParticipantsPanel } from '../components/AdminParticipantsPanel';
import { AdminResultsPanel } from '../components/AdminResultsPanel';


type District = {
  id: string;
  district_name: string;
  contact_person: string | null;
  created_at: string;
};

type Event = {
  id: string;
  event_name: string;
  event_date: string | null;
  registration_deadline: string;
  created_at: string;
};

export function AdminDashboard() {
  const navigate = useNavigate();

  // Districts
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [districtName, setDistrictName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [submittingDistrict, setSubmittingDistrict] = useState(false);
  const [districtMessage, setDistrictMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Events
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [submittingEvent, setSubmittingEvent] = useState(false);
  const [eventMessage, setEventMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const toLocalInputValue = (iso: string) => {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const loadDistricts = async () => {
    setLoadingDistricts(true);
    const { data } = await supabase.from('districts').select('*').order('district_name');
    setDistricts(data || []);
    setLoadingDistricts(false);
  };

  const loadEvents = async () => {
    setLoadingEvents(true);
    const { data } = await supabase.from('events').select('*').order('registration_deadline', { ascending: false });
    setEvents(data || []);
    setLoadingEvents(false);
  };

  useEffect(() => {
    loadDistricts();
    loadEvents();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleCreateDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    setDistrictMessage(null);
    setSubmittingDistrict(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setDistrictMessage({ type: 'error', text: 'Session expired. Please log in again.' });
      setSubmittingDistrict(false);
      return;
    }

    const { data, error } = await supabase.functions.invoke('create-district', {
      body: {
        district_name: districtName.trim(),
        login_email: loginEmail.trim(),
        password,
        contact_person: contactPerson.trim() || null,
      },
    });

    setSubmittingDistrict(false);

    if (error || data?.error) {
      setDistrictMessage({ type: 'error', text: data?.error || error?.message || 'Something went wrong.' });
      return;
    }

    setDistrictMessage({ type: 'success', text: `${districtName} created successfully.` });
    setDistrictName('');
    setLoginEmail('');
    setPassword('');
    setContactPerson('');
    loadDistricts();
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventMessage(null);
    setSubmittingEvent(true);

    const payload = {
      event_name: eventName.trim(),
      event_date: eventDate || null,
      registration_deadline: new Date(deadline).toISOString(),
    };

    const { error } = editingEventId
      ? await supabase.from('events').update(payload).eq('id', editingEventId)
      : await supabase.from('events').insert(payload);

    setSubmittingEvent(false);

    if (error) {
      setEventMessage({ type: 'error', text: error.message });
      return;
    }

    setEventMessage({ type: 'success', text: editingEventId ? `${eventName} updated successfully.` : `${eventName} created successfully.` });
    setEventName('');
    setEventDate('');
    setDeadline('');
    setEditingEventId(null);
    loadEvents();
  };

  const handleEditEvent = (ev: Event) => {
    setEventName(ev.event_name);
    setEventDate(ev.event_date || '');
    setDeadline(toLocalInputValue(ev.registration_deadline));
    setEditingEventId(ev.id);
    setEventMessage(null);
  };

  const handleCancelEditEvent = () => {
    setEventName('');
    setEventDate('');
    setDeadline('');
    setEditingEventId(null);
    setEventMessage(null);
  };

  const isOpen = (ev: Event) => new Date(ev.registration_deadline) > new Date();

  return (
    <main className="bg-background min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              Admin Dashboard
            </div>
            <h1
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, textTransform: 'uppercase' }}
            >
              SAP Admin
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

        {/* ── Districts ── */}
        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div
              className="text-foreground uppercase mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              Add District
            </div>
            <form onSubmit={handleCreateDistrict} className="border border-border bg-card p-6 flex flex-col gap-4">
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  District Name
                </label>
                <input
                  type="text"
                  required
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  placeholder="e.g. Tarn Taran"
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Login ID (email format)
                </label>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tarantaran@sap-punjab.local"
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Password
                </label>
                <input
                  type="text"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Contact Person <span className="normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>

              {districtMessage && (
                <div
                  className={`flex items-start gap-2 ${districtMessage.type === 'success' ? 'text-green-600' : 'text-destructive'}`}
                  style={{ fontSize: '13px' }}
                >
                  {districtMessage.type === 'success' ? <CheckCircle2 size={15} className="shrink-0 mt-0.5" /> : <AlertCircle size={15} className="shrink-0 mt-0.5" />}
                  <span>{districtMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submittingDistrict}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 w-full hover:bg-primary/90 transition-colors uppercase disabled:opacity-60"
                style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
              >
                <Plus size={15} /> {submittingDistrict ? 'Creating…' : 'Create District'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-3">
            <div
              className="text-foreground uppercase mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              Districts ({districts.length})
            </div>
            <div className="border border-border bg-card">
              {loadingDistricts ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</div>
              ) : districts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>No districts yet.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-muted-foreground uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em' }}>District</th>
                      <th className="text-left px-5 py-3 text-muted-foreground uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em' }}>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districts.map((d) => (
                      <tr key={d.id} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 text-foreground" style={{ fontSize: '14px' }}>{d.district_name}</td>
                        <td className="px-5 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{d.contact_person || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* ── Events ── */}
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div
              className="text-foreground uppercase mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              {editingEventId ? 'Edit Event' : 'Add Event'}
            </div>
            <form onSubmit={handleCreateEvent} className="border border-border bg-card p-6 flex flex-col gap-4">
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. 3rd Senior & Sub-Junior Punjab State Championship"
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Event Date <span className="normal-case">(optional)</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
                <p className="text-muted-foreground mt-1.5" style={{ fontSize: '12px' }}>
                  Districts can add/edit participants only before this date &amp; time.
                </p>
              </div>

              {eventMessage && (
                <div
                  className={`flex items-start gap-2 ${eventMessage.type === 'success' ? 'text-green-600' : 'text-destructive'}`}
                  style={{ fontSize: '13px' }}
                >
                  {eventMessage.type === 'success' ? <CheckCircle2 size={15} className="shrink-0 mt-0.5" /> : <AlertCircle size={15} className="shrink-0 mt-0.5" />}
                  <span>{eventMessage.text}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submittingEvent}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 hover:bg-primary/90 transition-colors uppercase disabled:opacity-60"
                  style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
                >
                  <Plus size={15} /> {submittingEvent ? 'Saving…' : editingEventId ? 'Update Event' : 'Create Event'}
                </button>
                {editingEventId && (
                  <button
                    type="button"
                    onClick={handleCancelEditEvent}
                    className="border border-border px-4 text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-3">
            <div
              className="text-foreground uppercase mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
            >
              Events ({events.length})
            </div>
            <div className="border border-border bg-card">
              {loadingEvents ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</div>
              ) : events.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>No events yet.</div>
              ) : (
                <div className="flex flex-col divide-y divide-border">
                  {events.map((ev) => (
                    <div key={ev.id} className="px-5 py-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-foreground" style={{ fontSize: '14px', fontWeight: 600 }}>{ev.event_name}</div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                          <Calendar size={12} />
                          Deadline: {new Date(ev.registration_deadline).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="px-2.5 py-1 uppercase"
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            background: isOpen(ev) ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                            color: isOpen(ev) ? '#16a34a' : '#dc2626',
                          }}
                        >
                          {isOpen(ev) ? 'Open' : 'Closed'}
                        </span>
                        <button
                          onClick={() => handleEditEvent(ev)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <AdminParticipantsPanel />
        <AdminResultsPanel />
      </div>
    </main>
  );
}