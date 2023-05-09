import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAutoLogout } from '../../hooks/useAutoLogout';
import usePosAuthStore from '../../store/posAuthStore';

function ProtectedPosRoute() {
  const {isAuthenticated} = usePosAuthStore();
  const navigate = useNavigate();
  useAutoLogout(navigate, 10); // Pass the navigate function to the useAutoLogout hook

  console.log("autn", isAuthenticated)
  if (isAuthenticated === true) {
    return <Outlet />;
  } else {
    return <Navigate to="./pos-login" />;
  }
}

export default ProtectedPosRoute;
