import { useState } from 'react';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const UPDATES = [
  '3rd Senior & Sub-Junior Punjab State Sepaktakraw Championship · 26–28 June 2026 · Police Ground Indoor Hall, Tarn Taran',
  'Junior Punjab State Sepaktakraw Championship · 9–11 October 2026 · Mansa District',
  '2nd Punjab State Judging Seminar · 3–4 October 2026',
];

const SOCIALS = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Youtube, label: 'YouTube' },
];

export function TopBar() {
  const [paused, setPaused] = useState(false);
  const doubled = [...UPDATES, ...UPDATES];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-9 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-4">
        {/* Ticker */}
        <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
          <span
            className="shrink-0 bg-primary text-primary-foreground px-2.5 h-5 flex items-center uppercase"
            style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em' }}
          >
            UPDATES
          </span>
          <div
            className="overflow-hidden flex-1 cursor-pointer"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: paused ? 'none' : 'marquee-infinite 55s linear infinite',
                fontSize: '12px',
              }}
            >
              {doubled.map((item, i) => (
                <span key={i} className="text-muted-foreground mr-14">
                  <span className="text-accent mr-2">◆</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
