import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../../lib/supabase';

type Props = {
  children: React.ReactNode;
  requireRole: 'admin' | 'district';
};

export function ProtectedRoute({ children, requireRole }: Props) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    let active = true;

    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setStatus('denied');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (active) {
        setStatus(profile?.role === requireRole ? 'allowed' : 'denied');
      }
    }

    check();
    return () => { active = false; };
  }, [requireRole]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</span>
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}