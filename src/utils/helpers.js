export const getDashboardRoute = (role) => {
  const routes = {
    STUDENT: "/student/dashboard",

    MENTOR: "/mentor/dashboard",

    STAFF: "/staff/dashboard",

    ADMIN: "/admin/dashboard",

    STAKEHOLDER: "/stakeholder/dashboard",
  };

  return routes[role] || "/auth";
};