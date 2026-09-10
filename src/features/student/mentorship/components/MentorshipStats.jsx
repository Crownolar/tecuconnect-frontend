import { Users, CheckCircle2, CalendarDays } from "lucide-react";

const iconMap = {
  "active-mentorships": Users,
  "sessions-completed": CheckCircle2,
  "upcoming-sessions": CalendarDays,
};

const MentorshipStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = iconMap[stat.id];

        return (
          <div
            key={stat.id}
            className="rounded-xl border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-text-secondary">
                {stat.label}
              </p>

              {Icon && (
                <Icon
                  size={18}
                  className="text-primary"
                />
              )}
            </div>

            <h3 className="mt-3 text-2xl font-bold text-text-primary">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default MentorshipStats;