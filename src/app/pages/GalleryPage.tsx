import { useState } from 'react';
import { X, ArrowRight, ZoomIn } from 'lucide-react';
import img1  from '../../imports/8E5A6944.JPG';
import img2  from '../../imports/8E5A6953.JPG';
import img3  from '../../imports/8E5A7114.JPG';
import img4  from '../../imports/8.JPG';
import img5  from '../../imports/9.jpeg';
import img6  from '../../imports/10.jpeg';
import img7  from '../../imports/11.jpeg';
import img8  from '../../imports/11__1_.jpeg';
import img9  from '../../imports/12.jpeg';
import img10 from '../../imports/13.jpeg';
import img11 from '../../imports/1.JPG';
import img12 from '../../imports/2.JPG';
import img13 from '../../imports/3.JPG';
import img14 from '../../imports/4.JPG';
import img15 from '../../imports/5.JPG';
import img16 from '../../imports/6.jpeg';
import img17 from '../../imports/7.jpeg';
import video1 from '../../imports/Asmita_-2.mp4';
import video2 from '../../imports/Asmita_League_Video_1.mp4';
import video3 from '../../imports/Opening_Ceremony_29th_Junior_National_Video.mp4';

const MEDIA = [
  { id: 1,  type: 'image' as const, src: img1,  alt: 'Sepaktakraw championship action', label: 'Championship' },
  { id: 2,  type: 'image' as const, src: img2,  alt: 'Sepaktakraw players in action',   label: 'Action' },
  { id: 3,  type: 'image' as const, src: img3,  alt: 'Sepaktakraw match play',          label: 'Match' },
  { id: 4,  type: 'image' as const, src: img4,  alt: 'SAP event photo',                 label: 'Event' },
  { id: 5,  type: 'image' as const, src: img5,  alt: 'SAP event photo',                 label: 'Event' },
  { id: 6,  type: 'image' as const, src: img6,  alt: 'Sepaktakraw athletes',            label: 'Athletes' },
  { id: 7,  type: 'image' as const, src: img7,  alt: 'Punjab state championship',       label: 'Championship' },
  { id: 8,  type: 'image' as const, src: img8,  alt: 'Sepaktakraw training session',    label: 'Training' },
  { id: 9,  type: 'image' as const, src: img9,  alt: 'SAP championship moment',         label: 'Championship' },
  { id: 10, type: 'image' as const, src: img10, alt: 'Sepaktakraw action shot',         label: 'Action' },
  { id: 11, type: 'image' as const, src: img11, alt: 'SAP championship photo',          label: 'Championship' },
  { id: 12, type: 'image' as const, src: img12, alt: 'Sepaktakraw athletes competing',  label: 'Athletes' },
  { id: 13, type: 'image' as const, src: img13, alt: 'Punjab sepaktakraw event',        label: 'Event' },
  { id: 14, type: 'image' as const, src: img14, alt: 'Sepaktakraw match action',        label: 'Action' },
  { id: 15, type: 'image' as const, src: img15, alt: 'SAP state championship',          label: 'Championship' },
  { id: 16, type: 'image' as const, src: img16, alt: 'Sepaktakraw team photo',          label: 'Team' },
  { id: 17, type: 'image' as const, src: img17, alt: 'Sepaktakraw training',            label: 'Training' },
  { id: 18, type: 'video' as const, src: video1, alt: 'Sepaktakraw match highlights',   label: 'Video' },
  { id: 19, type: 'video' as const, src: video2, alt: 'Asmita League match footage',    label: 'Video' },
  { id: 20, type: 'video' as const, src: video3, alt: 'Opening Ceremony — 29th Junior National Championship', label: 'Video' },
];

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + MEDIA.length) % MEDIA.length : 0));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % MEDIA.length : 0));

  return (
    <main className="bg-background min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              Photo & Video Gallery
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h1
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
            >
              IN THE ARENA
            </h1>
            <span className="text-muted-foreground" style={{ fontSize: '13px' }}>
              {MEDIA.length} items
            </span>
          </div>
        </div>

        {/* Grid — all photos and videos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {MEDIA.map((item, idx) => (
            <div
              key={item.id}
              className="relative overflow-hidden group cursor-pointer aspect-video"
              onClick={() => setLightbox(idx)}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(10,5,25,0.55)' }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '7px solid transparent',
                        borderBottom: '7px solid transparent',
                        borderLeft: '11px solid white',
                        marginLeft: '3px',
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 border border-white/60 flex items-center justify-center">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,5,25,0.85), transparent)' }}
              >
                <span className="text-white uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em' }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,13,30,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50" style={{ fontSize: '13px' }}>
            {lightbox + 1} / {MEDIA.length}
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ArrowRight size={18} className="rotate-180" />
          </button>
          {MEDIA[lightbox].type === 'video' ? (
            <video
              src={MEDIA[lightbox].src}
              controls
              autoPlay
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={MEDIA[lightbox].src}
              alt={MEDIA[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </main>
  );
}