import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-500">The page you’re looking for doesn’t exist yet or has been moved.</p>
        <Link to="/" className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
