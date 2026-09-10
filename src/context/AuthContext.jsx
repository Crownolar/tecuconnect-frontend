import {
  createContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../features/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      "tecuconnect_user",
      JSON.stringify(userData)
    );

    setUser(userData);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};