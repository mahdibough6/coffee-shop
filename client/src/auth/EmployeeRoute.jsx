import { Outlet, Navigate,  } from 'react-router-dom';
import { useState } from 'react';


const EmployeeRoute = () => {
    const isAuthenticated = localStorage.getItem('jwt');
  if (isAuthenticated) { 
    return (
        <Outlet />
    );
  } else {
    return <Navigate to="../employee-login/" />;
  }
};

export default EmployeeRoute;

