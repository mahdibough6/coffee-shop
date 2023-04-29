import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Update this to your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
