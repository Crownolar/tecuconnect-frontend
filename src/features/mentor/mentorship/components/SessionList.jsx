import { CalendarClock, Clock3 } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
};

export default function SessionList({ sessions = [], emptyMessage }) {
  if (!sessions.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center">
        <CalendarClock className="mx-auto h-7 w-7 text-text-secondary" />
        <h3 className="mt-3 text-sm font-semibold text-text-primary">
          Nothing here yet
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {emptyMessage || "Mentorship sessions will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sessions.map((session) => (
        <article
          key={session.id}
          className="rounded-xl border border-border bg-white p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {session.sessionType || "Mentorship session"}
              </p>
              <h3 className="mt-1 font-semibold text-text-primary">
                {session.title || `Session with ${session.studentName || "student"}`}
              </h3>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              {session.status || "SCHEDULED"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4" />
              {formatDate(session.dateTime)}
            </span>
            {session.durationMins ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {session.durationMins} mins
              </span>
            ) : null}
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Student
            </p>
            <p className="mt-1 text-sm font-medium text-text-primary">
              {session.studentName || "—"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
