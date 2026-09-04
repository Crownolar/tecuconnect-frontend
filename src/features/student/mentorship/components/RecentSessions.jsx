const RecentSessions = ({ sessions = [] }) => {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">
        Recent Sessions
      </h2>

      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-lg border border-border p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xs font-semibold text-text-primary">
                  {session.title}
                </h3>

                <p className="mt-1 text-xs text-text-secondary">
                  {session.mentor}
                </p>
              </div>

              <div className="text-right">
                <span className="rounded bg-green-50 px-2 py-1 text-[10px] font-medium text-green-600">
                  {session.status}
                </span>

                <p className="mt-2 text-[10px] text-text-secondary">
                  {session.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 text-xs font-semibold text-primary hover:underline"
      >
        View All Sessions →
      </button>
    </div>
  );
};

export default RecentSessions;