// import { useNavigate } from "react-router-dom";

// import { useAuth } from "../../../hooks/useAuth";

// import AuthBrandPanel from "../components/AuthBrandPanel";
// import AuthLoginPanel from "../components/AuthLoginPanel";

// import { getDashboardRoute } from "../../../utils/helpers";

// const AuthGateway = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = () => {
//     const role = import.meta.env.VITE_MOCK_ROLE || "MENTOR";
//     const roleDefaults = {
//       STUDENT: {
//         id: "student-001",
//         name: "Yusuf Abdulrahman",
//         email: "yusuf.abdulrahman@student.unilorin.edu.ng",
//       },
//       MENTOR: {
//         id: "mentor-001",
//         name: "TEC Mentor",
//         email: "mentor@unilorin.edu.ng",
//       },
//       STAFF: {
//         id: "staff-001",
//         name: "TEC Staff",
//         email: "staff@unilorin.edu.ng",
//       },
//       ADMIN: {
//         id: "admin-001",
//         name: "TEC Admin",
//         email: "admin@unilorin.edu.ng",
//       },
//       STAKEHOLDER: {
//         id: "stakeholder-001",
//         name: "TEC Stakeholder",
//         email: "stakeholder@unilorin.edu.ng",
//       },
//     };

//     const mockUser = {
//       ...(roleDefaults[role] || roleDefaults.STUDENT),
//       role,
//     };

//     login(mockUser);

//     navigate(getDashboardRoute(mockUser.role), {
//       replace: true,
//     });
//   };

//   return (
//     <main className="grid min-h-screen lg:grid-cols-2">
//       <AuthBrandPanel />

//       <AuthLoginPanel onLogin={handleLogin} />
//     </main>
//   );
// };

// export default AuthGateway;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import { getDashboardRoute } from "../../../utils/helpers";

const USE_MOCK_AUTH =
  import.meta.env.VITE_USE_MOCK_AUTH !== "false";

const mockRoles = [
  {
    role: "STUDENT",
    label: "Student",
    description:
      "Access your entrepreneurial journey, milestones and progress.",
  },
  {
    role: "MENTOR",
    label: "Mentor",
    description:
      "Review students, verify milestones and manage mentorship.",
  },
  {
    role: "STAFF",
    label: "Staff",
    description:
      "Manage students, attendance, flags and programme operations.",
  },
  {
    role: "ADMIN",
    label: "Admin",
    description:
      "Manage users, catalogues, maturity overrides and audit logs.",
  },
  {
    role: "STAKEHOLDER",
    label: "Stakeholder",
    description:
      "View programme impact, reports and aggregate outcomes.",
  },
];

const roleRoutes = {
  STUDENT: "/student/dashboard",
  MENTOR: "/mentor/dashboard",
  STAFF: "/staff/dashboard",
  ADMIN: "/admin/dashboard",
  STAKEHOLDER: "/stakeholder/dashboard",
};

const mockUsers = {
  STUDENT: {
    id: "student-001",
    name: "Yusuf Abdulrahman",
    role: "STUDENT",
    email: "yusuf.abdulrahman@student.unilorin.edu.ng",
    status: "ACTIVE",
  },

  MENTOR: {
    id: "mentor-001",
    name: "Demo Mentor",
    role: "MENTOR",
    email: "mentor@unilorin.edu.ng",
    status: "ACTIVE",
  },

  STAFF: {
    id: "staff-001",
    name: "Demo Staff",
    role: "STAFF",
    email: "staff@unilorin.edu.ng",
    status: "ACTIVE",
  },

  ADMIN: {
    id: "admin-001",
    name: "Demo Admin",
    role: "ADMIN",
    email: "admin@unilorin.edu.ng",
    status: "ACTIVE",
  },

  STAKEHOLDER: {
    id: "stakeholder-001",
    name: "Demo Stakeholder",
    role: "STAKEHOLDER",
    email: "stakeholder@unilorin.edu.ng",
    status: "ACTIVE",
  },
};

export default function AuthGateway() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mock authentication state
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  // Real authentication state
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  /*
   * ---------------------------------------------------------
   * MOCK AUTHENTICATION
   * ---------------------------------------------------------
   */

  const handleContinue = () => {
    const mockUser = mockUsers[selectedRole];

    if (!mockUser) {
      console.error(
        `No mock user configured for role: ${selectedRole}`
      );
      return;
    }

    login(mockUser);

    navigate(roleRoutes[selectedRole], {
      replace: true,
    });
  };

  /*
   * ---------------------------------------------------------
   * REAL BACKEND AUTHENTICATION
   * ---------------------------------------------------------
   */

  const handleRealLogin = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const authenticatedUser = await login({
        identifier,
        password,
      });

      if (!authenticatedUser?.role) {
        throw new Error(
          "Login succeeded, but no user role was returned."
        );
      }

      navigate(
        getDashboardRoute(authenticatedUser.role),
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error?.data?.message ||
          error?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * SHARED HEADER
   * ---------------------------------------------------------
   */

  const pageTitle = USE_MOCK_AUTH
    ? "Development Login"
    : "Welcome Back";

  const pageDescription = USE_MOCK_AUTH
    ? "Select a role to preview the corresponding TEC-TRAK portal."
    : "Sign in with your University of Ilorin account to continue.";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section className="w-full max-w-2xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              TEC-TRAK
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {pageTitle}
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              {pageDescription}
            </p>
          </div>

          {/* =================================================
              MOCK AUTHENTICATION
              ================================================= */}
          {USE_MOCK_AUTH ? (
            <>
              {/* Development Notice */}
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-sm font-semibold text-amber-800">
                  Mock authentication
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  This role selector is for frontend development
                  and testing only. Production authentication will
                  use the University of Ilorin authentication flow.
                </p>
              </div>

              {/* Roles */}
              <div className="space-y-3">
                {mockRoles.map((item) => {
                  const isSelected =
                    selectedRole === item.role;

                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() =>
                        setSelectedRole(item.role)
                      }
                      className={[
                        "w-full rounded-2xl border bg-white p-4 text-left transition",
                        "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                        isSelected
                          ? "border-emerald-600 ring-1 ring-emerald-600 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-sm",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-4">

                        {/* Radio indicator */}
                        <div
                          className={[
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                            isSelected
                              ? "border-emerald-600"
                              : "border-slate-300",
                          ].join(" ")}
                        >
                          {isSelected && (
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-semibold text-slate-900">
                              {item.label}
                            </h2>

                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {item.role}
                            </span>
                          </div>

                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue */}
              <button
                type="button"
                onClick={handleContinue}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Continue as{" "}
                {
                  mockRoles.find(
                    (item) =>
                      item.role === selectedRole
                  )?.label
                }

                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-5 text-center text-xs text-slate-400">
                TEC-TRAK frontend development environment
              </p>
            </>
          ) : (
            /* =================================================
               REAL BACKEND AUTHENTICATION
               ================================================= */
            <form
              onSubmit={handleRealLogin}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              {/* Production notice */}
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-sm font-semibold text-emerald-800">
                  University of Ilorin Authentication
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  Sign in with your authorized TEC-TRAK account.
                  Your role and access permissions are provided
                  by the backend.
                </p>
              </div>

              {/* Identifier */}
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email or Matric Number
                </label>

                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value)
                  }
                  placeholder="Enter your email or matric number"
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-50"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm leading-5 text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign in"}

                {!isSubmitting && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>

              <p className="mt-5 text-center text-xs text-slate-400">
                Secure TEC-TRAK authentication
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}