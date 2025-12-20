import axios from 'axios';
import { authStore } from '../authStore';

export const PORT = (import.meta.env.VITE_API_PORT as string) || '8081';
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `http://localhost:${PORT}`,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // AllowedOrigins: '*',
  },
  withCredentials: true,
});
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq: any = err.config;
    if (!originalReq) return Promise.reject(err);

    if (!(err.response?.status === 401) || originalReq._retry) {
      return Promise.reject(err);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (token) originalReq.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiClient(originalReq));
          },
          reject,
        });
      });
    }

    originalReq._retry = true;
    isRefreshing = true;

    try {
      const resp = await apiClient.post(
        '/api/u/token/refresh',
        {},
        { withCredentials: true }
      );
      const newAccessToken =
        resp.data.accessToken || resp.data.access_token || null;

      if (newAccessToken) {
        localStorage.setItem('access_token', newAccessToken);
      }

      processQueue(null, newAccessToken);

      isRefreshing = false;
      if (newAccessToken)
        originalReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return apiClient(originalReq);
    } catch (e) {
      processQueue(e, null);
      isRefreshing = false;
      return Promise.reject(e);
    }
  }
);

apiClient.interceptors.request.use((cfg) => {
  const token = authStore.getToken();
  if (token)
    cfg.headers = {
      ...(cfg.headers || {}),
      Authorization: `Bearer ${token}`,
    } as any;
  return cfg;
});
