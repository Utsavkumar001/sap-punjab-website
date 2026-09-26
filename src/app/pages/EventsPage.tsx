import { useEffect, useState } from 'react';
import { Calendar, MapPin, Trophy, Clock, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const UPCOMING_EVENTS = [
  {
    date: 'Jun 26, 2026',
    title: '3rd Senior & Sub-Junior Punjab State Sepaktakraw Championship',
    location: 'Police Ground Indoor Hall, Tarn Taran',
    range: '26–28 June 2026',
  },
  {
    date: 'Oct 9, 2026',
    title: 'Junior Punjab State Sepaktakraw Championship',
    location: 'Mansa District',
    range: '9–11 October 2026',
  },
  {
    date: 'Oct 3, 2026',
    title: '2nd Punjab State Judging Seminar',
    location: 'Venue TBA',
    range: '3–4 October 2026',
  },
];

type ResultRow = {
  year: string;
  label: string;
  pdf_path: string | null;
};

export function EventsPage() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      const { data } = await supabase.from('championship_results').select('year, label, pdf_path').order('year');
      setResults(data || []);
      setLoading(false);
    }
    loadResults();
  }, []);

  const getPdfUrl = (path: string) => supabase.storage.from('results').getPublicUrl(path).data.publicUrl;

  return (
    <main className="bg-background min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              Events &amp; Championships
            </span>
          </div>
          <h1
            className="text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
          >
            Sepaktakraw Events
          </h1>
        </div>

        {/* ── Events ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Calendar size={18} className="text-primary" />
            <h2
              className="text-foreground uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '0.04em' }}
            >
              Events
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.title}
                className="border border-border bg-card p-6 hover:border-primary/40 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 text-primary mb-3" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em' }}>
                  <Clock size={13} />
                  {event.range}
                </div>
                <h3 className="text-foreground mb-3" style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.4 }}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '13px' }}>
                  <MapPin size={13} />
                  {event.location}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Championship Results ── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy size={18} className="text-accent" />
            <h2
              className="text-foreground uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '0.04em' }}
            >
              Punjab State Championship Results
            </h2>
          </div>

          {loading ? (
            <div className="border border-border bg-card p-12 text-center text-muted-foreground" style={{ fontSize: '14px' }}>
              Loading…
            </div>
          ) : (
            <>
              {/* Tab switcher */}
              <div className="flex border-b border-border mb-8">
                {results.map((r, idx) => (
                  <button
                    key={r.year}
                    onClick={() => setActiveTab(idx)}
                    className="relative px-5 py-3 transition-colors duration-200"
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: activeTab === idx ? 'var(--foreground)' : 'var(--muted-foreground)',
                    }}
                  >
                    {r.year}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-transform duration-200 origin-left"
                      style={{ transform: activeTab === idx ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="border border-border bg-card p-12 flex flex-col items-center text-center">
                <Trophy size={28} className="text-muted-foreground mb-4" />
                <div
                  className="text-foreground mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '20px', fontWeight: 800, textTransform: 'uppercase' }}
                >
                  {results[activeTab]?.label}
                </div>
                {results[activeTab]?.pdf_path ? (
                  <a
                    href={getPdfUrl(results[activeTab].pdf_path!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 mt-4 hover:bg-primary/90 transition-colors uppercase"
                    style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
                  >
                    <Download size={15} /> View / Download Results PDF
                  </a>
                ) : (
                  <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                    Results will be updated soon.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}