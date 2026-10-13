export const stakeholderDashboard = {
  students: 11,
  activeStudents: 11,
  completionRate: 72.7,
  attendanceRate: 80,
  verifiedMilestones: 28,
  mentors: 5,
  departments: 47,
  venturesSupported: 5,
};

export const stakeholderImpact = {
  funnel: {
    enrolled: 11,
    active: 11,
    attended80: 8,
    certifiedCompetence: 8,
    appliedCommercially: 5,
    generatedIncome: 3,
    sustainableEnterprises: 0,
    createdEmployment: 0,
    spinoffs: 0,
    jobsCreated: 10,
  },
  participation: {
    completionRate: 72.7,
    attendanceRate: 80,
    mentorshipEngagement: 21,
    ventures: {
      supported: 5,
      validated: 2,
      launched: 5,
    },
  },
  departments: [
    { id: "mock-business-admin", name: "Business Administration", faculty: "Management Sciences", students: 1 },
    { id: "mock-computer-engineering", name: "Computer Engineering", faculty: "Engineering & Technology", students: 1 },
    { id: "mock-computer-science", name: "Computer Science", faculty: "Science", students: 2 },
    { id: "mock-economics", name: "Economics", faculty: "Social Sciences", students: 1 },
    { id: "mock-mass-communication", name: "Mass Communication", faculty: "Communication & Information Sciences", students: 1 },
  ],
};

export const stakeholderReports = [
  {
    id: "RPT001",
    title: "Programme Progress Report",
    description:
      "Summary of student participation, milestone progress and programme completion.",
    period: "2026 Academic Session",
    type: "Progress",
  },
  {
    id: "RPT002",
    title: "Mentorship Impact Report",
    description:
      "Overview of mentorship participation and engagement across the programme.",
    period: "2026 Academic Session",
    type: "Mentorship",
  },
  {
    id: "RPT003",
    title: "Entrepreneurship Impact Report",
    description:
      "Summary of venture development and entrepreneurship programme outcomes.",
    period: "2026 Academic Session",
    type: "Impact",
  },
];
