import { useState } from 'react';
import { Link } from 'react-router';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
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

const PHOTOS = [
  { id: 1,  src: img1,  alt: 'Sepaktakraw championship action', label: 'Championship' },
  { id: 2,  src: img2,  alt: 'Sepaktakraw players in action',   label: 'Action' },
  { id: 3,  src: img3,  alt: 'Sepaktakraw match play',          label: 'Match' },
  { id: 4,  src: img4,  alt: 'SAP event photo',                 label: 'Event' },
  { id: 5,  src: img5,  alt: 'SAP event photo',                 label: 'Event' },
  { id: 6,  src: img6,  alt: 'Sepaktakraw athletes',            label: 'Athletes' },
  { id: 7,  src: img7,  alt: 'Punjab state championship',       label: 'Championship' },
  { id: 8,  src: img8,  alt: 'Sepaktakraw training session',    label: 'Training' },
  { id: 9,  src: img9,  alt: 'SAP championship moment',         label: 'Championship' },
  { id: 10, src: img10, alt: 'Sepaktakraw action shot',         label: 'Action' },
  { id: 11, src: img11, alt: 'SAP championship photo',          label: 'Championship' },
  { id: 12, src: img12, alt: 'Sepaktakraw athletes competing',  label: 'Athletes' },
  { id: 13, src: img13, alt: 'Punjab sepaktakraw event',        label: 'Event' },
  { id: 14, src: img14, alt: 'Sepaktakraw match action',        label: 'Action' },
  { id: 15, src: img15, alt: 'SAP state championship',          label: 'Championship' },
  { id: 16, src: img16, alt: 'Sepaktakraw team photo',          label: 'Team' },
  { id: 17, src: img17, alt: 'Sepaktakraw training',            label: 'Training' },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : 0));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % PHOTOS.length : 0));

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                Photo Gallery
              </span>
            </div>
            <h2
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
            >
              IN THE ARENA
            </h2>
          </div>
          <span className="hidden sm:block text-muted-foreground" style={{ fontSize: '13px' }}>
            {PHOTOS.length} photos · click to expand
          </span>
        </div>

        {/* Grid */}
        {/* Bento grid: large left + wide top-right + 3 small bottom-right (5th = Show More) */}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', gridTemplateRows: '240px 240px' }}
        >
          {/* Slot 1 — large left, spans full height */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            style={{ gridRow: '1 / 3' }}
            onClick={() => setLightbox(0)}
          >
            <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 border border-white/60 flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Slot 2 — wide top-right, spans 3 columns */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            style={{ gridColumn: '2 / 5' }}
            onClick={() => setLightbox(1)}
          >
            <img src={PHOTOS[1].src} alt={PHOTOS[1].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 border border-white/60 flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Slot 3 — bottom-right small */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            onClick={() => setLightbox(2)}
          >
            <img src={PHOTOS[2].src} alt={PHOTOS[2].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 border border-white/60 flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Slot 4 — bottom-right small */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            onClick={() => setLightbox(3)}
          >
            <img src={PHOTOS[3].src} alt={PHOTOS[3].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 border border-white/60 flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
          </div>

          {/* Slot 5 — Show More overlay */}
          <Link
            to="/gallery"
            className="relative overflow-hidden block"
            style={{ textDecoration: 'none' }}
          >
            <img src={PHOTOS[4].src} alt={PHOTOS[4].alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: 'rgba(0,0,0,0.55)' }}>
              <div className="w-10 h-10 border border-white/60 flex items-center justify-center">
                <ArrowRight size={18} className="text-white" />
              </div>
              <span className="text-white uppercase" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em' }}>
                Show More
              </span>
              <span className="text-white/60" style={{ fontSize: '11px' }}>
                +{PHOTOS.length - 4} photos
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(5,13,30,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50" style={{ fontSize: '13px' }}>
            {lightbox + 1} / {PHOTOS.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ArrowRight size={18} className="rotate-180" />
          </button>

          {/* Image */}
          <img
            src={PHOTOS[lightbox].src}
            alt={PHOTOS[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
