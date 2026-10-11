import { apiClient } from "../../../services/api/apiClient";

const unwrap = (response) => response?.data ?? response ?? null;

export const StaffProfileService = {
  async getProfile() {
    const response = await apiClient.get("/auth/me");
    return unwrap(response);
  },

  async getAssignedStudents() {
    const response = await apiClient.get("/staff/me/students");
    const data = unwrap(response);
    return Array.isArray(data) ? data : [];
  },

  async getPendingReviews() {
    const response = await apiClient.get("/milestones", {
      params: { status: "PENDING", page: 1, limit: 100 },
    });
    const data = response?.data ?? [];
    return {
      items: Array.isArray(data) ? data : [],
      meta: response?.meta ?? null,
    };
  },

  async getSessions() {
    const response = await apiClient.get("/mentorship/sessions");
    const data = unwrap(response);
    return Array.isArray(data) ? data : [];
  },

  async getAssessments() {
    const response = await apiClient.get("/assessments", {
      params: { page: 1, limit: 100 },
    });
    const data = response?.data ?? [];
    return {
      items: Array.isArray(data) ? data : [],
      meta: response?.meta ?? null,
    };
  },
};
