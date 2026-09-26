import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';

const UPCOMING_EVENTS = [
  {
    date: 'Jun 26, 2026',
    title: '3rd Senior & Sub-Junior Punjab State Championship',
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

export function NewsSection() {
  return (
    <section id="news" className="bg-background py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                Stay Updated
              </span>
            </div>
            <h2
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              EVENTS
            </h2>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            style={{ fontSize: '13px', fontWeight: 500 }}
          >
            All Events
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.title}
              className="border border-border bg-card p-6 hover:border-primary/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 text-primary mb-4" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em' }}>
                <Calendar size={13} />
                {event.range}
              </div>
              <h3 className="text-foreground mb-4" style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.4 }}>
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '13px' }}>
                <MapPin size={13} />
                {event.location}
              </div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div
          className="mt-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.07) 0%, rgba(109,40,217,0.03) 100%)', border: '1px solid rgba(109,40,217,0.18)' }}
        >
          <div>
            <div
              className="text-foreground mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}
            >
              Join the SAP Family
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.6 }}>
              Register your club or athlete with the official governing body of Sepak Takraw in Punjab.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-8 hover:bg-primary/90 transition-colors uppercase whitespace-nowrap"
            style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Register Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}