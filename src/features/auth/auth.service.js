import { apiClient } from "../../services/api/apiClient";
import { tokenStorage } from "../../services/auth/tokenStorage";

const AUTH_STORAGE_KEY = "tec_trak_user";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH !== "false";

const saveMockUser = (user) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

  return user;
};

const getMockUser = () => {
  const user = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const clearMockUser = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const authService = {
  async login(credentialsOrUser) {
    if (USE_MOCK_AUTH) {
      return saveMockUser(credentialsOrUser);
    }

    const response = await apiClient.post("/auth/login", credentialsOrUser);

    const token =
      response?.token ??
      response?.data?.token ??
      response?.accessToken ??
      response?.data?.accessToken;

    if (!token) {
      throw new Error(
        "Authentication succeeded but no access token was returned.",
      );
    }

    tokenStorage.set(token);

    const user = response?.user ?? response?.data?.user ?? response?.data;

    if (user) {
      return user;
    }

    return this.getCurrentUser();
  },

  async getCurrentUser() {
    if (USE_MOCK_AUTH) {
      return getMockUser();
    }

    const token = tokenStorage.get();

    if (!token) {
      return null;
    }

    try {
      const response = await apiClient.get("/auth/me");

      return (
        response?.data?.user ??
        response?.data ??
        response?.user ??
        response ??
        null
      );
    } catch (error) {
      if (error.status === 401) {
        tokenStorage.clear();
        return null;
      }

      throw error;
    }
  },

  logout() {
    tokenStorage.clear();
    clearMockUser();
  },
};
