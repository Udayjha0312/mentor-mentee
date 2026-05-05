import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function AppShell() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const role = user?.role.toLowerCase() || 'mentee';

  const navItems = [
    { label: 'Dashboard', path: `/app/${role}/dashboard` },
    { label: 'Workspaces', path: `/app/${role}/workspaces` },
    { label: 'Projects', path: `/app/${role}/projects` },
    { label: 'Invitations', path: '/app/invitations' },
    { label: 'Profile', path: '/app/profile' }
  ];

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-6">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Mentor Hub</h1>
            <p className="mt-2 text-sm text-slate-500">Manage teams, tasks, and project progress.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="space-y-6">
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Workspace mentorship platform</p>
                <h2 className="text-2xl font-semibold">Your workspace dashboard</h2>
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppShell;
