import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const UpcomingSessionCard = ({ session }) => {
  if (!session) return null;

  return (
    <div className="rounded-xl border border-border bg-white p-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        
        <div>
          <p className="text-sm font-medium text-primary">
            Upcoming Session
          </p>

          <h2 className="mt-2 text-xl font-bold text-text-primary">
            {session.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {session.date}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} />
              {session.time}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {session.mentor.name.charAt(0)}
            </div>

            <div>
              <p className="font-semibold text-text-primary">
                {session.mentor.name}
              </p>

              <p className="text-sm text-text-secondary">
                {session.mentor.role}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
            View Session
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;