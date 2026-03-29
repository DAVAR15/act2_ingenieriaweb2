import axios from 'axios';

const apiClient = axios.create({
  // Usar variable de despliegue en Vercel, o caer a localhost en desarrollo
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[API-CLIENT] Error General:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
