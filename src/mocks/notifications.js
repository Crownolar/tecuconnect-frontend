export const notificationsData = {
  tabs: [
    "All",
    "Unread",
    "Mentorship",
    "Milestones",
  ],

  groups: [
    {
      label: "Today",
      items: [
        {
          id: "notification-001",
          tone: "success",
          category: "Innovation & product",
          title: "Milestone Approved: Built Functional Prototype",
          text: "Your milestone has been verified and approved by the review committee.",
          time: "2 hours ago",
          unread: true,
        },
        {
          id: "notification-002",
          tone: "info",
          category: "Mentorship",
          title: "Upcoming Session Reminder",
          text: "Pitch Deck Review Session with Dr. Amina Oladipo starts tomorrow at 2:00 PM.",
          time: "4 hours ago",
          unread: true,
        },
        {
          id: "notification-003",
          tone: "info",
          category: "Mentorship recommendation",
          title: "New Mentor Recommendation",
          text: "Based on your progress, we recommend connecting with Prof. Emeka Nwakwuh for Technology guidance.",
          time: "6 hours ago",
          unread: true,
        },
      ],
    },

    {
      label: "Earlier this week",
      items: [
        {
          id: "notification-004",
          tone: "success",
          category: "Milestones",
          title: "Evidence Submission Feedback",
          text: "Your evidence for Business Model Canvas milestone needs minor revisions. Check the details.",
          time: "Sep 2, 2026",
        },
        {
          id: "notification-005",
          tone: "muted",
          category: "System update",
          title: "Level Up: Practicing Stage",
          text: "Congratulations! You have advanced to Level 4 — Practicing in your entrepreneurial journey.",
          time: "Sep 1, 2026",
        },
      ],
    },

    {
      label: "Earlier",
      items: [
        {
          id: "notification-006",
          tone: "info",
          category: "Mentorship",
          title: "Session Completed",
          text: "Your Business Model Review session with Dr. Amina Oladipo has been marked as completed.",
          time: "Aug 25, 2026",
        },
        {
          id: "notification-007",
          tone: "success",
          category: "Milestones",
          title: "New Milestone Available",
          text: "A new milestone is ready for submission in your journey board.",
          time: "Aug 20, 2026",
        },
      ],
    },
  ],
};