import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import StudentLayout from "../layouts/StudentLayout";

import AuthGateway from "../features/auth/pages/AuthGateway";

import StudentDashboard from "../features/student/dashboard/StudentDashboard";
import MyJourney from "../features/student/journey/MyJourney";

import Milestones from "../features/student/milestones/pages/Milestones";
import ClaimMilestone from "../features/student/milestones/pages/ClaimMilestone";

import Mentorship from "../features/student/mentorship/pages/Mentorship";

const Placeholder = ({ title }) => (
  <div>
    <h1 className="text-2xl font-bold text-text-primary">
      {title}
    </h1>

    <p className="mt-2 text-text-secondary">
      This page is under development.
    </p>
  </div>
);

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
        // element: <Placeholder title="Mentorship" />,
      },

      {
        path: "notifications",
        element: <Placeholder title="Notifications" />,
      },

      {
        path: "profile",
        element: <Placeholder title="Profile" />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/auth" replace />,
  },
]);

export default router;