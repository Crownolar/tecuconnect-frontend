import { apiClient } from "../../../services/api/apiClient";
import { milestones } from "../../../mocks/milestones";
import {
  getMilestoneClaims,
  addMilestoneClaim,
  resubmitMilestoneClaim,
} from "../../../mocks/milestoneClaims";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export const milestonesService = {
  async getMilestones() {
    if (USE_MOCK_API) {
      return milestones;
    }

    return apiClient.get("/student/milestones");
  },

  async claimMilestone(payload) {
    if (USE_MOCK_API) {
      const claim = {
        id: `claim-${Date.now()}`,

        studentId: "student-001",

        student: "Yusuf Abdulrahman",

        category: payload.category,

        milestone: payload.milestone,

        description: payload.description,

        achievementDate: payload.achievementDate,

        evidence: [],

        status: "PENDING_REVIEW",

        submittedAt: new Date().toISOString().split("T")[0],

        mentorFeedback: null,
      };

      addMilestoneClaim(claim);

      return {
        success: true,
        claimId: claim.id,
        status: claim.status,
        ...claim,
      };
    }

    return apiClient.post("/student/milestones/claim", payload);
  },

  async submitEvidence(claimId, evidence) {
    if (USE_MOCK_API) {
      const claims = getMilestoneClaims();

      const claim = claims.find((item) => item.id === claimId);

      if (!claim) {
        throw new Error("Milestone claim not found.");
      }

      const updatedClaim = {
        ...claim,
        evidence,
        status: "PENDING_REVIEW",
      };

      const updatedClaims = claims.map((item) =>
        item.id === claimId ? updatedClaim : item,
      );

      localStorage.setItem(
        "tec_trak_milestone_claims",
        JSON.stringify(updatedClaims),
      );

      return {
        success: true,
        claimId,
        status: updatedClaim.status,
        evidence,
      };
    }

    const formData = new FormData();

    evidence.forEach((item) => {
      if (item.type === "file" && item.file) {
        formData.append("files", item.file);
      }

      if (item.type === "link" && item.url) {
        formData.append("links", item.url);
      }
    });

    return apiClient.upload(
      `/student/milestone-claims/${claimId}/evidence`,
      formData,
    );
  },

  async saveDraft(payload) {
    if (USE_MOCK_API) {
      return {
        success: true,
        status: "DRAFT",
        ...payload,
      };
    }

    return apiClient.post("/student/milestones/drafts", payload);
  },

  async getMyClaims() {
    if (USE_MOCK_API) {
      return getMilestoneClaims().filter(
        (claim) => claim.studentId === "student-001",
      );
    }

    const response = await apiClient.get("/milestones/me");

    return response?.data ?? response;
  },

  async resubmitClaim(claimId, payload) {
    if (USE_MOCK_API) {
      return resubmitMilestoneClaim(claimId, {
        evidence: payload.evidence || [],
        description: payload.description,
        achievementDate: payload.achievementDate,
      });
    }

    const formData = new FormData();

    if (payload.description) {
      formData.append("description", payload.description);
    }

    if (payload.achievementDate) {
      formData.append("achievementDate", payload.achievementDate);
    }

    (payload.evidence || []).forEach((item) => {
      if (item.type === "file" && item.file) {
        formData.append("files", item.file);
      }

      if (item.type === "link" && item.url) {
        formData.append("links", item.url);
      }
    });

    return apiClient.upload(
      `/student/milestone-claims/${claimId}/resubmit`,
      formData,
    );
  },
};
