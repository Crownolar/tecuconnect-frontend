import {
  mentorStats,
  assignedStudents,
  upcomingSessions,
  mentorActivity,
  getPendingReviews as getMockPendingReviews,
} from "./mentor.mock";

import { updateMilestoneClaim } from "../../mocks/milestoneClaims";
import { apiClient } from "../../services/api/apiClient";
import { handleMilestoneReviewed } from "../../mocks/systemEvents";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const unwrapData = (response) => response?.data ?? response;

const humanizeLabel = (value) =>
  String(value ?? "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
};

const formatTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const normalizeStats = (stats) => {
  if (Array.isArray(stats)) return stats;
  if (!stats || typeof stats !== "object") return [];

  return Object.entries(stats)
    .filter(([, value]) => ["string", "number"].includes(typeof value))
    .map(([key, value]) => ({
      label: humanizeLabel(key),
      value,
      detail: "",
    }));
};

const normalizeUpcomingSession = (session) => ({
  ...session,
  student: formatStudentName(session?.student),
  date: formatDate(session?.sessionDate || session?.scheduledFor),
  time: formatTime(session?.sessionDate || session?.scheduledFor),
});

const normalizeActivity = (item) => ({
  ...item,
  text: item?.message || item?.title || "Activity update",
  time: formatDate(item?.createdAt),
});

const normalizeAssignedStudent = (student) => ({
  ...student,

  name: student?.name || formatAssignedStudentName(student),

  programme:
    student?.programme ||
    student?.degreeProgramme ||
    student?.department ||
    "—",

  level: student?.currentMaturityLabel || student?.level || "—",

  progress: Number(student?.progressPct ?? student?.progress ?? 0),

  milestones: `${student?.milestonesVerified ?? 0} / ${
    student?.milestoneTarget ?? 0
  }`,

  lastActivity: formatDate(student?.lastActivity),

  status: student?.status || "—",
});

const formatStudentName = (student) => {
  if (!student) return "Unknown student";

  if (typeof student === "string") {
    return student.trim() || "Unknown student";
  }

  // Backend milestone response:
  // student.user.firstName / student.user.lastName
  const userName = [student?.user?.firstName, student?.user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (userName) return userName;

  // Direct student fields
  const directName = [student?.firstName, student?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (directName) return directName;

  if (typeof student?.name === "string" && student.name.trim()) {
    return student.name.trim();
  }

  if (typeof student?.fullName === "string" && student.fullName.trim()) {
    return student.fullName.trim();
  }

  return student?.email || "Unknown student";
};

const normalizeReview = (milestone) => {
  const evidence = Array.isArray(milestone?.evidence) ? milestone.evidence : [];

  return {
    ...milestone,

    // Keep backend fields.
    id: milestone.id,
    title: milestone.title,
    type: milestone.type,
    category: milestone.category,
    description: milestone.description,
    status: milestone.status,
    occurredAt: milestone.occurredAt,
    claimedAt: milestone.claimedAt,
    studentId: milestone.studentId,

    // Fields currently consumed by the mentor UI.
    student: formatStudentName(
      milestone.student || milestone.studentProfile || milestone.user,
    ),

    milestone: milestone.title,

    submittedAt: milestone.claimedAt
      ? new Date(milestone.claimedAt).toLocaleDateString()
      : "—",

    evidence: evidence.map((item) => ({
      ...item,
      type: item.fileType === "link" ? "link" : item.type || "link",
      name: item.name || item.fileUrl || "Evidence",
      url: item.url || item.fileUrl,
      description: item.description || "",
    })),
  };
};

const formatAssignedStudentName = (student) => {
  if (!student) return "Unknown student";

  const userName = [student?.user?.firstName, student?.user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (userName) return userName;

  const directName = [student?.firstName, student?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (directName) return directName;

  if (
    typeof student?.name === "string" &&
    student.name.trim().toLowerCase() !== "unknown student"
  ) {
    return student.name.trim();
  }

  return student?.email || "Unknown student";
};

export const mentorService = {
  async getDashboard() {
    if (USE_MOCK_API) {
      return {
        stats: mentorStats,
        upcomingSessions,
        activity: mentorActivity,
      };
    }

    const response = await apiClient.get("/mentors/me/dashboard");
    const data = unwrapData(response) || {};

    return {
      ...data,
      stats: normalizeStats(data.stats),
      pendingReviews: Array.isArray(data.pendingReviewsLists)
        ? data.pendingReviewsLists.map(normalizeReview)
        : [],
      upcomingSessions: Array.isArray(data.upcomingSessions)
        ? data.upcomingSessions.map(normalizeUpcomingSession)
        : [],
      activity: Array.isArray(data.recentActivity)
        ? data.recentActivity.map(normalizeActivity)
        : [],
    };
  },

  async getStudents() {
    if (USE_MOCK_API) {
      return assignedStudents;
    }

    const response = await apiClient.get("/mentors/me/students");

    console.log("[MENTOR] /mentors/me/students", response);

    const data = unwrapData(response);
    const students = Array.isArray(data) ? data : [];

    return students.map(normalizeAssignedStudent);
  },

  async getPendingReviews() {
    if (USE_MOCK_API) {
      return getMockPendingReviews();
    }

    const response = await apiClient.get("/milestones?status=PENDING");

    console.log("[MENTOR] /milestones?status=PENDING", response);

    const milestones = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    return milestones.map(normalizeReview);
  },

  async getMilestone(milestoneId) {
    if (USE_MOCK_API) {
      const reviews = getMockPendingReviews();

      const review = reviews.find((item) => item.id === milestoneId);

      if (!review) {
        throw new Error("Milestone not found.");
      }

      return review;
    }

    const response = await apiClient.get(`/milestones/${milestoneId}`);

    return normalizeReview(unwrapData(response));
  },

  async reviewMilestone(milestoneId, payload) {
    if (USE_MOCK_API) {
      const updatedClaim = updateMilestoneClaim(milestoneId, {
        status:
          payload.action === "VERIFY"
            ? "VERIFIED"
            : payload.action === "REJECT"
              ? "REJECTED"
              : "FLAGGED_FOR_REVIEW",

        mentorFeedback: payload.note || null,

        reviewedAt: new Date().toISOString(),
      });

      if (!updatedClaim) {
        throw new Error("Milestone claim not found.");
      }

      const notification = handleMilestoneReviewed(updatedClaim);

      return {
        claim: updatedClaim,
        notification,
      };
    }

    const actionMap = {
      VERIFY: "VERIFY",
      REJECT: "REJECT",
      FLAG_FOR_STAFF_REVIEW: "FLAG",
      FLAG: "FLAG",
    };
    const apiAction = actionMap[payload.action] || payload.action;

    const response = await apiClient.patch(
      `/milestones/${milestoneId}/verify`,
      {
        action: apiAction,
        note: payload.note || "",
      },
    );

    return unwrapData(response);
  },
};
