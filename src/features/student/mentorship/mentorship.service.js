import { apiClient } from "../../../services/api/apiClient";

const unwrapData = (response) => response?.data ?? response;

export const mentorshipService = {
  async getOverview() {
    const response = await apiClient.get("/mentorship/me");
    return unwrapData(response);
  },

  async getMentors(params = {}) {
    const response = await apiClient.get("/mentors", {
      params,
    });

    return {
      data: response?.data ?? [],
      meta: response?.meta ?? null,
    };
  },

  async getMentor(mentorId) {
    const response = await apiClient.get(`/mentors/${mentorId}`);
    return response?.data ?? response;
  },

  async getRequests(params = {}) {
    const response = await apiClient.get("/mentorship/requests", {
      params,
    });

    return {
      data: response?.data ?? [],
      meta: response?.meta ?? null,
    };
  },

  async requestMentorship(payload) {
    console.log("REQUEST MENTORSHIP PAYLOAD:", payload);

    try {
      const response = await apiClient.post("/mentorship/requests", payload);

      return unwrapData(response);
    } catch (error) {
      console.error("REQUEST MENTORSHIP ERROR:", {
        payload,
        status: error.status,
        data: error.data,
        message: error.message,
      });

      throw error;
    }
  },

  async getSessions(params = {}) {
    const response = await apiClient.get("/mentorship/sessions", {
      params,
    });

    return {
      data: response?.data ?? [],
      meta: response?.meta ?? null,
    };
  },

  async updateSession(sessionId, payload) {
    const response = await apiClient.patch(
      `/mentorship/sessions/${sessionId}`,
      payload,
    );

    return unwrapData(response);
  },
};
