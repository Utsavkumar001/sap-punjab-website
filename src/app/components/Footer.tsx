import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import logo from '../../imports/image.png';

const QUICK_LINKS = [
  'About SAP', 'Constitution & Rules', 'Affiliated Districts',
  'Championship Results', 'Selection Criteria', 'Media',
];

const EVENTS = [
  { title: '3rd Senior & Sub-Junior Punjab State Championship', date: 'Jun 26, 2026' },
  { title: 'Junior Punjab State Sepaktakraw Championship', date: 'Oct 9, 2026' },
  { title: '2nd Punjab State Judging Seminar', date: 'Oct 3, 2026' },
];

const SOCIALS = [
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Band */}
      <div
        className="py-12 px-4 sm:px-6"
        style={{ background: 'linear-gradient(90deg, rgba(109,40,217,0.07) 0%, rgba(212,160,23,0.05) 100%)', borderBottom: '1px solid rgba(109,40,217,0.15)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-foreground"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}
            >
              Govern. Develop. Champion.
            </h3>
            <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>
              Officially affiliated with the Sepaktakraw Federation of India
            </p>
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 hover:bg-primary/90 transition-colors whitespace-nowrap uppercase"
            style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            Get in Touch <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="SAP Logo" className="h-10 w-10 object-contain" />
              <div>
                <div
                  className="text-foreground uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '15px', fontWeight: 800, letterSpacing: '0.12em' }}
                >
                  SEPAKTAKRAW
                </div>
                <div className="text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Association of Punjab
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6" style={{ fontSize: '13px', lineHeight: 1.7 }}>
              The official governing body for Sepak Takraw in Punjab, India.
              Affiliated with the Sepaktakraw Federation of India (SFI).
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-foreground uppercase mb-5 pb-3 border-b border-border"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em' }}
            >
              Quick Links
            </div>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) =>
                link === 'Media' ? (
                  <li key={link}>
                    <Link
                      to="/gallery"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      style={{ fontSize: '13px' }}
                    >
                      <span className="h-px w-3 bg-border group-hover:bg-primary group-hover:w-4 transition-all duration-200" />
                      {link}
                    </Link>
                  </li>
                ) : (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      style={{ fontSize: '13px' }}
                    >
                      <span className="h-px w-3 bg-border group-hover:bg-primary group-hover:w-4 transition-all duration-200" />
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Upcoming events */}
          <div>
            <div
              className="text-foreground uppercase mb-5 pb-3 border-b border-border"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em' }}
            >
              Events
            </div>
            <ul className="flex flex-col gap-4">
              {EVENTS.map((event) => (
                <li key={event.title} className="flex gap-3">
                  <div
                    className="shrink-0 text-primary"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', paddingTop: '2px' }}
                  >
                    {event.date}
                  </div>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '13px', lineHeight: 1.4 }}>
                    {event.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-foreground uppercase mb-5 pb-3 border-b border-border"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 800, letterSpacing: '0.12em' }}
            >
              Contact SAP
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                  Sepaktakraw Association of Punjab<br />
                  Flat No. 29, 1st Floor, Shri Devaji Residency,<br />
                  Kishanpura Road, Dhakoli, Zirakpur, Punjab — 160104
                </span>
              </li>
              <li>
                <a
                  href="tel:+917607908528"
                  className="flex gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={15} className="text-primary shrink-0 mt-0.5" />
                  <span style={{ fontSize: '13px' }}>+91 76079 08528</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:pnbsepaktakraw@gmail.com"
                  className="flex gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={15} className="text-primary shrink-0 mt-0.5" />
                  <span style={{ fontSize: '13px' }}>pnbsepaktakraw@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
            © 2026 Sepaktakraw Association of Punjab. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontSize: '12px' }}
            >
              Login
            </Link>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ fontSize: '12px' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}