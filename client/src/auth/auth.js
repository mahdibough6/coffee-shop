import axios from 'axios';
import axiosInstance from '../utils/axioInstance';

export const login = async (username, password) => {
  try {
    const res = await axiosInstance.post('/login/employee', { username, password });
    return res.data.token;
  } catch (error) {
    return null;
  }
};

export const fetchProtectedData = async (token, path) => {
    try {
      const res = await axiosInstance.get(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return {
        error: error.response ? error.response.data : 'Error: Network Error',
      };
    }
  };
