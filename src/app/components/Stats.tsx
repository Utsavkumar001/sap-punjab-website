import { Trophy, Users, MapPin, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { icon: MapPin, value: '15+', label: 'Active Districts', sub: 'Across Punjab' },
  { icon: Users, value: '500+', label: 'Registered Athletes', sub: 'State & district levels' },
  { icon: Trophy, value: '29', label: 'Nationals Participated', sub: 'Championships hosted' },
  { icon: Award, value: '3', label: 'Gold Medals', sub: '29th Junior Nationals 2024' },
];

export function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-card" ref={ref}>
      <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #7C3AED 0%, #D4A017 50%, #7C3AED 100%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-border" style={{ borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)' }}>
          {STATS.map(({ icon: Icon, value, label, sub }, idx) => (
            <div
              key={label}
              className="flex flex-col items-center text-center py-8 px-4 sm:px-6"
              style={{
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${idx * 0.12}s, transform 0.6s ease ${idx * 0.12}s`,
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4 shrink-0"
                style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.18)' }}
              >
                <Icon size={17} className="text-primary" />
              </div>
              <div
                className="text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 52px)', fontWeight: 800, lineHeight: 1 }}
              >
                {value}
              </div>
              <div
                className="text-foreground mt-2 uppercase"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                {label}
              </div>
              <div className="text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-border" />
    </section>
  );
}
