import { useState } from 'react';
import logoSAI  from '../../imports/image-2.png';
import logoSFI  from '../../imports/image-6.png';

const SUPPORTERS = [
  { name: 'Sepaktakraw Federation of India', logo: logoSFI },
  { name: 'Khelo India',                     logo: null },
  { name: 'Sports Authority of India',       logo: logoSAI },
];

export function SupportedBy() {
  const [paused, setPaused] = useState(false);
  const doubled = [...SUPPORTERS, ...SUPPORTERS];

  return (
    <section className="py-16 bg-card border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span
            className="text-muted-foreground uppercase shrink-0"
            style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em' }}
          >
            Supported &amp; Associated With
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{ gap: '80px', animation: paused ? 'none' : 'marquee-infinite 20s linear infinite' }}
        >
                    {doubled.map((org, i) => (
            <div
              key={i}
              className="shrink-0 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              {org.logo ? (
                <img
                  src={org.logo}
                  alt={org.name}
                  className="object-contain"
                  style={{ height: '72px', width: 'auto', maxWidth: '140px' }}
                />
              ) : (
                <div
                  className="flex items-center justify-center text-center px-3"
                  style={{ height: '72px', width: '140px', border: '1px dashed var(--border)', fontSize: '11px', fontWeight: 600, color: 'var(--muted-foreground)' }}
                >
                  {org.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
