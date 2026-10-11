import { apiClient } from "../../../services/api/apiClient";

const unwrapData = (response) => response?.data ?? response;

const normalizeAssessment = (assessment) => ({
  ...assessment,
  score: Number(assessment?.score ?? 0),
  skillName: assessment?.skill?.name || assessment?.skillId || "Unknown skill",
  competencyName:
    assessment?.skillCompetency?.name ||
    assessment?.skillCompetencyId ||
    "Overall skill",
});

export const assessmentService = {
  async getAssessments(params = {}) {
    const response = await apiClient.get("/assessments", {
      params: {
        page: 1,
        limit: 100,
        ...params,
      },
    });

    const data = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    return {
      data: data.map(normalizeAssessment),
      meta: response?.meta ?? null,
    };
  },

  async createAssessment(payload) {
    const response = await apiClient.post("/assessments", payload);
    return normalizeAssessment(unwrapData(response));
  },
};
