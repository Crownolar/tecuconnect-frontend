import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";

import PageHeader from "../../../../components/shared/PageHeader";

import {
  useNotifications,
  useUnreadNotificationCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "../hook/useNotification";

const filters = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "milestones", label: "Milestones" },
  { value: "mentorship", label: "Mentorship" },
  { value: "system", label: "System" },
];

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllMutation = useMarkAllNotificationsAsRead();

  const {
    data: notificationsResponse,
    isLoading,
    isError,
    error,
  } = useNotifications({
    filter: activeFilter,
    page: 1,
    limit: 20,
  });

  const { data: unreadResponse, isLoading: unreadCountLoading } =
    useUnreadNotificationCount();

  const notifications = notificationsResponse?.data ?? [];
  const meta = notificationsResponse?.meta;

  const unreadCount =
    unreadResponse?.unread ?? notificationsResponse?.unread ?? 0;

  const handleMarkAsRead = (notificationId) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb="Notifications"
        title="Notifications"
        description="Stay up to date with important updates about your TEC journey."
      />

      <section className="rounded-xl border border-border bg-white">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell size={18} className="text-primary" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary">
                Notifications
              </h2>

              <p className="text-xs text-text-secondary">
                {unreadCountLoading
                  ? "Checking unread notifications..."
                  : unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount === 1 ? "" : "s"
                      }`
                    : "You're all caught up"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={
              markAllMutation.isPending ||
              unreadCount === 0 ||
              unreadCountLoading
            }
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={15} />

            {markAllMutation.isPending ? "Marking..." : "Mark all as read"}
          </button>
        </div>

        {/* Filters */}
        <div className="border-b border-border px-5 py-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeFilter === filter.value
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {isLoading ? (
            <div className="flex min-h-52 items-center justify-center">
              <p className="text-sm text-text-secondary">
                Loading notifications...
              </p>
            </div>
          ) : isError ? (
            <div className="flex min-h-52 items-center justify-center rounded-lg border border-red-200 bg-red-50/30 p-5 text-center">
              <div>
                <p className="text-sm font-medium text-red-600">
                  Unable to load notifications.
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                  {error?.message ||
                    "Something went wrong while loading your notifications."}
                </p>
              </div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Bell size={20} className="text-text-secondary" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-text-primary">
                {activeFilter === "all"
                  ? "No notifications yet"
                  : "Nothing here yet"}
              </h3>

              <p className="mt-1 max-w-sm text-xs text-text-secondary">
                {activeFilter === "all"
                  ? "You're all caught up. New notifications will appear here."
                  : "There are no notifications in this category."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`rounded-lg border p-4 transition ${
                    notification.isRead
                      ? "border-border bg-white"
                      : "border-primary/20 bg-primary/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {!notification.isRead && (
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-text-primary">
                            {notification.title}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-text-secondary">
                            {notification.message}
                          </p>
                        </div>

                        {!notification.isRead && (
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(notification.id)}
                            disabled={markAsReadMutation.isPending}
                            className="shrink-0 text-xs font-semibold text-primary hover:underline disabled:opacity-50"
                          >
                            {markAsReadMutation.isPending
                              ? "Marking..."
                              : "Mark as read"}
                          </button>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-text-secondary">
                        <span className="rounded-full bg-slate-100 px-2 py-1">
                          {notification.type}
                        </span>

                        {notification.createdAt && (
                          <span>
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && !isError && notifications.length > 0 && meta && (
          <div className="border-t border-border px-5 py-3">
            <p className="text-xs text-text-secondary">
              Showing page {meta.page} of {meta.totalPages} · {meta.total}{" "}
              notification
              {meta.total === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;
