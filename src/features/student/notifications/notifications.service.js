import {
  getNotifications,
  addNotification,
  markNotificationAsRead,
} from "../../../mocks/notifications";

import { apiClient } from "../../../services/api/apiClient";

const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== "false";

export const notificationsService = {
  async getNotifications() {
    if (USE_MOCK_API) {
      return getNotifications("student-001");
    }

    return apiClient.get("/student/notifications");
  },

  async markAsRead(notificationId) {
    if (USE_MOCK_API) {
      return markNotificationAsRead(notificationId);
    }

    return apiClient.patch(
      `/student/notifications/${notificationId}/read`,
    );
  },

  async createNotification(payload) {
    if (USE_MOCK_API) {
      return addNotification(payload);
    }

    return apiClient.post(
      "/notifications",
      payload,
    );
  },
};