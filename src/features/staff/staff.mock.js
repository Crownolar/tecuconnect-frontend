export const staffDashboard = {
  totalStudents: 1248,
  activeStudents: 1092,
  pendingFlags: 18,
  pendingMilestones: 37,
  attendanceRate: 86,
};

export const staffStudents = [
  {
    id: "STU001",
    name: "Aisha Bello",
    matricNumber: "20/12345",
    department: "Business Administration",
    level: "400",
    progress: 78,
    attendance: 92,
    status: "Active",
  },
  {
    id: "STU002",
    name: "Daniel Adeyemi",
    matricNumber: "20/12784",
    department: "Computer Science",
    level: "400",
    progress: 64,
    attendance: 74,
    status: "At Risk",
  },
  {
    id: "STU003",
    name: "Mary Ibrahim",
    matricNumber: "21/10392",
    department: "Accounting",
    level: "300",
    progress: 86,
    attendance: 95,
    status: "Active",
  },
  {
    id: "STU004",
    name: "Samuel Okafor",
    matricNumber: "21/11482",
    department: "Economics",
    level: "300",
    progress: 51,
    attendance: 68,
    status: "At Risk",
  },
];

export const staffFlags = [
  {
    id: "FLAG001",
    student: "Daniel Adeyemi",
    type: "Low Attendance",
    severity: "High",
    createdAt: "2026-09-21",
    status: "Open",
  },
  {
    id: "FLAG002",
    student: "Samuel Okafor",
    type: "Low Progress",
    severity: "Medium",
    createdAt: "2026-09-20",
    status: "Open",
  },
  {
    id: "FLAG003",
    student: "Mary Ibrahim",
    type: "Missing Evidence",
    severity: "Low",
    createdAt: "2026-09-19",
    status: "Resolved",
  },
];

export const staffAttendance = [
  {
    student: "Aisha Bello",
    attendance: 92,
    sessions: 23,
    attended: 21,
  },
  {
    student: "Daniel Adeyemi",
    attendance: 74,
    sessions: 23,
    attended: 17,
  },
  {
    student: "Mary Ibrahim",
    attendance: 95,
    sessions: 20,
    attended: 19,
  },
  {
    student: "Samuel Okafor",
    attendance: 68,
    sessions: 22,
    attended: 15,
  },
];
