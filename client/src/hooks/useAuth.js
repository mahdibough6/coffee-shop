// src/hooks/useAuth.js
import { useState } from 'react';
import api, { setAuthToken } from '../services/api';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await api.post('/login/employee', { username, password });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      setLoggedIn(true);
      return true;
    } catch (error) {
      // handle login error
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
    setLoggedIn(false);
  };

  return {
    loggedIn,
    login,
    logout,
  };
};

export default useAuth;
