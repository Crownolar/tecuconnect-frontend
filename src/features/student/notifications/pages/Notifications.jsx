import { useMemo, useState } from "react";
import { Bell, CheckCheck, RefreshCw } from "lucide-react";

import NotificationFilters from "../components/NotificationFilters";
import NotificationItem from "../components/NotificationItem";
import NotificationDetailModal from "../components/NotificationDetailModal";
import {
  useNotifications,
  useUnreadNotificationCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "../hook/useNotification";

const normalizeType = (notification) =>
  String(
    notification?.type ??
      notification?.category ??
      notification?.notificationType ??
      "SYSTEM",
  ).toUpperCase();

const isUnread = (notification) => {
  if (typeof notification?.read === "boolean") return !notification.read;
  if (typeof notification?.isRead === "boolean") return !notification.isRead;
  if (notification?.readAt !== undefined) return notification.readAt === null;
  return false;
};

const matchesFilter = (notification, filter) => {
  const type = normalizeType(notification);

  if (filter === "all") return true;
  if (filter === "unread") return isUnread(notification);
  if (filter === "milestones") {
    return type.includes("MILESTONE") || type === "LEVEL_UPGRADE";
  }
  if (filter === "mentorship") {
    return type.includes("MENTOR") || type.includes("MENTORSHIP") || type.includes("SESSION");
  }
  if (filter === "system") {
    return [
      "SYSTEM",
      "REPORT_READY",
      "ATTENDANCE_ALERT",
      "STAFF_REVIEW_REQUIRED",
      "DROPOUT_RISK",
      "STAGNATION_ALERT",
    ].includes(type);
  }
  return true;
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Fetch a larger page and filter locally so UI labels don't depend on
  // backend category-filter conventions.
  const notificationsQuery = useNotifications({ page: 1, limit: 100 });
  const unreadQuery = useUnreadNotificationCount();
  const markRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsAsRead();

  const allNotifications = useMemo(
    () => Array.isArray(notificationsQuery.data?.data) ? notificationsQuery.data.data : [],
    [notificationsQuery.data],
  );

  const notifications = useMemo(
    () => allNotifications.filter((notification) => matchesFilter(notification, filter)),
    [allNotifications, filter],
  );

  const unreadCount = Number(
    unreadQuery.data?.unread ?? notificationsQuery.data?.unread ?? 0,
  );

  const filterCounts = useMemo(() => ({
    all: allNotifications.length,
    unread: allNotifications.filter(isUnread).length,
    milestones: allNotifications.filter((n) => matchesFilter(n, "milestones")).length,
    mentorship: allNotifications.filter((n) => matchesFilter(n, "mentorship")).length,
    system: allNotifications.filter((n) => matchesFilter(n, "system")).length,
  }), [allNotifications]);

  const handleOpenNotification = async (notification) => {
    // Open details even if the read request fails.
    setSelectedNotification({
      ...notification,
      read: isUnread(notification) ? true : notification.read,
      isRead: true,
    });

    if (notification?.id && isUnread(notification)) {
      try {
        await markRead.mutateAsync(notification.id);
      } catch {
        // The modal remains available if marking as read fails.
      }
    }
  };

  const handleMarkAll = async () => {
    if (unreadCount <= 0 || markAllRead.isPending) return;
    try {
      await markAllRead.mutateAsync();
    } catch {
      // Mutation error is surfaced below.
    }
  };

  const handleRefresh = () => {
    notificationsQuery.refetch();
    unreadQuery.refetch();
  };

  const isFetching = notificationsQuery.isFetching || unreadQuery.isFetching;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Student Portal
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Notifications
            </h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">
            Stay up to date with milestone progress, mentorship activity, attendance
            alerts, and important updates about your TEC journey.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isFetching}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            disabled={unreadCount <= 0 || markAllRead.isPending}
            onClick={handleMarkAll}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck className="h-4 w-4" />
            {markAllRead.isPending ? "Marking…" : "Mark all read"}
          </button>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
              Inbox
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {unreadQuery.isLoading
                ? "Checking unread notifications…"
                : `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
            </p>
          </div>
          <NotificationFilters value={filter} onChange={setFilter} counts={filterCounts} />
        </div>
      </section>

      {notificationsQuery.isError || unreadQuery.isError || markAllRead.isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          We could not load or update your notifications. Refresh and try again.
          {notificationsQuery.error?.message || unreadQuery.error?.message || markAllRead.error?.message
            ? <p className="mt-1 text-xs">{notificationsQuery.error?.message || unreadQuery.error?.message || markAllRead.error?.message}</p>
            : null}
        </div>
      ) : null}

      <section className="space-y-3">
        {notificationsQuery.isLoading ? (
          <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center text-sm text-text-secondary">
            Loading notifications…
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center">
            <Bell className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-3 font-semibold text-text-primary">
              {filter === "all" ? "No notifications yet" : "Nothing here yet"}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              {filter === "all"
                ? "You're all caught up. New notifications will appear here."
                : "There are no notifications matching this filter."}
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <NotificationItem
              key={notification.id ?? `${notification.title ?? "notification"}-${notification.createdAt ?? index}`}
              notification={notification}
              onOpen={handleOpenNotification}
              isReading={markRead.isPending && markRead.variables === notification.id}
            />
          ))
        )}
      </section>

      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </div>
  );
}
