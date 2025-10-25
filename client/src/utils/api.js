import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://noteflow-backend01.onrender.com';

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`, // Add /api/v1 here
  withCredentials: true,
});

// Add request interceptor to include JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if token is invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;

