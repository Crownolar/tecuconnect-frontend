import { useMemo, useState } from "react";

import PageHeader from "../../../../components/shared/PageHeader";

import NotificationTabs from "../components/NotificationTabs";
import NotificationGroup from "../components/NotificationGroup";
import NotificationEmptyState from "../components/NotificationEmptyState";

import { useNotifications, useMarkNotificationAsRead } from "../hooks";

const tabs = ["All", "Unread", "Milestones", "Mentorship", "System"];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");

  const { data: notifications = [], isLoading, isError } = useNotifications();

  const markAsRead = useMarkNotificationAsRead();

  const filteredNotifications = useMemo(() => {
    if (activeTab === "All") {
      return notifications;
    }

    if (activeTab === "Unread") {
      return notifications.filter((notification) => !notification.read);
    }

    return notifications.filter(
      (notification) => notification.category === activeTab,
    );
  }, [activeTab, notifications]);

  const groupedNotifications = useMemo(() => {
    const groups = {};

    filteredNotifications.forEach((notification) => {
      const date = new Date(notification.createdAt);

      const label = date.toDateString();

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(notification);
    });

    return Object.entries(groups).map(([label, items]) => ({
      label,
      items: items.map((notification) => ({
        ...notification,

        // Adapt the API notification shape
        // to the existing UI component shape.
        unread: !notification.read,

        category: notification.category || "System",

        time: new Date(notification.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      })),
    }));
  }, [filteredNotifications]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead.mutate(notification.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-slate-500">
        Loading notifications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        Unable to load notifications.
      </div>
    );
  }

  const hasNotifications = groupedNotifications.length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with your entrepreneurial journey."
        action={
          <button
            type="button"
            className="text-sm font-medium text-accent transition hover:text-primary"
          >
            Mark all as read
          </button>
        }
      />

      <div className="space-y-6">
        <NotificationTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {hasNotifications ? (
          <div className="space-y-6">
            {groupedNotifications.map((group) => (
              <NotificationGroup
                key={group.label}
                label={group.label}
                items={group.items}
              />
            ))}
          </div>
        ) : (
          <NotificationEmptyState
            title={`No ${activeTab.toLowerCase()} notifications`}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
