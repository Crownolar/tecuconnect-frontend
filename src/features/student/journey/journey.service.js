import { apiClient } from "../../../services/api/apiClient";

export const journeyService = {
  async getJourney() {
    const response = await apiClient.get("/students/me/journey");

    return response?.data ?? response;
  },
};