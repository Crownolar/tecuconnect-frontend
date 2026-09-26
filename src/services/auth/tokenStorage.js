const TOKEN_KEY = "tec_trak_access_token";

export const tokenStorage = {
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  set(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};