import { Bell, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      
      {/* Mobile Menu Placeholder */}
      <button className="lg:hidden">
        <Menu size={22} />
      </button>

      <div className="hidden lg:block" />

      {/* Actions */}
      <div className="ml-auto flex items-center gap-4">
        
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-gray-50">
          <Bell size={18} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          Y
        </div>

      </div>
    </header>
  );
}