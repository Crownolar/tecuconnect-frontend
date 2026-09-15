import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import AuthBrandPanel from "../components/AuthBrandPanel";
import AuthLoginPanel from "../components/AuthLoginPanel";
import { getDashboardRoute } from "../../../utils/helpers";

const AuthGateway = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const mockUser = {
      id: "student-001",
      name: "Yusuf Abdulrahman",
      role: "STUDENT",
      email: "yusuf.abdulrahman@student.unilorin.edu.ng",
    };

    login(mockUser);

    navigate(getDashboardRoute(mockUser.role), {
      replace: true,
    });
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />
      <AuthLoginPanel onLogin={handleLogin} />
    </main>
  );
};

export default AuthGateway;