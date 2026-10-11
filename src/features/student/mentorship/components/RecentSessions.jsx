const RecentSessions = ({ sessions = [] }) => {
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-base font-semibold text-text-primary">
        Recent Sessions
      </h2>

      <p className="mt-1 text-xs text-text-secondary">
        Your recent mentorship activity.
      </p>

      {sessions.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-slate-50 px-4 py-5 text-center">
          <p className="text-sm font-medium text-text-primary">
            No completed sessions yet
          </p>

          <p className="mt-1 text-xs text-text-secondary">
            Your completed mentorship sessions will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-lg border border-border bg-slate-50 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {session.topic || "Mentorship Session"}
                  </p>

                  <p className="mt-1 text-xs text-text-secondary">
                    {session.mentor?.name ||
                      session.mentor?.user?.firstName ||
                      "Mentor"}
                  </p>
                </div>

                <span className="text-[10px] font-medium text-text-secondary">
                  {session.completedAt
                    ? new Date(
                        session.completedAt,
                      ).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentSessions;