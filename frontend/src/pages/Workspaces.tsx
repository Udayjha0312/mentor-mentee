import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWorkspaces } from '../api/workspaces';

function WorkspacesPage() {
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

  const handleAddWorkspace = () => {
    const name = window.prompt('Workspace name');
    if (!name) return;
    const description = window.prompt('Workspace description') || '';
    setLocalWorkspaces((current) => [
      { _id: `new-${Date.now()}`, name, description, members: [] },
      ...current
    ]);
  };

  const displayedWorkspaces = [...localWorkspaces, ...workspaces];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Workspaces</p>
            <h2 className="mt-2 text-2xl font-semibold">Your workspace list</h2>
          </div>
          <button
            onClick={handleAddWorkspace}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Add workspace
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading workspaces…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {displayedWorkspaces.map((workspace) => (
            <Link
              key={workspace._id}
              to={`/app/workspaces/${workspace._id}`}
              className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-900"
            >
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-900">{workspace.name}</h3>
              <p className="mt-3 text-slate-500">{workspace.description || 'No description set yet.'}</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                <span>{workspace.members?.length ?? 0} members</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkspacesPage;
