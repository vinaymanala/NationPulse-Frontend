let accessToken: string | null = null;

export const authStore = {
  getToken(): string | null {
    return accessToken;
  },
  setToken(token: string | null) {
    accessToken = token;
  },
  clearToken() {
    accessToken = null;
  },
};

export default authStore;
