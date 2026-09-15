import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import StudentLayout from "../layouts/StudentLayout";

import AuthGateway from "../features/auth/pages/AuthGateway";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import StudentDashboard from "../features/student/dashboard/StudentDashboard";
import MyJourney from "../features/student/journey/MyJourney";

import Milestones from "../features/student/milestones/pages/Milestones";
import ClaimMilestone from "../features/student/milestones/pages/ClaimMilestone";

import Mentorship from "../features/student/mentorship/pages/Mentorship";
import Notification from "@/features/student/notifications/pages/Notifications";
import Profile from "@/features/student/profile/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <AuthGateway />,
      },
    ],
  },

  {
    path: "/student",
    element: <ProtectedRoute />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "journey",
            element: <MyJourney />,
          },
          {
            path: "milestones",
            element: <Milestones />,
          },
          {
            path: "milestones/claim",
            element: <ClaimMilestone />,
          },
          {
            path: "mentorship",
            element: <Mentorship />,
          },
          {
            path: "notifications",
            element: <Notification />,
          },
          {
            path: "profile",
            element: <Profile />,
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
