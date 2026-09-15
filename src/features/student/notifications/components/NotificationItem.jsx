import { Circle, UserRoundCheck, BellDot, Ribbon } from "lucide-react";

const icons = {
  info: BellDot,
  success: UserRoundCheck,
  muted: Ribbon,
};

const palette = {
  success: "bg-emerald-50 text-emerald-700",
  info: "bg-emerald-50 text-emerald-700",
  muted: "bg-slate-200/70 text-slate-500",
};

const iconColors = {
  info: "#eab308",
  muted: "#64748b",
  success: "#16a34a",
};

const NotificationIcon = ({ tone }) => {
  const Icon = icons[tone] ?? BellDot;

  return (
    <div
      className={`grid h-8 w-8 place-items-center rounded-lg ${
        palette[tone] ?? palette.info
      }`}
    >
      <Icon
        size={16}
        color={iconColors[tone] ?? iconColors.info}
      />
    </div>
  );
};

const NotificationItem = ({ item }) => {
  return (
    <article
      className={`grid gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 sm:gap-4 md:grid-cols-[26px_auto_minmax(0,1fr)_auto] md:py-5 ${
        item.tone === "muted"
          ? "text-slate-500"
          : "text-slate-800"
      }`}
    >
      {/* Unread indicator */}
      <span className="flex items-start justify-center pt-1">
        {item.unread && (
          <Circle
            size={8}
            fill="currentColor"
            className="text-emerald-600"
          />
        )}
      </span>

      {/* Notification icon */}
      <div className="flex items-start">
        <NotificationIcon tone={item.tone} />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <span
          className={`mb-1.5 inline-block text-xs font-semibold uppercase tracking-[0.12em] ${
            item.tone === "muted"
              ? "text-slate-500"
              : "text-emerald-700"
          }`}
        >
          {item.category}
        </span>

        <h3 className="text-sm font-semibold leading-5 text-slate-900">
          {item.title}
        </h3>

        <p className="mt-1.5 text-sm leading-5 text-slate-600">
          {item.text}
        </p>
      </div>

      {/* Time */}
      <time className="whitespace-nowrap text-xs text-slate-500 md:pt-1.5">
        {item.time}
      </time>
    </article>
  );
};

export default NotificationItem;