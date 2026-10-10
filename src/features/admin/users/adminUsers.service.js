import { apiClient } from "../../../services/api/apiClient";

export const adminUsersService = {
  async registerStudent(payload) {
    return apiClient.post("/auth/register/student", payload);
  },

  async sendInvite(payload) {
    return apiClient.post("/auth/invite", payload);
  },
};
