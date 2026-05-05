function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="mt-2 text-slate-500">Configure notifications, display preferences, and account choices.</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"> 
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="font-semibold">User interface</p>
            <p className="mt-2 text-sm text-slate-500">Dark mode and theme controls will be available in a future release.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="font-semibold">Notifications</p>
            <p className="mt-2 text-sm text-slate-500">Manage email and activity alerts from the dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
