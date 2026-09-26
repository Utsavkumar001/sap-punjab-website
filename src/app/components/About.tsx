import { Quote, Target, Users, Trophy, Globe } from 'lucide-react';
import presidentPhoto from '../../imports/WhatsApp_Image_2026-06-15_at_14.57.44.jpeg';

const VISION_POINTS = [
  {
    icon: Users,
    title: 'Grassroots Development',
    body: 'Promoting Sepaktakraw in schools, colleges, and rural areas across Punjab to identify and nurture young talent at every level.',
  },
  {
    icon: Trophy,
    title: 'State Championships',
    body: 'Organising high-quality State Championships that provide athletes a competitive platform and ensure Punjab\'s strong representation nationally.',
  },
  {
    icon: Globe,
    title: 'International Ambition',
    body: 'Building a strong pipeline of talented athletes to represent Punjab in National Championships, Asian Games, and international competitions.',
  },
  {
    icon: Target,
    title: 'Khedan Watan Punjab Diyan',
    body: 'Striving to include Sepaktakraw in the state\'s flagship sports programme to reach every corner of Punjab with standard equipment and facilities.',
  },
];

export function About() {
  return (
    <section id="about" className="bg-background">

      {/* ── About SAP ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                About Us
              </span>
            </div>
            <h2
              className="text-foreground mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
            >
              SEPAKTAKRAW<br />ASSOCIATION OF PUNJAB
            </h2>
            <div className="flex flex-col gap-4" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
              <p>
                The Sepaktakraw Association of Punjab (SAP) is a registered body under the Societies Act, established in 2021 with the mission of promoting and developing the sport of Sepaktakraw across Punjab. As an affiliated member of the Sepaktakraw Federation of India, the Association is committed to nurturing talent, strengthening grassroots participation, and building a competitive sporting culture in the state.
              </p>
              <p>
                Within a short span of time, SAP has successfully organised two Punjab State Sepaktakraw Championships — first in Tarn Taran District (2023–24) and subsequently in Mohali District at Chandigarh University (2025–26). What began as a modest initiative with only a handful of athletes has now grown into a vibrant sporting movement active in more than 15 districts of Punjab.
              </p>
              <p>
                The overwhelming participation witnessed during the 2nd State Championship — where the schedule proved too short to accommodate all matches — stands as a testament to the sport's rapid growth and popularity in the state.
              </p>
              <p>
                We are proud to host the <span className="text-foreground" style={{ fontWeight: 600 }}>29th Junior National Sepaktakraw Championship</span>, scheduled at Lovely Professional University from 1st to 5th January 2026. SAP remains steadfast in upholding the vision of its mentors and is fully committed to contributing to the growth of Sepaktakraw across India.
              </p>
            </div>
          </div>

          {/* Right: acknowledgements card */}
          <div className="flex flex-col gap-6 lg:pt-14">
            <div className="border border-border bg-card p-8">
              <div
                className="text-foreground uppercase mb-4 pb-3 border-b border-border"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em' }}
              >
                Acknowledgements
              </div>
              <div className="flex flex-col gap-5" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-foreground)' }}>
                <p>
                  We honour the invaluable guidance of <span className="text-foreground" style={{ fontWeight: 600 }}>Late Yogender Singh Dahiya</span>, Former President of the Sepaktakraw Federation of India, whose administrative wisdom and far-sighted vision played a pivotal role in advancing Sepaktakraw in Punjab. On behalf of SAP, we extend our heartfelt condolences to his family on his untimely demise.
                </p>
                <p>
                  We also acknowledge the dedicated supervision and guidance of <span className="text-foreground" style={{ fontWeight: 600 }}>Mr. Ankit Baliyan</span>, International Referee and Coach, whose expertise has been instrumental in the development of our athletes.
                </p>
              </div>
            </div>

            {/* Asian Games highlight */}
            <div
              className="p-6 flex items-start gap-4"
              style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.07) 0%, rgba(109,40,217,0.03) 100%)', border: '1px solid rgba(109,40,217,0.18)' }}
            >
              <Trophy size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-foreground mb-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                  India at the Asian Games
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                  The Indian Men's and Women's Sepaktakraw teams secured <span style={{ color: '#D4A017', fontWeight: 700 }}>Bronze Medals</span> at the Asian Games 2018 and 2022, bringing national pride and recognition to this dynamic sport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Message from President ── */}
      <div className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Photo + name card */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
              <div className="relative mb-6">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-3"
                  style={{ background: 'rgba(109,40,217,0.12)', border: '2px solid rgba(109,40,217,0.2)' }}
                />
                <img
                  src={presidentPhoto}
                  alt="Dr. Aaditya Sharma (IAS), President SAP"
                  className="relative w-56 h-64 object-cover object-top"
                  style={{ filter: 'grayscale(15%)' }}
                />
              </div>
              <div>
                <div
                  className="text-foreground"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}
                >
                  Dr. Aaditya Sharma
                </div>
                <div className="text-primary mt-1" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em' }}>
                  IAS Officer
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                  President, Sepaktakraw Association of Punjab
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                  Message from the President
                </span>
              </div>
              <h3
                className="text-foreground mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
              >
                BUILDING A CHAMPION STATE
              </h3>

              {/* Pull quote */}
              <div className="flex gap-3 mb-6 pl-4" style={{ borderLeft: '3px solid #6D28D9' }}>
                <p className="text-foreground" style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.65, fontStyle: 'italic' }}>
                  "It gives me immense pride and satisfaction to witness the remarkable growth of Sepaktakraw in Punjab within a short span of time."
                </p>
              </div>

              <div className="flex flex-col gap-4" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
                <p>
                  Since its establishment in 2021, the Sepaktakraw Association of Punjab (SAP) has been working with dedication and commitment to promote the sport at the grassroots level and to create a strong competitive platform for our athletes.
                </p>
                <p>
                  As an affiliated member of the Sepaktakraw Federation of India, our Association has consistently strived to uphold the highest standards of professionalism, discipline, and sportsmanship. The successful organisation of two Punjab State Sepaktakraw Championships and the increasing participation from more than 15 districts are clear reflections of the collective efforts of our players, coaches, officials, and supporters.
                </p>
                <p>
                  It is a matter of great honour for SAP to host the 29th Junior National Sepaktakraw Championship at Lovely Professional University. I am also delighted to announce the launch of the official website of SAP — a platform that will serve athletes, coaches, officials, and sports enthusiasts with timely updates on events, schedules, and results.
                </p>
                <p>
                  I extend my heartfelt gratitude to all stakeholders for their unwavering support and cooperation.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-border">
                <div className="text-foreground" style={{ fontSize: '14px', fontWeight: 700 }}>Dr. Aaditya Sharma (IAS)</div>
                <div className="text-muted-foreground" style={{ fontSize: '13px' }}>President, Sepaktakraw Association of Punjab</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── President's Vision ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              President's Vision
            </span>
            <div className="h-px w-8 bg-accent" />
          </div>
          <h2
            className="text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
          >
            VISION FOR PUNJAB SEPAKTAKRAW
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VISION_POINTS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card border border-border p-6 hover:border-primary/40 transition-colors duration-200 group"
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4"
                style={{ background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.18)' }}
              >
                <Icon size={17} className="text-primary" />
              </div>
              <div
                className="text-foreground mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '17px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}
              >
                {title}
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Message from Secretary ── */}
      <div className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                Message from the Secretary
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>

            <Quote size={32} className="text-primary/20 mx-auto mb-4" />

            <blockquote className="text-foreground mb-6" style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 500, lineHeight: 1.7, fontStyle: 'italic' }}>
              "It gives me immense pleasure to announce the official launch of the Sepaktakraw Association of Punjab website. This platform marks an important step towards promoting and strengthening Sepaktakraw across Punjab and beyond."
            </blockquote>

            <div className="flex flex-col gap-4 text-center mb-8" style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
              <p>
                Our website will serve as a central hub for players, coaches, officials, and sports enthusiasts to access updates on tournaments, training programs, achievements, registrations, and various association activities. We are committed to creating greater opportunities for young talent and enhancing the growth of Sepaktakraw at the grassroots as well as competitive levels.
              </p>
              <p>
                I express my sincere gratitude to all members, supporters, athletes, and well-wishers who have consistently contributed to the development of this sport in Punjab. Together, we will continue to work with dedication, discipline, and sportsmanship to take Sepaktakraw to greater heights.
              </p>
            </div>

            <div className="inline-flex flex-col items-center gap-1 pt-5 border-t border-border px-8">
              <div className="text-foreground" style={{ fontSize: '15px', fontWeight: 700 }}>Ms. Sunita Saxena</div>
              <div className="text-muted-foreground" style={{ fontSize: '13px' }}>Secretary, Sepaktakraw Association of Punjab</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
