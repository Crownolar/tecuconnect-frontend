import {
  staffDashboard,
  staffStudents,
  staffFlags,
  staffAttendance,
} from "./staff.mock";

import { apiClient } from "../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const staffService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return staffDashboard;
    }

    return apiClient.get("/staff/dashboard");
  },

  async getStudents() {
    if (USE_MOCK_API) {
      return staffStudents;
    }

    return apiClient.get("/staff/students");
  },

  async getFlags() {
    if (USE_MOCK_API) {
      return staffFlags;
    }

    return apiClient.get("/staff/flags");
  },

  async getAttendance() {
    if (USE_MOCK_API) {
      return staffAttendance;
    }

    return apiClient.get("/staff/attendance");
  },

  async resolveFlag(flagId) {
    if (USE_MOCK_API) {
      return {
        success: true,
        flagId,
        status: "Resolved",
      };
    }

    return apiClient.patch(`/staff/flags/${flagId}/resolve`);
  },
};
