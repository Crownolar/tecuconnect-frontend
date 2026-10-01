import { apiClient } from "../../../services/api/apiClient";

export const adminUsersService = {
  async registerStudent(payload) {
    return apiClient.post("/auth/register/student", payload);
  },
};