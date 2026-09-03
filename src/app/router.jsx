import { createBrowserRouter } from "react-router-dom";

import AuthGateway from "@/features/auth/pages/AuthGateway";
import StudentLayout from "@/layouts/StudentLayout";

import StudentDashboard from "@/features/student/dashboard/StudentDashboard";
import MyJourney from "@/features/student/journey/MyJourney";

import Milestones from "@/features/student/milestones/pages/Milestones";
import ClaimMilestone from "@/features/student/milestones/pages/ClaimMilestone";

export const Placeholder = ({ title }) => (
  <div>
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="mt-2 text-text-secondary">
      This page is under development.
    </p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGateway />,
  },

  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
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
        element: <Placeholder title="Mentorship" />,
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
]);