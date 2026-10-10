import { apiClient } from "../../../services/api/apiClient";
import { milestones } from "../../../mocks/milestones";
import {
  getMilestoneClaims,
  addMilestoneClaim,
  resubmitMilestoneClaim,
} from "../../../mocks/milestoneClaims";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const unwrapData = (response) => response?.data ?? response;

const normalizePaginated = (response) => ({
  data: Array.isArray(response?.data) ? response.data : [],
  meta: response?.meta ?? null,
});

export const milestonesService = {
  async getMilestones(params = {}) {
    if (USE_MOCK_API) return milestones;

    return normalizePaginated(
      await apiClient.get("/milestones/me", { params }),
    );
  },

  async getCategories() {
    if (USE_MOCK_API) {
      return { categories: [], mapping: {} };
    }

    return unwrapData(await apiClient.get("/milestones/categories"));
  },

  async claimMilestone(payload) {
    if (USE_MOCK_API) {
      const claim = {
        id: `claim-${Date.now()}`,
        studentId: "student-001",
        student: "Yusuf Abdulrahman",
        type: payload.type,
        title: payload.title,
        category: payload.category,
        description: payload.description,
        occurredAt: payload.occurredAt,
        evidence: [],
        status: "PENDING",
        submittedAt: new Date().toISOString(),
        mentorFeedback: null,
      };

      addMilestoneClaim(claim);

      return { ...claim, claimId: claim.id };
    }

    const data = unwrapData(await apiClient.post("/milestones", payload));

    return {
      ...data,
      claimId: data?.id,
    };
  },

  async getMyClaims(params = {}) {
    if (USE_MOCK_API) {
      return getMilestoneClaims().filter(
        (claim) => claim.studentId === "student-001",
      );
    }

    return normalizePaginated(
      await apiClient.get("/milestones/me", { params }),
    );
  },

  async getMilestoneById(milestoneId) {
    if (USE_MOCK_API) {
      const claim = getMilestoneClaims().find(
        (item) => item.id === milestoneId,
      );

      if (!claim) throw new Error("Milestone not found.");
      return claim;
    }

    return unwrapData(await apiClient.get(`/milestones/${milestoneId}`));
  },

  async submitEvidence(milestoneId, evidence) {
    if (USE_MOCK_API) {
      const claims = getMilestoneClaims();
      const claim = claims.find((item) => item.id === milestoneId);

      if (!claim) throw new Error("Milestone claim not found.");

      const updatedClaim = {
        ...claim,
        evidence: [...(claim.evidence || []), evidence],
        status: "PENDING",
      };

      localStorage.setItem(
        "tec_trak_milestone_claims",
        JSON.stringify(
          claims.map((item) =>
            item.id === milestoneId ? updatedClaim : item,
          ),
        ),
      );

      return evidence;
    }

    if (!evidence?.fileUrl) {
      throw new Error("Evidence must contain a file URL.");
    }

    return unwrapData(
      await apiClient.post(`/milestones/${milestoneId}/evidence`, {
        fileUrl: evidence.fileUrl,
        fileType: evidence.fileType || "link",
        description: evidence.description || "",
      }),
    );
  },

  async saveDraft(payload) {
    if (USE_MOCK_API) {
      return { success: true, status: "DRAFT", ...payload };
    }

    throw new Error(
      "Milestone drafts are not supported by the documented API.",
    );
  },

  async resubmitClaim(claimId, payload) {
    if (USE_MOCK_API) {
      return resubmitMilestoneClaim(claimId, {
        evidence: payload.evidence || [],
        description: payload.description,
        achievementDate: payload.achievementDate,
      });
    }

    const current = await this.getMilestoneById(claimId);
    if (current?.status !== "REJECTED") {
      throw new Error(
        "This milestone is no longer awaiting changes. Refresh the page before submitting evidence.",
      );
    }

    const evidence = Array.isArray(payload.evidence) ? payload.evidence : [];
    const latestEvidence = evidence[evidence.length - 1];
    if (!latestEvidence?.fileUrl) {
      throw new Error("Add one valid evidence link before continuing.");
    }

    // The current API only documents POST /milestones/:id/evidence. It adds
    // evidence but does not document replacing prior evidence or resetting
    // REJECTED -> PENDING. Return the server's actual state so the UI never
    // falsely reports that the milestone has returned to review.
    await this.submitEvidence(claimId, latestEvidence);
    const refreshed = await this.getMilestoneById(claimId);

    return {
      milestone: refreshed,
      evidenceSubmitted: true,
      awaitingMentorReview: refreshed?.status === "PENDING",
      backendStatus: refreshed?.status,
    };
  },
};
