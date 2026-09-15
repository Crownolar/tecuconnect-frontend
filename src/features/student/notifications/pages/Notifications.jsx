import { useMemo, useState } from "react";

import PageHeader from "../../../../components/shared/PageHeader";

import NotificationTabs from "../components/NotificationTabs";
import NotificationGroup from "../components/NotificationGroup";
import NotificationEmptyState from "../components/NotificationEmptyState";

import { notificationsData } from "../../../../mocks/notifications";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");

  const { tabs, groups } = notificationsData;

  const filteredGroups = useMemo(() => {
    if (activeTab === "All") {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (activeTab === "Unread") {
            return item.unread;
          }

          return item.category
            .toLowerCase()
            .includes(activeTab.toLowerCase());
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [activeTab, groups]);

  const hasNotifications = filteredGroups.length > 0;

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
            {filteredGroups.map((group) => (
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