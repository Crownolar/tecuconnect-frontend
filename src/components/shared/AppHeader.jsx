import { Bell, Menu } from "lucide-react";
import Avatar from "../ui/Avatar";
import { getPortalConfig } from "../../config/portal.config";

const commonTitles = {
  "/dashboard": "Dashboard",
  "/journey": "My Journey",
  "/milestones": "Milestones",
  "/milestones/claim": "Claim Milestone",
  "/mentorship": "Mentorship",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/students": "Students",
  "/reviews": "Milestone Reviews",
  "/assessments": "Assessments",
  "/attendance": "Attendance",
  "/reports": "Reports",
  "/users": "Users",
  "/catalog": "Skills & Departments",
  "/maturity": "Maturity Overrides",
  "/audit": "Audit Logs",
  "/settings": "Settings",
  "/impact": "Impact",
};

function getPageTitle(pathname, role) {
  const config = getPortalConfig(role);
  const match = pathname.startsWith(config.basePath)
    ? pathname.slice(config.basePath.length) || "/dashboard"
    : "/dashboard";

  return commonTitles[match] || config.label;
}

export default function AppHeader({ pathname, onMenuClick, role }) {
  const pageTitle = getPageTitle(pathname, role);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 sm:h-20 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="flex min-w-0 items-center gap-2 text-xs">
          <span className="hidden font-medium text-slate-500 sm:inline">
            TEC-TRAK
          </span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <span className="truncate font-semibold text-slate-700">
            {pageTitle}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-slate-50 sm:h-10 sm:w-10"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <Avatar name="TEC-TRAK User" size="md" />
      </div>
    </header>
  );
}
