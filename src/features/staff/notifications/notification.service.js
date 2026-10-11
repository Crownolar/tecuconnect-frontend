import { apiClient } from "../../../services/api/apiClient";

const unwrapData = (response) => response?.data ?? response;

export const notificationService = {
  async getNotifications(params = {}) {
    const response = await apiClient.get("/notifications", { params });
    return {
      data: Array.isArray(response?.data) ? response.data : [],
      meta: response?.meta ?? null,
      unread: Number(response?.unread ?? 0),
    };
  },

  async getUnreadCount() {
    const response = await apiClient.get("/notifications/unread-count");
    const data = unwrapData(response);
    return { unread: Number(data?.unread ?? 0) };
  },

  async markAsRead(notificationId) {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`,
    );
    return unwrapData(response);
  },

  async markAllAsRead() {
    const response = await apiClient.patch("/notifications/read-all");
    return unwrapData(response);
  },
};
