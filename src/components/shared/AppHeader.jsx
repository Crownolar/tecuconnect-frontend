import { Bell, Menu } from "lucide-react";
import Avatar from "../ui/Avatar";

const pageTitles = {
  "/student/dashboard": "Dashboard",
  "/student/journey": "My Journey",
  "/student/milestones": "Milestones",
  "/student/milestones/claim": "Claim Milestone",
  "/student/mentorship": "Mentorship",
  "/student/notifications": "Notifications",
  "/student/profile": "Profile",
};

export default function AppHeader({ pathname, onMenuClick }) {
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 sm:h-20 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb / page title */}
        <div className="flex min-w-0 items-center gap-2 text-xs">
          <span className="hidden font-medium text-slate-500 sm:inline">
            TEC-TRAK
          </span>

          <span className="hidden text-slate-300 sm:inline">
            /
          </span>

          <span className="truncate font-semibold text-slate-700">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-slate-50 sm:h-10 sm:w-10"
        >
          <Bell size={18} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        {/* Avatar */}
        <Avatar
          name="Yusuf Abdulrahman"
          size="md"
        />
      </div>
    </header>
  );
}