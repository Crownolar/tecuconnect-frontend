import { apiClient } from "../../../services/api/apiClient";

export const notificationsService = {
  async getNotifications(params = {}) {
    const response = await apiClient.get("/notifications", {
      params,
    });

    return {
      data: response?.data ?? [],
      meta: response?.meta ?? null,
      unread: response?.unread ?? 0,
    };
  },

  async getUnreadCount() {
    const response = await apiClient.get("/notifications/unread-count");

    return response?.data ?? { unread: 0 };
  },

  async markAsRead(notificationId) {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`,
    );

    return response?.data ?? null;
  },

  async markAllAsRead() {
    const response = await apiClient.patch("/notifications/read-all");

    return response?.data ?? null;
  },
};
