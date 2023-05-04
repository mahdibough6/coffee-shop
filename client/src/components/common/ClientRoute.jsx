import { Outlet, Navigate,  } from 'react-router-dom';
import { useState } from 'react';


const ClientRoute = () => {
    const isAuthenticated = localStorage.getItem('jwtClient');
  if (isAuthenticated) { 
    return (
        <Outlet />
    );
  } else {
    return <Navigate to="../login/" />;
  }
};

export default ClientRoute;

