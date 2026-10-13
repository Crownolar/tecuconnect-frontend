import {
  ArrowUpRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  Info,
  ShieldAlert,
  Trophy,
} from "lucide-react";

const TYPE_META = {
  MILESTONE_PENDING: { label: "Milestone pending", Icon: Bell },
  MILESTONE_VERIFIED: { label: "Milestone verified", Icon: CheckCircle2 },
  MILESTONE: { label: "Milestone update", Icon: Trophy },
  LEVEL_UPGRADE: { label: "Level upgrade", Icon: Trophy },
  MENTOR_SESSION_REMINDER: { label: "Session reminder", Icon: CalendarClock },
  MENTORSHIP: { label: "Mentorship update", Icon: CalendarClock },
  ATTENDANCE_ALERT: { label: "Attendance alert", Icon: ShieldAlert },
  SYSTEM: { label: "System notification", Icon: Info },
};

const getType = (notification) =>
  String(notification?.type ?? notification?.category ?? notification?.notificationType ?? "SYSTEM").toUpperCase();

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
};

const isUnread = (notification) => {
  if (typeof notification?.read === "boolean") return !notification.read;
  if (typeof notification?.isRead === "boolean") return !notification.isRead;
  if (notification?.readAt !== undefined) return notification.readAt === null;
  return false;
};

export default function NotificationItem({ notification, onOpen, isReading }) {
  const type = getType(notification);
  const meta = TYPE_META[type] ?? { label: type.replace(/_/g, " ").toLowerCase(), Icon: Info };
  const Icon = meta.Icon;
  const unread = isUnread(notification);
  const timestamp = notification?.createdAt ?? notification?.timestamp ?? notification?.sentAt;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(notification)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(notification);
        }
      }}
      className={`group cursor-pointer rounded-xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-primary/30 ${
        unread
          ? "border-primary/20 bg-primary/[0.035] hover:border-primary/40 hover:bg-primary/[0.06]"
          : "border-border bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div className="flex gap-3">
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          unread ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600"
        }`}>
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-text-primary">
                  {notification?.title || meta.label}
                </h3>
                {unread ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    Unread
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary">
                {notification?.message ?? notification?.description ?? notification?.body ?? notification?.content ?? "You have a new notification."}
              </p>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-primary" />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
            <span>{meta.label}</span>
            {timestamp ? (
              <>
                <span aria-hidden="true">•</span>
                <time dateTime={timestamp}>{formatDateTime(timestamp)}</time>
              </>
            ) : null}
            {isReading ? (
              <>
                <span aria-hidden="true">•</span>
                <span>Opening…</span>
              </>
            ) : (
              <span className="ml-auto hidden font-medium text-primary sm:inline">View details</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
