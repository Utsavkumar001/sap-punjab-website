import { ArrowRight, Play, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import heroImage from '../../imports/Asmita.jpeg';
import video1 from '../../imports/Asmita_-2.mp4';
import video2 from '../../imports/Asmita_League_Video_1.mp4';
import video3 from '../../imports/Opening_Ceremony_29th_Junior_National_Video.mp4';

const SLIDES = [
  { type: 'image' as const, src: heroImage },
  { type: 'video' as const, src: video1 },
  { type: 'video' as const, src: video2 },
  { type: 'video' as const, src: video3 },
];

const STATS = [
  { value: '15+', label: 'Districts' },
  { value: '500+', label: 'Athletes' },
  { value: '2021', label: 'Est.' },
];

const SLIDE_DURATION = 5000;

export function Hero() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(SLIDES.length).fill(null));
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
  }, [current]);

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  // Play/pause videos when slide changes
  useEffect(() => {
    SLIDES.forEach((slide, idx) => {
      if (slide.type !== 'video') return;
      const el = videoRefs.current[idx];
      if (!el) return;
      if (idx === current) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [current]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Slide backgrounds — all rendered, only current is visible */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : 0,
            transition: 'none',
            zIndex: idx === current ? 1 : 0,
          }}
        >
          {slide.type === 'image' ? (
            <img
              src={slide.src as string}
              alt="Sepak Takraw action"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'saturate(0.65) brightness(0.85)' }}
            />
          ) : (
            <video
              ref={(el) => { videoRefs.current[idx] = el; }}
              src={slide.src as string}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
            />
          )}
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(110deg, rgba(10,5,25,0.90) 0%, rgba(10,5,25,0.75) 50%, rgba(10,5,25,0.50) 100%)' }}
          />
        </div>
      ))}

      {/* Violet glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none animate-hero-glow"
        style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.20) 0%, transparent 65%)', transform: 'translate(35%, -35%)', zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 pt-44 pb-24" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center flex-1">

          {/* Left: headline */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: '#6D28D9' }} />
              <span style={{ color: '#A78BFA', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Official Governing Body · Punjab, India
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(44px, 7vw, 88px)',
                fontWeight: 900,
                lineHeight: 0.9,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
              }}
            >
              <span className="block" style={{ color: '#ffffff' }}>SEPAK</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #D4A017 0%, #F5C842 50%, #D4A017 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                TAKRAW
              </span>
            </h1>

            <div
              className="mt-3 mb-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(18px, 3vw, 26px)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              ASSOCIATION OF PUNJAB
            </div>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: '420px', marginBottom: '2.5rem' }}>
              Governing, developing, and championing Sepak Takraw across all
              15 districts of Punjab. We build athletes, organise championships,
              and represent Punjab on the national stage.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                style={{ background: '#6D28D9', color: '#ffffff', padding: '14px 28px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                REGISTER
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff', padding: '14px 28px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#6D28D9'; (e.currentTarget as HTMLElement).style.color = '#A78BFA'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              >
                <Play size={14} style={{ color: '#D4A017' }} />
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right: stats card */}
          <div
            className="hidden lg:block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s',
            }}
          >
            <div
              className="p-8 max-w-sm ml-auto"
              style={{ background: 'rgba(10,5,25,0.35)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                SAP at a Glance
              </div>
              <div style={{ height: '1px', background: '#6D28D9', marginBottom: '24px' }} />
              <div className="grid grid-cols-3 gap-6">
                {STATS.map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '36px', fontWeight: 800, lineHeight: 1, color: '#A78BFA' }}>
                      {value}
                    </div>
                    <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4A017', marginBottom: '6px' }}>
                  Latest Achievement
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                  Bronze Medal (Girls Doubles) — 29th Junior National Championship, LPU Jalandhar, 1–5 Jan 2026
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  width: idx === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: idx === current ? '4px' : '50%',
                  background: idx === current ? '#6D28D9' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#6D28D9'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#6D28D9'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
