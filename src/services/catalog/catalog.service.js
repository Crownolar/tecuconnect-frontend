import { apiClient } from "../api/apiClient";

export const catalogService = {
  async getDepartments() {
    const response = await apiClient.get("/departments");
    return response?.data ?? response;
  },

  async getDepartmentById(id) {
    const response = await apiClient.get(`/departments/${id}`);
    return response?.data ?? response;
  },
};
