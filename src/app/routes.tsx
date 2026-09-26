import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/Contactpage';
import { EventsPage } from './pages/EventsPage';
import { LoginPage } from './pages/LoginPage';
import { DistrictDashboard } from './pages/DistrictDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: AboutPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'contact', Component: ContactPage },
            { path: 'events', Component: EventsPage },
      { path: 'login', Component: LoginPage },
      {
        path: 'district-dashboard',
        element: (
          <ProtectedRoute requireRole="district">
            <DistrictDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin-dashboard',
        element: (
          <ProtectedRoute requireRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
