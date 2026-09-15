import {
  createContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../features/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const authenticatedUser = authService.login(userData);

    setUser(authenticatedUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};