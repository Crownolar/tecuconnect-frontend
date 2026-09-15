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
      className="flex min-h-0 w-full flex-col justify-between rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-none sm:min-h-[165px] sm:rounded-[17.809px] sm:p-5 lg:p-6 xl:p-[29.682px]"
    >
      {/* Main Content */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        {/* Icon + Details */}
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${categoryStyle.iconClassName}`}
          >
            <Icon
              size={24}
              strokeWidth={2.25}
              className="sm:h-7 sm:w-7"
            />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-normal uppercase tracking-[0.02em] text-slate-400 sm:text-[13px] md:text-[14px]">
              {category}
            </p>

            <h2 className="break-words text-[14px] font-semibold leading-6 text-slate-900 sm:truncate sm:text-[15px] sm:leading-7 md:text-[16px]">
              {title}
            </h2>
          </div>
        </div>

        {/* Status */}
        <div className="shrink-0 self-start">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:border-t-0 sm:pt-0">
        <p className="text-[12px] text-slate-600 sm:text-[14px]">
          {date}
        </p>

        <button
          type="button"
          onClick={onViewDetails}
          className="self-start text-left text-[14px] font-semibold text-blue-500 transition hover:text-blue-700 sm:self-auto sm:text-[16px] md:text-[18px]"
        >
          View Details
        </button>
      </div>
    </Card>
  );
}