import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";

const cards = [
  {
    key: "activeMentorships",
    label: "Active Mentees",
    icon: Users,
  },
  {
    key: "pendingRequests",
    label: "Pending Requests",
    icon: Clock3,
  },
  {
    key: "upcomingSessions",
    label: "Upcoming Sessions",
    icon: CalendarDays,
  },
  {
    key: "sessionsCompleted",
    label: "Sessions Completed",
    icon: CheckCircle2,
  },
];

export default function MentorshipStats({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-xl border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-secondary">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {stats?.[key] ?? 0}
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
