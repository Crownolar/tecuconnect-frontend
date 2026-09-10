import { useNavigate } from "react-router-dom";

import AuthBrandPanel from "../components/AuthBrandPanel";

import AuthLoginPanel from "../components/AuthLoginPanel";

import { getDashboardRoute } from "../../../utils/helpers";

const AuthGateway = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const mockUser = {
      id: "student-001",

      name: "Yusuf Abdulrahman",

      role: "STUDENT",

      email: "yusuf.abdulrahman@student.unilorin.edu.ng",
    };

    localStorage.setItem(
      "tecuconnect_user",
      JSON.stringify(mockUser)
    );

    navigate(getDashboardRoute(mockUser.role));
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <AuthLoginPanel onLogin={handleLogin} />
    </main>
  );
};

export default AuthGateway;