import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const {
    user,
    isLoading,
  } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm text-slate-500">
          Loading TEC-TRAK...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleProtectedRoute;