import { apiClient } from "../../../services/api/apiClient";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const unwrapData = (response) => response?.data ?? response;

const formatName = (person) => {
  if (!person) return "Unknown student";
  if (typeof person === "string") return person;

  // Mentor endpoints return the student profile with the linked user nested
  // under `student.user`. Prefer that canonical identity over the profile
  // `name` field, which may be a placeholder such as "Unknown student".
  const linkedUser = person.user;
  const linkedUserName = [
    linkedUser?.firstName,
    linkedUser?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (linkedUserName) return linkedUserName;

  const directName =
    typeof person.name === "string" ? person.name.trim() : "";
  if (directName && directName.toLowerCase() !== "unknown student") {
    return directName;
  }

  const directUserName = [person.firstName, person.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return directUserName || person.email || "Unknown student";
};

const normalizeRequest = (request) => ({
  ...request,
  student: request?.student
    ? {
        ...request.student,
        name: formatName(request.student),
      }
    : null,
  studentName: formatName(request?.student),
  preferredDate: request?.preferredDate || null,
  status: request?.status || "PENDING",
});

const normalizeSession = (session) => ({
  ...session,
  studentName: formatName(session?.student),
  dateTime: session?.sessionDate || session?.scheduledFor || null,
});

const mockRequests = [];
const mockSessions = [];

export const mentorshipService = {

  async getRequests(params = {}) {
    if (USE_MOCK_API) {
      return mockRequests.filter((item) => {
        if (!params.status) return true;
        return item.status === params.status;
      });
    }

    const response = await apiClient.get("/mentorship/requests", {
      params,
    });

    const data = unwrapData(response);
    const requests = Array.isArray(data) ? data : [];

    return requests.map(normalizeRequest);
  },

  async updateRequest(requestId, payload) {
    if (USE_MOCK_API) {
      const index = mockRequests.findIndex((item) => item.id === requestId);
      if (index === -1) throw new Error("Mentorship request not found.");

      mockRequests[index] = {
        ...mockRequests[index],
        ...payload,
      };

      return mockRequests[index];
    }

    const response = await apiClient.patch(
      `/mentorship/requests/${requestId}`,
      payload,
    );

    return unwrapData(response);
  },

  async getSessions(params = {}) {
    if (USE_MOCK_API) return mockSessions;

    const response = await apiClient.get("/mentorship/sessions", {
      params,
    });

    const data = unwrapData(response);
    const sessions = Array.isArray(data) ? data : [];

    return sessions.map(normalizeSession);
  },

  async createSession(payload) {
    const response = await apiClient.post(
      "/mentorship/sessions",
      payload,
    );

    return unwrapData(response);
  },

  async updateSession(sessionId, payload) {
    const response = await apiClient.patch(
      `/mentorship/sessions/${sessionId}`,
      payload,
    );

    return unwrapData(response);
  },
};
