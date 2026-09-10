import { NavLink } from "react-router-dom";

export default function SidebarNavItem({
  to,
  icon: Icon,
  label,
  badge,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center justify-between
        rounded-lg px-3 py-2.5
        text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }
        `
      }
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={17} strokeWidth={1.8} />}
        <span>{label}</span>
      </div>

      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-xs font-semibold text-primary">
          {badge}
        </span>
      )}
    </NavLink>
  );
}