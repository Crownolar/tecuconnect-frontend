import {
  stakeholderDashboard,
  stakeholderImpact,
  stakeholderReports,
} from "./stakeholder.mock";

import { apiClient } from "../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

export const stakeholderService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return stakeholderDashboard;
    }

    const response = await apiClient.get("/dashboard/stakeholder");

    return response.data.stats;
  },

  async getImpact() {
    if (USE_MOCK_API) {
      return stakeholderImpact;
    }

    const response = await apiClient.get("/dashboard/stakeholder/impact");

    return response.data;
  },

  async getReports() {
    if (USE_MOCK_API) {
      return stakeholderReports;
    }

    const response = await apiClient.get("/reports");

    return response.data;
  },
};
