import { useEffect, useMemo, useState } from 'react';
import { fetchProjects } from '../api/projects';

function useQueryParams() {
  return new URLSearchParams(window.location.search);
}

function ProjectsPage() {
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
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Projects</p>
            <h2 className="mt-2 text-2xl font-semibold">{workspaceLabel}</h2>
          </div>
          <button
            type="button"
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
        <div className="grid gap-6 md:grid-cols-2">
          {displayedProjects.map((project) => (
            <div key={project._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
              <p className="mt-3 text-slate-500">{project.description || 'No description yet.'}</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>{project.status || 'Draft'}</span>
                <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
