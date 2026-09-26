import {
  Activity,
  BarChart3,
  BadgeCheck,
  Bell,
  CalendarCheck,
  ClipboardCheck,
  FileBarChart,
  Flag,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

export const ROLE_LABELS = {
  STUDENT: "Student",
  MENTOR: "Mentor",
  STAFF: "Staff",
  ADMIN: "Admin",
  STAKEHOLDER: "Stakeholder",
};

export const PORTAL_CONFIG = {
  STUDENT: {
    basePath: "/student",
    label: "Student Portal",
    subtitle: "TEC Fellow",
    navigation: [
      { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
      { label: "My Journey", path: "/student/journey", icon: Activity },
      { label: "Milestones", path: "/student/milestones", icon: BadgeCheck },
      { label: "Mentorship", path: "/student/mentorship", icon: Users },
      {
        label: "Notifications",
        path: "/student/notifications",
        icon: Bell,
        badge: 3,
      },
      { label: "Profile", path: "/student/profile", icon: UserRound },
    ],
  },
  MENTOR: {
    basePath: "/mentor",
    label: "Mentor Portal",
    subtitle: "Mentor",
    navigation: [
      { label: "Dashboard", path: "/mentor/dashboard", icon: LayoutDashboard },
      { label: "Students", path: "/mentor/students", icon: Users },
      {
        label: "Milestone Reviews",
        path: "/mentor/reviews",
        icon: ClipboardCheck,
      },
      { label: "Assessments", path: "/mentor/assessments", icon: ListChecks },
      { label: "Mentorship", path: "/mentor/mentorship", icon: CalendarCheck },
      { label: "Notifications", path: "/mentor/notifications", icon: Bell },
      { label: "Profile", path: "/mentor/profile", icon: UserRound },
    ],
  },
  STAFF: {
    basePath: "/staff",
    label: "Staff Portal",
    subtitle: "TEC Staff",

    navigation: [
      {
        label: "Dashboard",
        path: "/staff/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Students",
        path: "/staff/students",
        icon: Users,
      },
      {
        label: "Attendance",
        path: "/staff/attendance",
        icon: CalendarCheck,
      },
      {
        label: "Flags",
        path: "/staff/flags",
        icon: Flag,
      },
      {
        label: "Milestones",
        path: "/staff/milestones",
        icon: BadgeCheck,
      },
      {
        label: "Reports",
        path: "/staff/reports",
        icon: FileBarChart,
      },
      {
        label: "Notifications",
        path: "/staff/notifications",
        icon: Bell,
      },
      {
        label: "Profile",
        path: "/staff/profile",
        icon: UserRound,
      },
    ],
  },
  ADMIN: {
    basePath: "/admin",
    label: "Admin Portal",
    subtitle: "System Administrator",
    navigation: [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", path: "/admin/users", icon: Users },
      { label: "Students", path: "/admin/students", icon: UserRound },
      {
        label: "Skills & Departments",
        path: "/admin/catalog",
        icon: ListChecks,
      },
      { label: "Maturity Overrides", path: "/admin/maturity", icon: Gauge },
      { label: "Audit Logs", path: "/admin/audit", icon: ShieldCheck },
      { label: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
  STAKEHOLDER: {
    basePath: "/stakeholder",
    label: "Stakeholder Portal",
    subtitle: "Read-only Impact View",
    navigation: [
      {
        label: "Dashboard",
        path: "/stakeholder/dashboard",
        icon: LayoutDashboard,
      },
      { label: "Impact", path: "/stakeholder/impact", icon: BarChart3 },
      { label: "Reports", path: "/stakeholder/reports", icon: FileBarChart },
      { label: "Profile", path: "/stakeholder/profile", icon: UserRound },
    ],
  },
};

export const getPortalConfig = (role) =>
  PORTAL_CONFIG[role] ?? PORTAL_CONFIG.STUDENT;

export const getRoleLabel = (role) => ROLE_LABELS[role] ?? "User";
