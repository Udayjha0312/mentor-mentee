import { useEffect, useMemo, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchDashboard } from '../api/dashboard';

function MenteeDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    fetchDashboard(user.role)
      .then(setStats)
      .catch(() => setError('Could not load dashboard.'))
      .finally(() => setLoading(false));
  }, [user]);

  const highlights = useMemo(
    () => [
      { label: 'Assigned projects', value: stats?.assignedProjects || 0, tone: 'from-sky-500 to-indigo-500' },
      { label: 'Due tasks', value: stats?.dueTasks || 0, tone: 'from-fuchsia-500 to-purple-500' },
      { label: 'In review', value: stats?.inReview || 0, tone: 'from-emerald-500 to-cyan-500' }
    ],
    [stats]
  );

  const taskRows = [
    { name: 'Project Alpha', status: 'In progress', due: '2 days', priority: 'High' },
    { name: 'Task Beta', status: 'Pending review', due: '1 week', priority: 'Medium' },
    { name: 'Milestone Gamma', status: 'Completed', due: 'Done', priority: 'Low' },
    { name: 'Submission Delta', status: 'Overdue', due: 'Yesterday', priority: 'High' },
    { name: 'Review Epsilon', status: 'In review', due: '3 days', priority: 'Medium' }
  ];

  if (!user) return null;

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-slate-200 bg-gradient-to-br from-white via-slate-100 to-slate-50 p-8 shadow-lg shadow-slate-200/30">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Hello, {user.name}. Ready to work on your projects today?</h1>
            <p className="mt-4 text-slate-600">Track your progress, view upcoming tasks, and stay connected with your mentors in one streamlined view.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Submit task
            </button>
            <button className="rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Contact mentor
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-4xl font-semibold text-slate-950">{item.value}</p>
                <div className={`mt-6 h-2 rounded-full bg-gradient-to-r ${item.tone}`} />
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upcoming Tasks</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Your current workload</h2>
              </div>
              <button className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                View all
              </button>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Task</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Due</th>
                    <th className="px-4 py-3">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {taskRows.map((row) => (
                    <tr key={row.name} className="border-t border-slate-200 hover:bg-slate-100">
                      <td className="px-4 py-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{row.status}</td>
                      <td className="px-4 py-4 text-sm text-slate-700">{row.due}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{row.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Progress insights</p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-slate-950/5 p-5">
                <p className="text-sm text-slate-500">Project completion</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-36 rounded-full bg-slate-900" />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/5 p-5">
                <p className="text-sm text-slate-500">Task submissions</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-28 rounded-full bg-indigo-500" />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/5 p-5">
                <p className="text-sm text-slate-500">Mentor feedback</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-24 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Your progress</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Personal stats</h2>
              </div>
              <span className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white">On track</span>
            </div>
            <div className="mt-6 grid gap-4">
              {Object.entries(stats || {}).map(([key, value]) => (
                <div key={key} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboardPage;