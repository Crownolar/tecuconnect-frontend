import {
  getStudentProgress,
  updateStudentProgress,
} from "../../../mocks/studentProgress";

import { apiClient } from "../../../services/api/apiClient";

const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== "false";

export const progressService = {
  async getProgress() {
    if (USE_MOCK_API) {
      return getStudentProgress();
    }

    return apiClient.get("/student/progress");
  },

  async evaluateAfterMilestoneVerification(claimId) {
    if (USE_MOCK_API) {
      const current = getStudentProgress();

      /*
       * This mock represents the backend/system event.
       *
       * We intentionally do NOT calculate maturity or TEIS
       * here because those rules belong to the backend.
       */
      const result = {
        claimId,

        event: "MILESTONE_VERIFIED",

        maturity: {
          previousLevel: current.maturity.currentLevel,
          currentLevel: current.maturity.currentLevel,
          changed: false,
        },

        teis: {
          previousScore: current.teis.score,
          currentScore: current.teis.score,
          changed: false,
        },

        maturityEvaluated: true,
        teisRecalculated: true,

        evaluatedAt: new Date().toISOString(),
      };

      updateStudentProgress({
        maturity: {
          previousLevel: result.maturity.previousLevel,
          currentLevel: result.maturity.currentLevel,
          changed: result.maturity.changed,
          lastEvaluatedAt: result.evaluatedAt,
        },

        teis: {
          previousScore: result.teis.previousScore,
          score: result.teis.currentScore,
          changed: result.teis.changed,
          lastRecalculatedAt: result.evaluatedAt,
        },

        lastSystemEvent: result,
      });

      return result;
    }

    return apiClient.post(
      `/student/milestone-claims/${claimId}/evaluate`,
    );
  },
};