import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import { useAuthStore } from '../store/authStore';

function SignupPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await signup({ name, email, password, organizationName });
      setAuth(data.token, data.user);
      const rolePath = data.user.role === 'MENTOR' ? '/app/mentor/dashboard' : '/app/mentee/dashboard';
      navigate(rolePath);
    } catch (err) {
      setError('Unable to sign up. Check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1.2fr_0.95fr]">
        <section className="flex flex-col justify-center gap-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            Create your mentor workspace
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Get started with mentoring, one project at a time.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Create a workspace, invite your team, and manage student success from a polished dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Already have an account
            </Link>
          </div>
        </section>

        <main className="rounded-[40px] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sign up</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Build your mentor network</h2>
              <p className="mt-2 text-slate-400">Fill in your details and start your workspace today.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Full name</label>
                <input
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-slate-300"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Organization name</label>
                <input
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-slate-300"
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <input
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-slate-300"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                <input
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-slate-300"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-sky-500 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignupPage;
