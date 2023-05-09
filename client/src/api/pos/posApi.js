import axios from 'axios';
import usePosAuthStore from '../../store/posAuthStore';
import { useNavigate } from 'react-router-dom';

const posApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});


// Add a request interceptor to set the Authorization header with the token
posApi.interceptors.request.use((config) => {
const token = localStorage.getItem('posJwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 Unauthorized responses
posApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default posApi;
