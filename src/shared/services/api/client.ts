import axios from 'axios';

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
