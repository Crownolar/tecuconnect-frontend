const ProgressBar = ({ value }) => {
  return (
    <div
      className="mt-3 h-2 w-full overflow-hidden rounded-full bg-primary-light"
      aria-label={`${value}% progress`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

const JourneySummary = ({ journey }) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-text-primary">
        Entrepreneurship Journey
      </h2>

      <div className="mt-5 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-text-secondary">
              Current Level
            </p>

            <p className="mt-1 text-sm font-semibold text-text-primary">
              {journey.currentLevel}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
            Active Stage
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">
              Progress to Next Level
            </span>

            <span className="font-semibold text-accent">
              {journey.progress}%
            </span>
          </div>

          <ProgressBar value={journey.progress} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-sm">
            <span className="text-text-secondary">
              Milestones Achieved
            </span>

            <span className="font-semibold text-text-primary">
              {journey.milestonesAchieved.completed} of{" "}
              {journey.milestonesAchieved.total} verified
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-sm">
            <span className="text-text-secondary">
              Mentorship Sessions
            </span>

            <span className="font-semibold text-text-primary">
              {journey.mentorshipSessions.completed} completed
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-sm">
            <span className="text-text-secondary">
              TEIS Score
            </span>

            <span className="font-semibold text-accent">
              {journey.teisScore}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySummary;