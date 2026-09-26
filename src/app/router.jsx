import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import RoleLayout from "../layouts/RoleLayout";

import AuthGateway from "../features/auth/pages/AuthGateway";
import RoleProtectedRoute from "../features/auth/components/RoleProtectedRoute";

import StudentDashboard from "../features/student/dashboard/StudentDashboard";
import MyJourney from "../features/student/journey/MyJourney";
import Milestones from "../features/student/milestones/pages/Milestones";
import ClaimMilestone from "../features/student/milestones/pages/ClaimMilestone";
import Mentorship from "../features/student/mentorship/pages/Mentorship";
import Notification from "../features/student/notifications/pages/Notifications";
import Profile from "../features/student/profile/pages/Profile";

import MentorDashboard from "../features/mentor/dashboard/MentorDashboard";
import MentorStudents from "../features/mentor/students/MentorStudents";
import MilestoneReviews from "../features/mentor/reviews/MilestoneReviews";
import PortalPlaceholder from "../features/portal/pages/PortalPlaceholder";

import StaffDashboard from "../features/staff/dashboard/StaffDashboard";
import StaffStudents from "../features/staff/students/StaffStudents";
import StaffAttendance from "../features/staff/attendance/StaffAttendance";
import StaffFlags from "../features/staff/flags/StaffFlags";
import StaffMilestones from "../features/staff/milestones/StaffMilestones";
import StaffReports from "../features/staff/reports/StaffReports";

import AdminDashboard from "../features/admin/dashboard/AdminDashboard";
import AdminUsers from "../features/admin/users/AdminUsers";
import AdminStudents from "../features/admin/students/AdminStudents";
import AdminCatalog from "../features/admin/catalog/AdminCatalog";
import AdminMaturity from "../features/admin/maturity/AdminMaturity";
import AdminAudit from "../features/admin/audit/AdminAudit";
import AdminSettings from "../features/admin/settings/AdminSettings";

import StakeholderDashboard from "../features/stakeholder/dashboard/StakeholderDashboard";
import StakeholderImpact from "../features/stakeholder/impact/StakeholderImpact";
import StakeholderReports from "../features/stakeholder/reports/StakeholderReports";
import StakeholderProfile from "../features/stakeholder/profile/StakeholderProfile";
import ResubmitMilestone from "@/features/student/milestones/pages/ResubmitMilestone";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ index: true, element: <AuthGateway /> }],
  },
  {
    path: "/student",
    element: <RoleProtectedRoute allowedRoles={["STUDENT"]} />,
    children: [
      {
        element: <RoleLayout role="STUDENT" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <StudentDashboard /> },
          { path: "journey", element: <MyJourney /> },
          { path: "milestones", element: <Milestones /> },
          { path: "milestones/claim", element: <ClaimMilestone /> },
          { path: "mentorship", element: <Mentorship /> },
          { path: "notifications", element: <Notification /> },
          { path: "profile", element: <Profile /> },
          {
            path: "milestones/resubmit",
            element: <ResubmitMilestone />,
          },
        ],
      },
    ],
  },
  {
    path: "/mentor",
    element: <RoleProtectedRoute allowedRoles={["MENTOR"]} />,
    children: [
      {
        element: <RoleLayout role="MENTOR" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <MentorDashboard /> },
          { path: "students", element: <MentorStudents /> },
          { path: "reviews", element: <MilestoneReviews /> },
          {
            path: "assessments",
            element: (
              <PortalPlaceholder
                role="Mentor"
                title="Assessments"
                description="Complete competency assessments as defined by the backend workflow."
              />
            ),
          },
          {
            path: "mentorship",
            element: (
              <PortalPlaceholder
                role="Mentor"
                title="Mentorship"
                description="Manage mentorship sessions, guidance and follow-up activities."
              />
            ),
          },
          {
            path: "notifications",
            element: (
              <PortalPlaceholder
                role="Mentor"
                title="Notifications"
                description="Review role-specific alerts and actions requiring attention."
              />
            ),
          },
          {
            path: "profile",
            element: (
              <PortalPlaceholder
                role="Mentor"
                title="Profile"
                description="Manage mentor profile information and account settings."
              />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/staff",
    element: <RoleProtectedRoute allowedRoles={["STAFF"]} />,
    children: [
      {
        element: <RoleLayout role="STAFF" />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <StaffDashboard /> },
          {
            path: "students",
            element: <StaffStudents />,
          },
          {
            path: "attendance",
            element: <StaffAttendance />,
          },
          {
            path: "flags",
            element: <StaffFlags />,
          },
          {
            path: "milestones",
            element: <StaffMilestones />,
          },
          {
            path: "reports",
            element: <StaffReports />,
          },
          {
            path: "notifications",
            element: (
              <PortalPlaceholder
                role="Staff"
                title="Notifications"
                description="Review operational alerts and actions requiring attention."
              />
            ),
          },
          {
            path: "profile",
            element: (
              <PortalPlaceholder
                role="Staff"
                title="Profile"
                description="Manage staff profile information and account settings."
              />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <RoleProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <RoleLayout role="ADMIN" />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },

          {
            path: "dashboard",
            element: <AdminDashboard />,
          },

          {
            path: "users",
            element: <AdminUsers />,
          },

          {
            path: "students",
            element: <AdminStudents />,
          },

          {
            path: "catalog",
            element: <AdminCatalog />,
          },

          {
            path: "maturity",
            element: <AdminMaturity />,
          },

          {
            path: "audit",
            element: <AdminAudit />,
          },

          {
            path: "settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/stakeholder",
    element: <RoleProtectedRoute allowedRoles={["STAKEHOLDER"]} />,
    children: [
      {
        element: <RoleLayout role="STAKEHOLDER" />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },

          {
            path: "dashboard",
            element: <StakeholderDashboard />,
          },

          {
            path: "impact",
            element: <StakeholderImpact />,
          },

          {
            path: "reports",
            element: <StakeholderReports />,
          },

          {
            path: "profile",
            element: <StakeholderProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth" replace />,
  },
]);

export default router;
