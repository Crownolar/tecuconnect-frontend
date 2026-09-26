import { getMilestoneClaims } from "../../mocks/milestoneClaims";

export const mentorStats = [
  { label: "Assigned Students", value: 18, detail: "Across active cohorts" },
  { label: "Pending Reviews", value: 5, detail: "Require your attention" },
  {
    label: "Sessions This Month",
    value: 9,
    detail: "6 completed · 3 upcoming",
  },
  { label: "Students On Track", value: 14, detail: "77.8% of assignments" },
];

export const assignedStudents = [
  {
    id: "student-001",
    name: "Yusuf Abdulrahman",
    programme: "Technology Entrepreneurship",
    level: "Practising",
    progress: 72,
    milestones: "6 / 8",
    lastActivity: "Today",
    status: "on_track",
  },
  {
    id: "student-002",
    name: "Aisha Bello",
    programme: "Technology Entrepreneurship",
    level: "Exploring",
    progress: 48,
    milestones: "4 / 8",
    lastActivity: "Yesterday",
    status: "needs_attention",
  },
  {
    id: "student-003",
    name: "Ibrahim Musa",
    programme: "Technology Entrepreneurship",
    level: "Practising",
    progress: 81,
    milestones: "7 / 8",
    lastActivity: "Sep 20, 2026",
    status: "on_track",
  },
  {
    id: "student-004",
    name: "Fatima Sanni",
    programme: "Technology Entrepreneurship",
    level: "Developing",
    progress: 61,
    milestones: "5 / 8",
    lastActivity: "Sep 19, 2026",
    status: "on_track",
  },
  {
    id: "student-005",
    name: "Daniel Adeyemi",
    programme: "Technology Entrepreneurship",
    level: "Exploring",
    progress: 36,
    milestones: "3 / 8",
    lastActivity: "Sep 17, 2026",
    status: "needs_attention",
  },
];

export function getPendingReviews() {
  return getMilestoneClaims()
    .filter((claim) => claim.status === "PENDING_REVIEW")
    .map((claim) => ({
      ...claim,
      submittedAt: claim.submittedAt,
    }));
}

export const upcomingSessions = [
  {
    id: "session-001",
    title: "Product Validation Check-in",
    student: "Yusuf Abdulrahman",
    date: "Sep 23, 2026",
    time: "10:00 AM",
  },
  {
    id: "session-002",
    title: "Business Model Review",
    student: "Aisha Bello",
    date: "Sep 24, 2026",
    time: "2:00 PM",
  },
  {
    id: "session-003",
    title: "Prototype Feedback",
    student: "Fatima Sanni",
    date: "Sep 25, 2026",
    time: "11:30 AM",
  },
];

export const mentorActivity = [
  { id: 1, text: "Yusuf submitted a milestone for review", time: "25 min ago" },
  { id: 2, text: "Aisha completed a mentorship session", time: "Yesterday" },
  { id: 3, text: "Fatima uploaded new prototype evidence", time: "2 days ago" },
];
