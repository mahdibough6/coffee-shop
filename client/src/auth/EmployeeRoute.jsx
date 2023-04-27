import { Outlet, Navigate,  } from 'react-router-dom';
import { useState } from 'react';


const EmployeeRoute = () => {
    const isAuthenticated = true;
  if (isAuthenticated) { 
    return (
        <Outlet />
    );
  } else {
    return <Navigate to="../employee-login/" />;
  }
};

export default EmployeeRoute;

