import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../api/projects';

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) return;
    fetchProject(projectId)
      .then(setProject)
      .catch(() => setError('Unable to load project details.'))
      .finally(() => setLoading(false));
  }, [projectId]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Project details</h2>
        <p className="mt-2 text-slate-500">Review project milestones, members and task status.</p>
      </div>
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading project…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : project ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="mt-4 text-slate-500">{project.description}</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-1 text-lg font-semibold">{project.status}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Timeline</p>
                <p className="mt-1 text-lg font-semibold">{new Date(project.startDate).toLocaleDateString()} — {new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Members</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              {project.members?.map((member: any) => (
                <li key={member._id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectDetailsPage;
