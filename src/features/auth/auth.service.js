const AUTH_STORAGE_KEY = "tec_trak_user";

export const authService = {
  login(userData) {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(userData)
    );

    return userData;
  },

  getCurrentUser() {
    const user = localStorage.getItem(AUTH_STORAGE_KEY);

    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};