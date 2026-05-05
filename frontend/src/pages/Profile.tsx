import { useAuthStore } from '../store/authStore';

function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="mt-2 text-slate-500">Manage your account details and preferences.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
