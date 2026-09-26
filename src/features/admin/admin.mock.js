export const adminDashboard = {
  totalUsers: 1386,
  totalStudents: 1248,
  totalMentors: 86,
  activeStaff: 42,
  pendingOverrides: 7,
  auditEvents: 184,
};

export const adminUsers = [
  {
    id: "USR001",
    name: "Aisha Bello",
    email: "aisha.bello@unilorin.edu.ng",
    role: "STUDENT",
    status: "Active",
    lastLogin: "2026-09-21",
  },
  {
    id: "USR002",
    name: "Dr. Ibrahim Musa",
    email: "ibrahim.musa@unilorin.edu.ng",
    role: "MENTOR",
    status: "Active",
    lastLogin: "2026-09-21",
  },
  {
    id: "USR003",
    name: "Mary Adewale",
    email: "mary.adewale@unilorin.edu.ng",
    role: "STAFF",
    status: "Active",
    lastLogin: "2026-09-20",
  },
  {
    id: "USR004",
    name: "Daniel Okoro",
    email: "daniel.okoro@unilorin.edu.ng",
    role: "STUDENT",
    status: "Suspended",
    lastLogin: "2026-09-17",
  },
];

export const adminStudents = [
  {
    id: "STU001",
    name: "Aisha Bello",
    matricNumber: "20/12345",
    department: "Business Administration",
    level: "400",
    maturityLevel: "Growth",
    progress: 78,
    status: "Active",
  },
  {
    id: "STU002",
    name: "Daniel Adeyemi",
    matricNumber: "20/12784",
    department: "Computer Science",
    level: "400",
    maturityLevel: "Validation",
    progress: 64,
    status: "At Risk",
  },
  {
    id: "STU003",
    name: "Mary Ibrahim",
    matricNumber: "21/10392",
    department: "Accounting",
    level: "300",
    maturityLevel: "Growth",
    progress: 86,
    status: "Active",
  },
];

export const adminCatalog = {
  departments: [
    "Business Administration",
    "Computer Science",
    "Accounting",
    "Economics",
    "Engineering",
  ],
  skills: [
    "Ideation",
    "Problem Validation",
    "Business Modeling",
    "Market Research",
    "Financial Literacy",
    "Pitching",
    "Leadership",
  ],
};

export const maturityOverrides = [
  {
    id: "OVR001",
    student: "Daniel Adeyemi",
    previousLevel: "Discovery",
    requestedLevel: "Validation",
    reason: "Verified external programme evidence",
    requestedBy: "Staff",
    status: "Pending",
    createdAt: "2026-09-21",
  },
  {
    id: "OVR002",
    student: "Aisha Bello",
    previousLevel: "Validation",
    requestedLevel: "Growth",
    reason: "Additional verified milestone evidence",
    requestedBy: "Mentor",
    status: "Pending",
    createdAt: "2026-09-20",
  },
];

export const auditLogs = [
  {
    id: "AUD001",
    actor: "Mary Adewale",
    action: "FLAG_RESOLVED",
    target: "Daniel Adeyemi",
    timestamp: "2026-09-21 14:32",
  },
  {
    id: "AUD002",
    actor: "Dr. Ibrahim Musa",
    action: "MILESTONE_VERIFIED",
    target: "Aisha Bello",
    timestamp: "2026-09-21 12:18",
  },
  {
    id: "AUD003",
    actor: "Admin",
    action: "MATURITY_OVERRIDE_REQUESTED",
    target: "Daniel Adeyemi",
    timestamp: "2026-09-21 10:05",
  },
];