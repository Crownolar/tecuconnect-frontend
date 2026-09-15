import {
  CalendarDays,
  Clock,
  ArrowRight,
} from "lucide-react";

const UpcomingSessionCard = ({ session }) => {
  if (!session) return null;

  return (
    <div className="rounded-xl border border-border bg-white p-4 sm:p-6">
      <div
        className="
          flex flex-col gap-5
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* =========================================
            SESSION INFORMATION
            ========================================= */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary">
            Upcoming Session
          </p>

          <h2 className="mt-2 text-lg font-bold text-text-primary sm:text-xl">
            {session.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <CalendarDays
                size={16}
                className="shrink-0"
              />

              <span>{session.date}</span>
            </span>

            <span className="flex items-center gap-2">
              <Clock
                size={16}
                className="shrink-0"
              />

              <span>{session.time}</span>
            </span>
          </div>
        </div>

        {/* =========================================
            MENTOR + ACTION
            ========================================= */}
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-center sm:justify-between
            md:justify-end
          "
        >
          {/* Mentor */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {session.mentor.name.charAt(0)}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-text-primary">
                {session.mentor.name}
              </p>

              <p className="truncate text-sm text-text-secondary">
                {session.mentor.role}
              </p>
            </div>
          </div>

          {/* View Session */}
          <button
            type="button"
            className="
              flex w-full items-center justify-center gap-2
              rounded-lg bg-primary px-4 py-2.5
              text-sm font-medium text-white
              transition hover:opacity-90
              sm:w-auto
            "
          >
            <span>View Session</span>

            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;