import {
  mentorStats,
  assignedStudents,
  upcomingSessions,
  mentorActivity,
  getPendingReviews,
} from "./mentor.mock";

import { updateMilestoneClaim } from "../../mocks/milestoneClaims";

import { apiClient } from "../../services/api/apiClient";

import { handleMilestoneReviewed } from "../../mocks/systemEvents";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const mentorService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return {
        stats: mentorStats,
        upcomingSessions,
        activity: mentorActivity,
      };
    }

    return apiClient.get("/mentor/dashboard");
  },

  async getStudents() {
    if (USE_MOCK_API) {
      return assignedStudents;
    }

    return apiClient.get("/mentor/students");
  },

  async getPendingReviews() {
    if (USE_MOCK_API) {
      return getPendingReviews();
    }

    return apiClient.get("/mentor/milestone-reviews");
  },

  async reviewMilestone(
  claimId,
  payload,
) {
  if (USE_MOCK_API) {
    const updatedClaim =
      updateMilestoneClaim(
        claimId,
        {
          status: payload.status,
          mentorFeedback:
            payload.feedback || null,
          reviewedAt:
            new Date().toISOString(),
        },
      );

    if (!updatedClaim) {
      throw new Error(
        "Milestone claim not found.",
      );
    }

    const notification =
      handleMilestoneReviewed(
        updatedClaim,
      );

    return {
      claim: updatedClaim,
      notification,
    };
  }

  return apiClient.patch(
    `/mentor/milestone-reviews/${claimId}`,
    payload,
  );
}
};
