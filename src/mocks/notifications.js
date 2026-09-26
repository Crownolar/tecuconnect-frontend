const STORAGE_KEY = "tec_trak_notifications";

const initialNotifications = [];

function getNotificationCategory(type) {
  if (
    type === "MILESTONE_VERIFIED" ||
    type === "CHANGES_REQUESTED"
  ) {
    return "Milestones";
  }

  if (type?.startsWith("MENTORSHIP")) {
    return "Mentorship";
  }

  return "System";
}

export function getNotifications(userId) {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialNotifications),
    );

    return [];
  }

  try {
    const notifications = JSON.parse(stored);

    if (!userId) {
      return notifications;
    }

    return notifications.filter(
      (notification) =>
        notification.userId === userId,
    );
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialNotifications),
    );

    return [];
  }
}

export function saveNotifications(
  notifications,
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notifications),
  );

  return notifications;
}

export function addNotification(
  notification,
) {
  const notifications = getNotifications();

  const newNotification = {
    id:
      notification.id ||
      `notification-${Date.now()}`,

    userId:
      notification.userId ||
      "student-001",

    type:
      notification.type ||
      "SYSTEM",

    category:
      notification.category ||
      getNotificationCategory(
        notification.type,
      ),

    title:
      notification.title ||
      "New notification",

    message:
      notification.message ||
      "",

    read: false,

    createdAt:
      notification.createdAt ||
      new Date().toISOString(),

    metadata:
      notification.metadata || {},
  };

  saveNotifications([
    newNotification,
    ...notifications,
  ]);

  return newNotification;
}

export function markNotificationAsRead(
  notificationId,
) {
  const notifications = getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) =>
        notification.id ===
        notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification,
    );

  saveNotifications(updatedNotifications);

  return updatedNotifications.find(
    (notification) =>
      notification.id ===
      notificationId,
  );
}