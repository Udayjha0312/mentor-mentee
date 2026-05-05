import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTask } from '../api/tasks';

function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!taskId) return;
    fetchTask(taskId)
      .then(setTask)
      .catch(() => setError('Unable to load task details.'))
      .finally(() => setLoading(false));
  }, [taskId]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Task details</h2>
        <p className="mt-2 text-slate-500">Review task progress, submission info, and mentor feedback.</p>
      </div>
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading task…</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : task ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="mt-3 text-slate-500">{task.description || 'No description added.'}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{task.status}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Due date</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TaskDetailsPage;
