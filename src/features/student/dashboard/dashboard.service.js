import { apiClient } from "../../../services/api/apiClient";
import { dashboardData as mockDashboardData } from "../../../mocks/dashboard";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const studentDashboardService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return mockDashboardData;
    }

    const response = await apiClient.get("/students/me/dashboard");

    return response?.data ?? response;
  },
};