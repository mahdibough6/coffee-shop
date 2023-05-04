import axios from 'axios';

const clientApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});


// Add a request interceptor to set the Authorization header with the token
clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtClient');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle 401 Unauthorized responses
clientApi.interceptors.response.use(
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

export default clientApi;
