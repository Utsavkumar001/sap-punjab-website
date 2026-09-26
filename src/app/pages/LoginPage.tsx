import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, User, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginId.trim(),
      password,
    });

    if (authError || !authData.user) {
      setError('Invalid login ID or password.');
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      setError('Account found, but no role is set up for it. Contact the admin.');
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    setLoading(false);
    if (profile.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/district-dashboard');
    }
  };

  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="text-foreground uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '28px', fontWeight: 800, letterSpacing: '0.06em' }}
          >
            SAP Login
          </div>
          <p className="text-muted-foreground mt-1" style={{ fontSize: '13px' }}>
            District &amp; Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-border bg-card p-8 flex flex-col gap-5">
          <div>
            <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
              Login ID
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full bg-background border border-border pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 text-destructive" style={{ fontSize: '13px' }}>
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground py-3.5 w-full hover:bg-primary/90 transition-colors uppercase disabled:opacity-60"
            style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-muted-foreground mt-6" style={{ fontSize: '12px' }}>
          District login credentials are issued by SAP admin.
        </p>
      </div>
    </main>
  );
}