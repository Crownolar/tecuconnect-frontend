import { apiClient } from "../../../services/api/apiClient";

const unwrapData = (response) => response?.data ?? response;

export const profileService = {
  async getProfile() {
    const response = await apiClient.get("/students/me");
    return unwrapData(response);
  },

  async updateProfile(payload) {
    const response = await apiClient.patch(
      "/students/me",
      payload,
    );

    return unwrapData(response);
  },
};