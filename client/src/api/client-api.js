// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
});

// Add a request interceptor to set the Authorization header with the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      if (error.config.onForbidden) {
        error.config.onForbidden();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
