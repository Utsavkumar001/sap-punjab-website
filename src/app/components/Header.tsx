import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../imports/image.png';

const NAV_LINKS = [
  { label: 'Home', to: '/', router: true, exact: true },
  { label: 'About', to: '/about', router: true, exact: false },
  { label: 'News', to: '/events', router: true, exact: false },
  { label: 'Gallery', to: '/gallery', router: true, exact: false },
  { label: 'Championships', to: '/events', router: true, exact: false },
  { label: 'Contact', to: '/contact', router: true, exact: false },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-9 left-0 right-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(228,224,242,0.9)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 no-underline">
            <img src={logo} alt="SAP Logo" className="h-9 w-9 object-contain" />
            <div>
              <div
                className="text-foreground uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 800, letterSpacing: '0.14em' }}
              >
                SEPAKTAKRAW
              </div>
              <div className="text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Association of Punjab
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              if (link.router) {
                return (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.exact}
                    className={({ isActive }) =>
                      `px-3 py-2 relative group transition-colors duration-200 ${
                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`
                    }
                    style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.04em' }}
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          className="absolute bottom-1.5 left-3 right-3 h-px bg-primary transition-transform duration-200 origin-left"
                          style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                        />
                      </>
                    )}
                  </NavLink>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-2 relative group"
                  style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.04em' }}
                >
                  {link.label}
                  <span className="absolute bottom-1.5 left-3 right-3 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact"
              className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors duration-200 uppercase"
              style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }}
            >
              REGISTER
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-foreground p-2 hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              if (link.router) {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-foreground border-b border-border py-4 flex items-center justify-between hover:text-primary transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                  >
                    {link.label}
                    <ChevronDown size={18} className="-rotate-90 text-primary" />
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground border-b border-border py-4 flex items-center justify-between hover:text-primary transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  {link.label}
                  <ChevronDown size={18} className="-rotate-90 text-primary" />
                </a>
              );
            })}
          </nav>
          <div className="mt-8">
            <Link to="/contact"
              className="block bg-primary text-primary-foreground text-center py-4 uppercase"
              style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em' }}
              onClick={() => setMobileOpen(false)}
            >
              REGISTER
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
