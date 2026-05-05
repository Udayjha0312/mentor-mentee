function InvitationsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Invitations</p>
            <h2 className="mt-2 text-2xl font-semibold">Team invitations</h2>
          </div>
          <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">
            Send invitation
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">You can invite teammates from a workspace once your organization is ready. Invitation acceptance is managed through the backend workflow.</p>
      </div>
    </div>
  );
}

export default InvitationsPage;
