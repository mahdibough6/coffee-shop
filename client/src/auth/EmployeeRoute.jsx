import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';

const EmployeeRoute = () => {
  const jwt = localStorage.getItem('jwt');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (jwt) {
        try {
          // Make a request to the backend to check if the JWT is valid
          const response = await api.post('protected/check-authentication');

          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, [jwt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="../employee-login/" />;
  }
};

export default EmployeeRoute;


