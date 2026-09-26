import {
  stakeholderDashboard,
  stakeholderImpact,
  stakeholderReports,
} from "./stakeholder.mock";

import { apiClient } from "../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const stakeholderService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return stakeholderDashboard;
    }

    return apiClient.get("/stakeholder/dashboard");
  },

  async getImpact() {
    if (USE_MOCK_API) {
      return stakeholderImpact;
    }

    return apiClient.get("/stakeholder/impact");
  },

  async getReports() {
    if (USE_MOCK_API) {
      return stakeholderReports;
    }

    return apiClient.get("/stakeholder/reports");
  },
};
