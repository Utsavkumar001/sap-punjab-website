import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx-js-style';
import { supabase } from '../../lib/supabase';

type EventRow = {
  id: string;
  event_name: string;
};

type ParticipantRow = {
  id: string;
  name: string;
  dob: string;
  age: number | null;
  gender: string;
  category: string;
  father_name: string | null;
  mother_name: string | null;
  address: string | null;
  contact_no: string | null;
  email: string | null;
  event_type: string;
  participant_role: string;
  districts: { district_name: string } | null;
};

const COLUMNS = [
  'S.No.', 'Name', 'DOB', 'Age', 'Gender', 'Category', 'Father Name',
  'Mother Name', 'Address', 'Contact No', 'Email', 'Event Type', 'Role',
];

const COLUMN_WIDTHS = [8, 22, 12, 7, 9, 12, 20, 20, 30, 14, 26, 13, 10];

const BORDER_THIN = { style: 'thin', color: { rgb: 'B0B0B0' } } as const;
const CELL_BORDER = { top: BORDER_THIN, bottom: BORDER_THIN, left: BORDER_THIN, right: BORDER_THIN };

const TITLE_STYLE = {
  font: { bold: true, sz: 16, color: { rgb: 'FFFFFF' } },
  fill: { fgColor: { rgb: '6D28D9' } },
  alignment: { horizontal: 'center', vertical: 'center' },
};
const SUBTITLE_STYLE = {
  font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
  fill: { fgColor: { rgb: '6D28D9' } },
  alignment: { horizontal: 'center', vertical: 'center' },
};
const META_STYLE = {
  font: { italic: true, sz: 10, color: { rgb: '555555' } },
  alignment: { horizontal: 'center' },
};
const DISTRICT_HEADER_STYLE = {
  font: { bold: true, sz: 12, color: { rgb: 'FFFFFF' } },
  fill: { fgColor: { rgb: 'D4A017' } },
  alignment: { horizontal: 'left', vertical: 'center' },
};
const COLUMN_HEADER_STYLE = {
  font: { bold: true, sz: 10, color: { rgb: 'FFFFFF' } },
  fill: { fgColor: { rgb: '2D2140' } },
  alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
  border: CELL_BORDER,
};
const DATA_CELL_STYLE = {
  font: { sz: 10 },
  alignment: { vertical: 'center', wrapText: true },
  border: CELL_BORDER,
};

export function AdminParticipantsPanel() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [districtFilter, setDistrictFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    async function loadEvents() {
      const { data } = await supabase.from('events').select('id, event_name').order('registration_deadline', { ascending: false });
      setEvents(data || []);
      if (data && data.length > 0) setSelectedEventId(data[0].id);
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    async function loadParticipants() {
      setLoading(true);
      const { data } = await supabase
        .from('participants')
        .select('*, districts(district_name)')
        .eq('event_id', selectedEventId)
        .order('name');
      setParticipants((data as any) || []);
      setLoading(false);
    }
    loadParticipants();
  }, [selectedEventId]);

  const districtNames = useMemo(() => {
    const names = new Set(participants.map((p) => p.districts?.district_name).filter(Boolean) as string[]);
    return ['All', ...Array.from(names).sort()];
  }, [participants]);

  const filtered = useMemo(() => {
    return participants.filter((p) => {
      if (districtFilter !== 'All' && p.districts?.district_name !== districtFilter) return false;
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      return true;
    });
  }, [participants, districtFilter, categoryFilter]);

  const handleExport = () => {
    const selectedEvent = events.find((e) => e.id === selectedEventId);
    const eventName = selectedEvent?.event_name || 'Event';

    // Group participants by district, sorted alphabetically
    const byDistrict = new Map<string, ParticipantRow[]>();
    filtered.forEach((p) => {
      const dName = p.districts?.district_name || 'Unassigned';
      if (!byDistrict.has(dName)) byDistrict.set(dName, []);
      byDistrict.get(dName)!.push(p);
    });
    const districtOrder = Array.from(byDistrict.keys()).sort();

    const rows: any[][] = [];
    const merges: XLSX.Range[] = [];
    const numCols = COLUMNS.length;

    // Title rows
    rows.push(['SEPAKTAKRAW ASSOCIATION OF PUNJAB', ...Array(numCols - 1).fill('')]);
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: numCols - 1 } });
    rows.push([eventName, ...Array(numCols - 1).fill('')]);
    merges.push({ s: { r: 1, c: 0 }, e: { r: 1, c: numCols - 1 } });
    rows.push([`Category: ${categoryFilter}`, ...Array(numCols - 1).fill('')]);
    merges.push({ s: { r: 2, c: 0 }, e: { r: 2, c: numCols - 1 } });
    rows.push([`Generated on ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`, ...Array(numCols - 1).fill('')]);
    merges.push({ s: { r: 3, c: 0 }, e: { r: 3, c: numCols - 1 } });
    rows.push(Array(numCols).fill('')); // spacer row

    let serial = 1;
    districtOrder.forEach((districtName) => {
      // District header row
      const districtRowIndex = rows.length;
      rows.push([`District: ${districtName}`, ...Array(numCols - 1).fill('')]);
      merges.push({ s: { r: districtRowIndex, c: 0 }, e: { r: districtRowIndex, c: numCols - 1 } });

      // Column headers for this district's block
      rows.push([...COLUMNS]);

      // Data rows
      byDistrict.get(districtName)!.forEach((p) => {
        rows.push([
          serial++,
          p.name,
          p.dob,
          p.age ?? '',
          p.gender,
          p.category,
          p.father_name || '',
          p.mother_name || '',
          p.address || '',
          p.contact_no || '',
          p.email || '',
          p.event_type,
          p.participant_role,
        ]);
      });

      rows.push(Array(numCols).fill('')); // spacer between districts
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet['!merges'] = merges;
    worksheet['!cols'] = COLUMN_WIDTHS.map((w) => ({ wch: w }));

    // Apply styles by walking the rows we know the structure of
    const setCellStyle = (r: number, c: number, style: any) => {
      const addr = XLSX.utils.encode_cell({ r, c });
      if (!worksheet[addr]) worksheet[addr] = { t: 's', v: '' };
      worksheet[addr].s = style;
    };

    setCellStyle(0, 0, TITLE_STYLE);
    setCellStyle(1, 0, SUBTITLE_STYLE);
    setCellStyle(2, 0, SUBTITLE_STYLE);
    setCellStyle(3, 0, META_STYLE);

    let r = 5;
    districtOrder.forEach((districtName) => {
      setCellStyle(r, 0, DISTRICT_HEADER_STYLE);
      r += 1;
      for (let c = 0; c < numCols; c++) setCellStyle(r, c, COLUMN_HEADER_STYLE);
      r += 1;
      const count = byDistrict.get(districtName)!.length;
      for (let i = 0; i < count; i++) {
        for (let c = 0; c < numCols; c++) setCellStyle(r, c, DATA_CELL_STYLE);
        r += 1;
      }
      r += 1; // spacer
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');

    const safeName = eventName.replace(/[^\w\- ]/g, '').slice(0, 40);
    XLSX.writeFile(workbook, `${safeName} - Participants.xlsx`);
  };

  return (
    <div className="mt-16">
      <div
        className="text-foreground uppercase mb-5"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
      >
        Participants
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-5">
        <div>
          <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Event</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            style={{ fontSize: '13px', minWidth: '240px' }}
          >
            {events.length === 0 && <option>No events</option>}
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.event_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>District</label>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            style={{ fontSize: '13px' }}
          >
            {districtNames.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-muted-foreground mb-1.5 uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}>Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-background border border-border px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            style={{ fontSize: '13px' }}
          >
            <option>All</option>
            <option>Senior</option>
            <option>Junior</option>
            <option>Sub-Junior</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={filtered.length === 0}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors uppercase disabled:opacity-50"
          style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          <Download size={14} /> Export Excel
        </button>
        <span className="text-muted-foreground" style={{ fontSize: '12px' }}>{filtered.length} participant{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="border border-border bg-card overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>No participants match these filters.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>District</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Name</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Category</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Gender</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Role</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Event Type</th>
                <th className="text-left px-4 py-3 text-muted-foreground uppercase" style={{ fontSize: '10px', fontWeight: 700 }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground" style={{ fontSize: '13px' }}>{p.districts?.district_name || '—'}</td>
                  <td className="px-4 py-3 text-foreground" style={{ fontSize: '13px' }}>{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.category}</td>
                  <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.gender}</td>
                  <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.participant_role}</td>
                  <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.event_type}</td>
                  <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: '13px' }}>{p.contact_no || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}