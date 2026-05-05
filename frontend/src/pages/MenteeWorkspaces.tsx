import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWorkspaces } from '../api/workspaces';

function MenteeWorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [localWorkspaces, setLocalWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkspaces()
      .then(setWorkspaces)
      .catch(() => setError('Unable to load workspaces.'))
      .finally(() => setLoading(false));
  }, []);

  const handleJoinWorkspace = () => {
    const code = window.prompt('Enter workspace code');
    if (!code) return;
    // For demo, just add a local workspace
    setLocalWorkspaces((current) => [
      { _id: `joined-${Date.now()}`, name: `Joined Workspace ${code}`, description: 'A workspace you joined.', members: [] },
      ...current
    ]);
  };

  const displayedWorkspaces = [...localWorkspaces, ...workspaces];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mentee Workspaces</p>
            <h2 className="mt-2 text-2xl font-semibold">Your learning workspaces</h2>
            <p className="mt-2 text-slate-600">Access workspaces assigned by your mentors and track your progress.</p>
          </div>
          <button
            onClick={handleJoinWorkspace}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Join workspace
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading workspaces…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedWorkspaces.map((workspace) => (
            <Link
              key={workspace._id}
              to={`/app/workspaces/${workspace._id}`}
              className="block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{workspace.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{workspace.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{workspace.members?.length || 0} members</span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">View</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenteeWorkspacesPage;