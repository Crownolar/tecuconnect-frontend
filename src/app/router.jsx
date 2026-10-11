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
import MentorMentorship from "../features/mentor/mentorship/Mentorship";
import MentorAssessments from "../features/mentor/assessments/Assessments";
import MentorNotifications from "../features/mentor/notifications/Notifications";
import MentorProfile from "../features/mentor/profile";

import StaffDashboard from "../features/staff/dashboard/StaffDashboard";
import StaffStudents from "../features/staff/students/StaffStudents";
import StaffAttendance from "../features/staff/attendance/StaffAttendance";
import StaffNotifications from "../features/staff/notifications/Notifications";
import StaffFlags from "../features/staff/flags/StaffFlags";
import StaffMilestones from "../features/staff/milestones/StaffMilestones";
import StaffReports from "../features/staff/reports/StaffReports";
import StaffProfile from "../features/staff/profile";

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
import AdminCreateUser from "@/features/admin/users/AdminCreateUser";
import MilestoneView from "@/features/student/milestones/pages/MilestoneView";
import AdminMentors from "@/features/admin/mentors/AdminMentors";
import AdminStudentDetail from "@/features/admin/students/AdminStudentDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/auth' replace />,
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
        element: <RoleLayout role='STUDENT' />,
        children: [
          { index: true, element: <Navigate to='dashboard' replace /> },
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
          {
            path: "milestones/:milestoneId",
            element: <MilestoneView />,
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
        element: <RoleLayout role='MENTOR' />,
        children: [
          { index: true, element: <Navigate to='dashboard' replace /> },
          { path: "dashboard", element: <MentorDashboard /> },
          { path: "students", element: <MentorStudents /> },
          { path: "reviews", element: <MilestoneReviews /> },
          {
            path: "assessments",
            element: <MentorAssessments />,
          },
          {
            path: "mentorship",
            element: <MentorMentorship />,
          },
          {
            path: "notifications",
            element: <MentorNotifications />,
          },
          {
            path: "profile",
            element: <MentorProfile />,
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
        element: <RoleLayout role='STAFF' />,
        children: [
          { index: true, element: <Navigate to='dashboard' replace /> },
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
            element: <StaffNotifications />,
          },
          {
            path: "profile",
            element: <StaffProfile />,
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
        element: <RoleLayout role='ADMIN' />,
        children: [
          {
            index: true,
            element: <Navigate to='dashboard' replace />,
          },

          {
            path: "dashboard",
            element: <AdminDashboard />,
          },

          {
            path: "users",
            element: <AdminUsers />,
          },

          { path: "students", element: <AdminStudents /> },

          { path: "students/:studentId", element: <AdminStudentDetail /> },

          {
            path: "catalog",
            element: <AdminCatalog />,
          },

          {
            path: "maturity",
            element: <AdminMaturity />,
          },

          {
            path: "mentors",
            element: <AdminMentors />,
          },

          {
            path: "audit",
            element: <AdminAudit />,
          },

          {
            path: "settings",
            element: <AdminSettings />,
          },
          {
            path: "users/create",
            element: <AdminCreateUser />,
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
        element: <RoleLayout role='STAKEHOLDER' />,
        children: [
          {
            index: true,
            element: <Navigate to='dashboard' replace />,
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
    element: <Navigate to='/auth' replace />,
  },
]);

export default router;
