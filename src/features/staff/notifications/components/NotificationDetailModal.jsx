import {
  ArrowRight,
  Bell,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Flag,
  Info,
  ShieldAlert,
  Trophy,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TYPE_META = {
  MILESTONE_PENDING: {
    label: "Milestone pending",
    Icon: Bell,
    actionLabel: "Review milestone",
    route: "/mentor/reviews",
  },

  MILESTONE_VERIFIED: {
    label: "Milestone verified",
    Icon: CheckCircle2,
  },

  LEVEL_UPGRADE: {
    label: "Level upgrade",
    Icon: Trophy,
  },

  ATTENDANCE_ALERT: {
    label: "Attendance alert",
    Icon: CalendarClock,
  },

  MENTOR_SESSION_REMINDER: {
    label: "Session reminder",
    Icon: CalendarClock,
    actionLabel: "Open mentorship",
    route: "/mentor/mentorship",
  },

  STAFF_REVIEW_REQUIRED: {
    label: "Staff review required",
    Icon: Flag,
    actionLabel: "Review students",
    route: "/mentor/students",
  },

  DROPOUT_RISK: {
    label: "Dropout risk",
    Icon: ShieldAlert,
    actionLabel: "View students",
    route: "/mentor/students",
  },

  STAGNATION_ALERT: {
    label: "Stagnation alert",
    Icon: ShieldAlert,
    actionLabel: "View students",
    route: "/mentor/students",
  },

  REPORT_READY: {
    label: "Report ready",
    Icon: Info,
  },
};

const getType = (notification) =>
  String(
    notification?.type ??
      notification?.category ??
      notification?.notificationType ??
      "SYSTEM",
  ).toUpperCase();

/*
 * Prefer an explicit backend-provided destination.
 *
 * Different backends sometimes name this differently, so we support
 * the common fields without requiring any one of them.
 */
const getExplicitRoute = (notification) => {
  return (
    notification?.actionUrl ??
    notification?.action?.url ??
    notification?.action?.route ??
    notification?.link ??
    notification?.url ??
    notification?.metadata?.actionUrl ??
    notification?.metadata?.route ??
    notification?.data?.actionUrl ??
    notification?.data?.route ??
    null
  );
};

const getFallbackRoute = (notification) => {
  const type = getType(notification);
  return TYPE_META[type]?.route ?? null;
};

const getActionLabel = (notification) => {
  const explicitLabel =
    notification?.actionLabel ??
    notification?.action?.label ??
    notification?.metadata?.actionLabel ??
    notification?.data?.actionLabel;

  if (explicitLabel) {
    return explicitLabel;
  }

  const type = getType(notification);

  return TYPE_META[type]?.actionLabel ?? "Open";
};

const getDescription = (notification) => {
  return (
    notification?.description ??
    notification?.message ??
    notification?.body ??
    notification?.content ??
    "You have a new notification."
  );
};

const formatDateTime = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString([], {
    dateStyle: "full",
    timeStyle: "short",
  });
};

export default function NotificationDetailModal({ notification, onClose }) {
  const navigate = useNavigate();

  if (!notification) {
    return null;
  }

  const type = getType(notification);

  const meta = TYPE_META[type] ?? {
    label: "Notification",
    Icon: Info,
  };

  const Icon = meta.Icon;

  const route =
    getExplicitRoute(notification) ?? getFallbackRoute(notification);

  const actionLabel = getActionLabel(notification);

  const timestamp =
    notification?.createdAt ?? notification?.timestamp ?? notification?.sentAt;

  const handleAction = () => {
    if (!route) return;

    onClose();
    navigate(route);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-detail-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {meta.label}
              </p>

              <h2
                id="notification-detail-title"
                className="mt-1 text-xl font-bold tracking-tight text-text-primary"
              >
                {notification?.title || meta.label}
              </h2>
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

        {/* Body */}
        <div className="space-y-5 p-5 sm:p-6">
          {timestamp ? (
            <p className="text-xs text-text-secondary">
              {formatDateTime(timestamp)}
            </p>
          ) : null}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {getDescription(notification)}
            </p>
          </div>

          {/* Optional backend metadata */}
          {notification?.metadata &&
          typeof notification.metadata === "object" &&
          !Array.isArray(notification.metadata) ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                Additional information
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {Object.entries(notification.metadata)
                  .filter(
                    ([key, value]) =>
                      !["actionUrl", "route", "actionLabel"].includes(key) &&
                      value !== null &&
                      value !== undefined &&
                      typeof value !== "object",
                  )
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {String(value)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-slate-100"
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
