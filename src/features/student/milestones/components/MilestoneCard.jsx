import { AlertTriangle, BookOpen, Medal, Users } from "lucide-react";

import Card from "../../../../components/ui/Card";
import StatusBadge from "../../../../components/shared/StatusBadge";

const categoryStyles = {
  "Innovation & Product": {
    icon: Medal,
    iconClassName: "bg-blue-50 text-blue-500",
  },
  Entrepreneurship: {
    icon: BookOpen,
    iconClassName: "bg-blue-50 text-blue-500",
  },
  "Communication & Pitch": {
    icon: Users,
    iconClassName: "bg-amber-50 text-amber-500",
  },
  "Training & Development": {
    icon: AlertTriangle,
    iconClassName: "bg-red-50 text-red-500",
  },
};

export default function MilestoneCard({
  category,
  title,
  date,
  status,
  onViewDetails,
}) {
  const categoryStyle =
    categoryStyles[category] || categoryStyles.Entrepreneurship;
  const Icon = categoryStyle.icon;

  return (
    <Card
      padding="none"
      className="flex min-h-41.25 flex-col justify-between rounded-2xl border-slate-200 bg-white p-7 shadow-none"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className={`flex h-15 w-15 shrink-0 items-center justify-center rounded-xl ${categoryStyle.iconClassName}`}
          >
            <Icon size={28} strokeWidth={2.25} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[16px] font-semibold uppercase tracking-[0.02em] text-slate-400">
              {category}
            </p>
            <h2 className="truncate text-[24px] font-bold leading-7 text-slate-900">
              {title}
            </h2>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-[18px] text-slate-600">{date}</p>
        <button
          type="button"
          onClick={onViewDetails}
          className="shrink-0 text-[18px] font-semibold text-blue-500 transition hover:text-blue-700"
        >
          View Details
        </button>
      </div>
    </Card>
  );
}
