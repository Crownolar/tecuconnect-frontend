import {
  adminDashboard,
  adminUsers,
  adminStudents,
  adminCatalog,
  maturityOverrides,
  auditLogs,
} from "./admin.mock";

import { apiClient } from "../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const adminService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return adminDashboard;
    }

    return apiClient.get("/admin/dashboard");
  },

  async getUsers() {
    if (USE_MOCK_API) {
      return adminUsers;
    }

    return apiClient.get("/admin/users");
  },

  async getStudents() {
    if (USE_MOCK_API) {
      return adminStudents;
    }

    return apiClient.get("/admin/students");
  },

  async getCatalog() {
    if (USE_MOCK_API) {
      return adminCatalog;
    }

    return apiClient.get("/admin/catalog");
  },

  async getMaturityOverrides() {
    if (USE_MOCK_API) {
      return maturityOverrides;
    }

    return apiClient.get("/admin/maturity-overrides");
  },

  async approveMaturityOverride(overrideId) {
    if (USE_MOCK_API) {
      return {
        success: true,
        overrideId,
        status: "Approved",
      };
    }

    return apiClient.patch(`/admin/maturity-overrides/${overrideId}/approve`);
  },

  async getAuditLogs() {
    if (USE_MOCK_API) {
      return auditLogs;
    }

    return apiClient.get("/admin/audit-logs");
  },
};
