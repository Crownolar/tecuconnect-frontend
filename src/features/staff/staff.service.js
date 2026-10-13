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

    return apiClient.get("/dashboard/staff");
  },

  async getStudents() {
    if (USE_MOCK_API) {
      return staffStudents;
    }

    return apiClient.get("/students");
  },

  async getFlags() {
    if (USE_MOCK_API) {
      return staffFlags;
    }

    return apiClient.get("/flags");
  },

  async getAttendance() {
    if (USE_MOCK_API) {
      return staffAttendance;
    }

    return apiClient.get("/attendance/summary");
  },
  async getMilestones() {
    // Staff listing uses the collection endpoint; /milestones/me is Student-only.
    if (USE_MOCK_API) {
      return [];
    }

    return apiClient.get("/milestones");
  },

  async reviewMilestone({ id, action, feedback }) {
    if (!["VERIFY", "REJECT", "FLAG"].includes(action)) {
      throw new Error("Unsupported milestone review action.");
    }
    const body = { action };
    if (feedback) body.feedback = feedback;
    return apiClient.patch(`/milestones/${encodeURIComponent(id)}/verify`, body);
  },

  async resolveMilestone({ id, action, feedback }) {
    if (!["VERIFY", "REJECT"].includes(action)) {
      throw new Error("Unsupported milestone resolution action.");
    }
    const body = { action };
    if (feedback) body.feedback = feedback;
    return apiClient.patch(`/milestones/${encodeURIComponent(id)}/resolve`, body);
  },

  async getReports() {
    // if (USE_MOCK_API) {
    //   return staffAttendance;
    // }

    return apiClient.get("/reports");
  },
  async getNotifications() {
    // if (USE_MOCK_API) {
    //   return staffAttendance;
    // }

    return apiClient.get("/notifications");
  },
  async getProfile() {
    // if (USE_MOCK_API) {
    //   return staffAttendance;
    // }

    return apiClient.get("/dashboard/me");
  },

  async resolveFlag(flagId) {
    if (USE_MOCK_API) {
      return {
        success: true,
        flagId,
        status: "Resolved",
      };
    }

    return apiClient.patch(`/flags/${flagId}/resolve`);
  },
};
