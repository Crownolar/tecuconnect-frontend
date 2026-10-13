import { useEffect } from "react";
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  Info,
  ShieldAlert,
  Trophy,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TYPE_META = {
  MILESTONE_PENDING: { label: "Milestone pending", Icon: Bell, actionLabel: "View milestones", route: "/student/milestones" },
  MILESTONE_VERIFIED: { label: "Milestone verified", Icon: CheckCircle2, actionLabel: "View milestones", route: "/student/milestones" },
  MILESTONE: { label: "Milestone update", Icon: Trophy, actionLabel: "View milestones", route: "/student/milestones" },
  LEVEL_UPGRADE: { label: "Level upgrade", Icon: Trophy, actionLabel: "View journey", route: "/student/journey" },
  MENTOR_SESSION_REMINDER: { label: "Session reminder", Icon: CalendarClock, actionLabel: "Open mentorship", route: "/student/mentorship" },
  MENTORSHIP: { label: "Mentorship update", Icon: CalendarClock, actionLabel: "Open mentorship", route: "/student/mentorship" },
  ATTENDANCE_ALERT: { label: "Attendance alert", Icon: ShieldAlert },
  SYSTEM: { label: "System notification", Icon: Info },
};

const getType = (notification) =>
  String(notification?.type ?? notification?.category ?? notification?.notificationType ?? "SYSTEM").toUpperCase();

const getExplicitRoute = (notification) =>
  notification?.actionUrl ??
  notification?.action?.url ??
  notification?.action?.route ??
  notification?.link ??
  notification?.url ??
  notification?.metadata?.actionUrl ??
  notification?.metadata?.route ??
  notification?.data?.actionUrl ??
  notification?.data?.route ??
  null;

const getDescription = (notification) =>
  notification?.description ?? notification?.message ?? notification?.body ?? notification?.content ?? "You have a new notification.";

const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], { dateStyle: "full", timeStyle: "short" });
};

const humanize = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase());

export default function NotificationDetailModal({ notification, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!notification) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [notification, onClose]);

  if (!notification) return null;

  const type = getType(notification);
  const meta = TYPE_META[type] ?? { label: humanize(type.toLowerCase()), Icon: Info };
  const Icon = meta.Icon;
  const route = getExplicitRoute(notification) ?? meta.route ?? null;
  const explicitLabel =
    notification?.actionLabel ??
    notification?.action?.label ??
    notification?.metadata?.actionLabel ??
    notification?.data?.actionLabel;
  const actionLabel = explicitLabel ?? meta.actionLabel ?? "View related page";
  const timestamp = notification?.createdAt ?? notification?.timestamp ?? notification?.sentAt ?? notification?.updatedAt;
  const isRead =
    notification?.read === true ||
    notification?.isRead === true ||
    (notification?.readAt != null && notification?.readAt !== "");

  const handleAction = () => {
    if (!route) return;
    onClose();
    navigate(route);
  };

  const metadataEntries =
    notification?.metadata && typeof notification.metadata === "object" && !Array.isArray(notification.metadata)
      ? Object.entries(notification.metadata).filter(
          ([key, value]) =>
            !["actionUrl", "route", "actionLabel"].includes(key) &&
            value !== null &&
            value !== undefined &&
            typeof value !== "object",
        )
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-notification-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{meta.label}</p>
              <h2 id="student-notification-title" className="mt-1 break-words text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                {notification?.title ?? meta.label}
              </h2>
              <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                isRead ? "bg-slate-100 text-slate-600" : "bg-primary/10 text-primary"
              }`}>
                {isRead ? "Read" : "Unread"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification details"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {timestamp ? <p className="text-xs text-text-secondary">{formatDateTime(timestamp)}</p> : null}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">{getDescription(notification)}</p>
          </div>

          {metadataEntries.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">Additional information</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {metadataEntries.map(([key, value]) => (
                  <div key={key} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{humanize(key)}</p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-700">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-slate-100"
          >
            Close
          </button>
          {route ? (
            <button
              type="button"
              onClick={handleAction}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              {actionLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
