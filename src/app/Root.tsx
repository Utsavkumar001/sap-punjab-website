import { Outlet, ScrollRestoration } from 'react-router';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export function Root() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
      <TopBar />
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
}
