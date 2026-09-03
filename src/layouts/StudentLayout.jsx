import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import AppHeader from "../components/shared/AppHeader";

export default function StudentLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        
        <AppHeader pathname={location.pathname} />

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-1440px px-6 py-6 lg:px-8">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
}