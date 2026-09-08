export const authService = {
  getCurrentUser() {
    const user = localStorage.getItem("tecuconnect_user");

    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem("tecuconnect_user");
  },
};