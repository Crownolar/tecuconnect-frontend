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
    let mounted = true;

    const restoreSession = async () => {
      try {
        const currentUser =
          await authService.getCurrentUser();

        if (mounted) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error(
          "Failed to restore authentication session:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentialsOrUser) => {
    const authenticatedUser =
      await authService.login(credentialsOrUser);

    setUser(authenticatedUser);

    return authenticatedUser;
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