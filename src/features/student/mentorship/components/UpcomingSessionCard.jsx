import { CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "Date not available";

  return new Date(value).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "Time not available";

  return new Date(value).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const UpcomingSessionCard = ({ session }) => {
  if (!session) return null;

  const mentorName =
    session.mentor?.user?.firstName && session.mentor?.user?.lastName
      ? `${session.mentor.user.firstName} ${session.mentor.user.lastName}`
      : session.mentor?.name || "Your Mentor";

  const sessionDate =
    session.scheduledAt ||
    session.startTime ||
    session.date ||
    session.preferredDate;

  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Upcoming Session
          </p>

          <h2 className="mt-1 text-base font-semibold text-text-primary">
            {session.topic || "Mentorship Session"}
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Your next scheduled mentorship session.
          </p>
        </div>

        <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          {session.status || "Scheduled"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <CalendarDays className="h-4 w-4" />

            <span className="text-xs font-medium">Date</span>
          </div>

          <p className="mt-2 text-sm font-semibold text-text-primary">
            {formatDate(sessionDate)}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock3 className="h-4 w-4" />

            <span className="text-xs font-medium">Time</span>
          </div>

          <p className="mt-2 text-sm font-semibold text-text-primary">
            {formatTime(sessionDate)}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <UserRound className="h-4 w-4" />

            <span className="text-xs font-medium">Mentor</span>
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-text-primary">
            {mentorName}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin className="h-4 w-4" />

            <span className="text-xs font-medium">Location</span>
          </div>

          <p className="mt-2 truncate text-sm font-semibold text-text-primary">
            {session.location || "To be confirmed"}
          </p>
        </div>
      </div>

      {session.notes && (
        <div className="mt-4 rounded-lg border border-border bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold text-text-primary">
            Session notes
          </p>

          <p className="mt-1 text-xs leading-5 text-text-secondary">
            {session.notes}
          </p>
        </div>
      )}
    </section>
  );
};

export default UpcomingSessionCard;
