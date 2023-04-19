// src/services/api.js
import axios from 'axios';

const baseURL = 'http://localhost:3000/';

const api = axios.create({
  baseURL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
