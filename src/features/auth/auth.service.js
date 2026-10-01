import { apiClient } from "../../services/api/apiClient";
import { tokenStorage } from "../../services/auth/tokenStorage";

const AUTH_STORAGE_KEY = "tec_trak_user";

const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === "true";

const saveMockUser = (user) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
};

const getMockUser = () => {
  const user = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!user) return null;

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

const unwrapData = (response) => {
  return response?.data ?? response;
};

export const authService = {
  async login(credentials) {
    if (USE_MOCK_AUTH) {
      return saveMockUser(credentials);
    }

    const response = await apiClient.post("/auth/login", credentials);

    const payload = unwrapData(response);

    if (!payload?.token) {
      throw new Error(
        "Authentication succeeded but no access token was returned.",
      );
    }

    tokenStorage.set(payload.token);

    // If login response already contains the user
    if (payload.user) {
      return payload.user;
    }

    // Otherwise restore the authenticated user from /auth/me
    return this.getCurrentUser();
  },

  async getCurrentUser() {
    if (USE_MOCK_AUTH) {
      return getMockUser();
    }

    const token = tokenStorage.get();

    if (!token) return null;

    try {
      const response = await apiClient.get("/auth/me");

      return unwrapData(response);
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
