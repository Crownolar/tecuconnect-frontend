import { useMemo, useState } from "react";
import { Bell, CheckCheck, RefreshCw } from "lucide-react";

import NotificationFilters from "./components/NotificationFilters";
import NotificationItem from "./components/NotificationItem";
import NotificationDetailModal from "./components/NotificationDetailModal";

import {
  useMarkAllStaffNotificationsRead,
  useMarkStaffNotificationRead,
  useStaffNotifications,
  useStaffUnreadCount,
} from "./hooks";

const normalizeType = (notification) =>
  String(
    notification?.type ??
      notification?.category ??
      notification?.notificationType ??
      "SYSTEM",
  ).toUpperCase();

const isUnread = (notification) =>
  notification?.read === false ||
  notification?.isRead === false ||
  notification?.readAt === null;

const matchesFilter = (notification, filter) => {
  const type = normalizeType(notification);

  if (filter === "all") return true;

  if (filter === "unread") {
    return isUnread(notification);
  }

  if (filter === "milestones") {
    return type.includes("MILESTONE") || type === "LEVEL_UPGRADE";
  }

  if (filter === "mentorship") {
    return type.includes("Staff");
  }

  if (filter === "system") {
    return (
      type === "SYSTEM" ||
      type === "REPORT_READY" ||
      type === "ATTENDANCE_ALERT" ||
      type === "STAFF_REVIEW_REQUIRED" ||
      type === "DROPOUT_RISK" ||
      type === "STAGNATION_ALERT"
    );
  }

  return true;
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  /*
   * Fetch a larger page once and filter locally.
   *
   * This avoids depending on the backend's category parameter
   * matching the UI filter labels exactly.
   */
  const notificationsQuery = useStaffNotifications({
    page: 1,
    limit: 100,
  });

  const unreadQuery = useStaffUnreadCount();

  const markRead = useMarkStaffNotificationRead();
  const markAllRead = useMarkAllStaffNotificationsRead();

  const allNotifications = useMemo(() => {
    return Array.isArray(notificationsQuery.data?.data)
      ? notificationsQuery.data.data
      : [];
  }, [notificationsQuery.data]);

  const notifications = useMemo(() => {
    return allNotifications.filter((notification) =>
      matchesFilter(notification, filter),
    );
  }, [allNotifications, filter]);

  const unread = Number(
    unreadQuery.data?.unread ?? notificationsQuery.data?.unread ?? 0,
  );

  const filterCounts = useMemo(() => {
    return {
      all: allNotifications.length,
      unread: allNotifications.filter(isUnread).length,
      milestones: allNotifications.filter((notification) =>
        matchesFilter(notification, "milestones"),
      ).length,
      mentorship: allNotifications.filter((notification) =>
        matchesFilter(notification, "mentorship"),
      ).length,
      system: allNotifications.filter((notification) =>
        matchesFilter(notification, "system"),
      ).length,
    };
  }, [allNotifications]);

  const handleOpenNotification = async (notification) => {
    if (!notification?.id) {
      setSelectedNotification(notification);
      return;
    }

    /*
     * Mark it read immediately when the user opens it.
     * The detail modal still opens even if the mutation fails.
     */
    if (isUnread(notification)) {
      try {
        await markRead.mutateAsync(notification.id);
      } catch {
        // Keep the detail view usable even if marking as read fails.
      }
    }

    setSelectedNotification({
      ...notification,
      read: true,
      isRead: true,
    });
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

  const handleMarkAll = async () => {
    if (unread <= 0 || markAllRead.isPending) return;

    await markAllRead.mutateAsync();
  };

  const handleRefresh = () => {
    notificationsQuery.refetch();
    unreadQuery.refetch();
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            Staff Portal
          </p>

          <div className='mt-1 flex items-center gap-2'>
            <Bell className='h-6 w-6 text-primary' />

            <h1 className='text-2xl font-bold tracking-tight text-text-primary'>
              Notifications
            </h1>
          </div>

          <p className='mt-1 max-w-2xl text-sm text-text-secondary'>
            Stay on top of milestone reviews, mentorship activity, system
            alerts, and actions requiring your attention.
          </p>
        </div>

        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={handleRefresh}
            disabled={notificationsQuery.isFetching}
            className='inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text-primary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <RefreshCw
              className={`h-4 w-4 ${
                notificationsQuery.isFetching ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>

          <button
            type='button'
            disabled={unread <= 0 || markAllRead.isPending}
            onClick={handleMarkAll}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <CheckCheck className='h-4 w-4' />

            {markAllRead.isPending ? "Marking…" : "Mark all read"}
          </button>
        </div>
      </div>

      {/* Inbox controls */}
      <section className='rounded-xl border border-border bg-white p-4 sm:p-5'>
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary'>
              Inbox
            </p>

            <p className='mt-1 text-sm text-text-secondary'>
              {unread} unread notification
              {unread === 1 ? "" : "s"}
            </p>
          </div>

          <NotificationFilters
            value={filter}
            onChange={setFilter}
            counts={filterCounts}
          />
        </div>
      </section>

      {/* Error */}
      {notificationsQuery.isError || unreadQuery.isError ? (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          We could not load your notifications. Refresh the page and try again.
        </div>
      ) : null}

      {/* Notification list */}
      <section className='space-y-3'>
        {notificationsQuery.isLoading ? (
          <div className='rounded-xl border border-dashed border-border bg-white p-10 text-center text-sm text-text-secondary'>
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className='rounded-xl border border-dashed border-border bg-white p-10 text-center'>
            <Bell className='mx-auto h-8 w-8 text-slate-400' />

            <h2 className='mt-3 font-semibold text-text-primary'>
              No notifications
            </h2>

            <p className='mt-1 text-sm text-text-secondary'>
              {filter === "all"
                ? "You're all caught up. New staff alerts will appear here."
                : "There are no notifications matching this filter."}
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onOpen={handleOpenNotification}
              isReading={
                markRead.isPending && markRead.variables === notification.id
              }
            />
          ))
        )}
      </section>

      {/* Detail modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
