import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Compass,
  BadgeCheck,
  Users,
  Bell,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

import Avatar from "../ui/Avatar";
import { useAuth } from "../../hooks/useAuth";

const navigation = [
  {
    label: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Journey",
    path: "/student/journey",
    icon: Compass,
  },
  {
    label: "Milestones",
    path: "/student/milestones",
    icon: BadgeCheck,
    },
  {
    label: "Mentorship",
    path: "/student/mentorship",
    icon: Users,
  },
  {
    label: "Notifications",
    path: "/student/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    label: "Profile",
    path: "/student/profile",
    icon: UserRound,
  },
];

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/auth", { replace: true });
  };

  return (
    <>
      {/* =========================================
          MOBILE BACKDROP
          ========================================= */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* =========================================
          SIDEBAR
          ========================================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen w-64 shrink-0 flex-col
          bg-[#0D3527] text-white
          transition-transform duration-200 ease-in-out

          lg:static
          lg:translate-x-0

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =========================================
            LOGO / BRAND
            ========================================= */}
        <div className="px-6 pt-7">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* T Logo */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0D3527]">
                <span className="text-sm font-bold">T</span>
              </div>

              {/* Brand name */}
              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold tracking-wide">
                  TEC-TRAK
                </h1>

                <p className="text-[9px] font-semibold tracking-widest text-lime-300">
                  UNILORIN
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* =========================================
            NAVIGATION
            ========================================= */}
        <nav className="mt-10 flex-1 overflow-y-auto px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center justify-between
                    rounded-lg px-3 py-2.5
                    text-sm transition-colors

                    ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                    `
                  }
                >
                  {/* Left side */}
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon
                      size={17}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {item.label}
                    </span>
                  </div>

                  {/* Notification badge */}
                  {item.badge && (
                    <span className="ml-2 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-[#0D3527]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* =========================================
            USER PROFILE
            ========================================= */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-white/5 p-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar
                name="Yusuf Abdulrahman"
                size="sm"
              />

              {/* User information */}
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  Yusuf Abdulrahman
                </p>

                <p className="text-[10px] text-lime-300">
                  TEC Fellow
                </p>
              </div>
            </div>

            {/* Sign out */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut
                size={15}
                className="shrink-0"
              />

              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}