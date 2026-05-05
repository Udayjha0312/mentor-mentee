import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWorkspace } from '../api/workspaces';

function WorkspaceDetailsPage() {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!workspaceId) return;
    fetchWorkspace(workspaceId)
      .then(setWorkspace)
      .catch(() => setError('Unable to load workspace details.'))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Workspace details</h2>
        <p className="mt-2 text-slate-500">Review members, roles, and projects inside this workspace.</p>
      </div>
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading workspace…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : workspace ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{workspace.name}</h3>
            <p className="mt-3 text-slate-500">{workspace.description || 'No description provided.'}</p>
          </div>
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Members</h3>
            <div className="mt-4 space-y-3">
              {workspace.members?.map((member: any) => (
                <div key={member.user._id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-medium text-slate-900">{member.user.name}</p>
                    <p className="text-sm text-slate-500">{member.user.email}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WorkspaceDetailsPage;
