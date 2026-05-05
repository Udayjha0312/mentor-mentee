import { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '../api/projects';

function useQueryParams() {
  return new URLSearchParams(window.location.search);
}

function MentorProjectsPage() {
  const query = useQueryParams();
  const workspaceId = query.get('workspaceId');
  const [projects, setProjects] = useState<any[]>([]);
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const workspaceLabel = useMemo(() => (workspaceId ? `Workspace ${workspaceId}` : 'All workspaces'), [workspaceId]);

  useEffect(() => {
    if (!workspaceId) {
      setError('Select a workspace to see projects.');
      setLoading(false);
      return;
    }
    fetchProjects(workspaceId)
      .then(setProjects)
      .catch(() => setError('Unable to load projects.'))
      .finally(() => setLoading(false));
  }, [workspaceId]);

  const handleCreateProject = () => {
    if (!workspaceId) {
      window.alert('Choose a workspace before creating a project.');
      return;
    }
    const name = window.prompt('Project name');
    if (!name) return;
    const description = window.prompt('Project description') || '';
    const newProject = {
      _id: `new-${Date.now()}`,
      name,
      description,
      status: 'Draft',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
    };
    setLocalProjects((current) => [newProject, ...current]);
  };

  const displayedProjects = [...localProjects, ...projects];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mentor Projects</p>
            <h2 className="mt-2 text-2xl font-semibold">Manage projects in {workspaceLabel}</h2>
            <p className="mt-2 text-slate-600">Create and oversee projects to guide your mentees.</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Create project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading projects…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project) => (
            <div key={project._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                    <span>Status: {project.status}</span>
                    <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  project.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MentorProjectsPage;