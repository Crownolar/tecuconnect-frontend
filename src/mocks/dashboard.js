export const dashboardData = {
  metrics: [
    {
      id: "maturity",
      label: "Entrepreneurial Maturity",
      value: "Level 4",
      subtitle: "Applied",
      trend: "up",
    },
    {
      id: "tei-score",
      label: "TEIS Score",
      value: "72.4/100",
      subtitle: "+6.2 improvement",
      trend: "up",
    },
    {
      id: "milestones",
      label: "Verified Milestones",
      value: "12",
      subtitle: "3 completed this month",
    },
    {
      id: "skills",
      label: "Skills Progress",
      value: "8",
      subtitle: "Competencies",
    },
  ],

  journey: {
    currentLevel: 4,
    stages: [
      {
        level: 1,
        name: "Exposed",
        status: "completed",
      },
      {
        level: 2,
        name: "Engaged",
        status: "completed",
      },
      {
        level: 3,
        name: "Competent",
        status: "completed",
      },
      {
        level: 4,
        name: "Practising",
        status: "current",
      },
      {
        level: 5,
        name: "Entrepreneurial",
        status: "locked",
      },
    ],
  },

  nextAction: {
    title: "Submit evidence for your completed milestone",
    description:
      "Your Level 4 application needs your project defense confirmation upload.",
    action: "Continue",
  },

  activities: [
    {
      id: 1,
      title: "Milestone Verified — Built Functional Prototype",
      time: "2 days ago",
      status: "success",
    },
    {
      id: 2,
      title: "Mentor Feedback Received",
      time: "5 days ago",
      status: "info",
    },
    {
      id: 3,
      title: "Evidence Submitted",
      time: "1 week ago",
      status: "default",
    },
  ],

  mentorship: {
    title: "Pitch Deck Review Session",
    date: "September 8, 2026",
    time: "5:00 PM",
    mentor: {
      name: "Dr. Amina Oladipo",
      role: "TEC Mentor",
    },
  },
};