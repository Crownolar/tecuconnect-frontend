import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Compass,
  BadgeCheck,
  Users,
  Bell,
  UserRound,
} from "lucide-react";

import Avatar from "../ui/Avatar";

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

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#0D3527] text-white">
      
      {/* Logo */}
      <div className="px-6 pt-7">
        <div className="flex items-center gap-3">
          
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#0D3527]">
            <span className="text-sm font-bold">
              T
            </span>
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-wide">
              TECuCONNECT
            </h1>

            <p className="text-[9px] font-semibold tracking-widest text-lime-300">
              UNILORIN
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex-1 px-4">
        <div className="space-y-1">
          
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
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
                <div className="flex items-center gap-3">
                  <Icon size={17} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-[10px] font-bold text-[#0D3527]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
          
          <Avatar
            name="Yusuf Abdulrahman"
            size="sm"
          />

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">
              Yusuf Abdulrahman
            </p>

            <p className="text-[10px] text-lime-300">
              TEC Fellow
            </p>
          </div>

        </div>
      </div>

    </aside>
  );
}