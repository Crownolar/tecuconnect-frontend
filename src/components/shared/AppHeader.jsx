import { Bell } from "lucide-react";

import Avatar from "../ui/Avatar";

const pageTitles = {
  "/student/dashboard": "Dashboard",
  "/student/journey": "My Journey",
  "/student/milestones": "Milestones",
  "/student/mentorship": "Mentorship",
  "/student/notifications": "Notifications",
  "/student/profile": "Profile",
};

export default function AppHeader({ pathname }) {
  const pageTitle =
    pageTitles[pathname] || "Dashboard";

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        
        <span className="font-medium text-slate-500">
          TECuCONNECT
        </span>

        <span className="text-slate-300">
          /
        </span>

        <span className="font-semibold text-slate-700">
          {pageTitle}
        </span>

      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-5">
        
        <button
          className="
            relative flex h-10 w-10
            items-center justify-center
            rounded-lg border border-slate-200
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          <Bell size={18} />

          {/* Optional notification indicator */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button>

        <Avatar
          name="Yusuf Abdulrahman"
          size="md"
        />

      </div>

    </header>
  );
}