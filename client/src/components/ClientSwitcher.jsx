import React, { useEffect } from 'react';
import { isMobileDevice } from '../utils/helpers';
import Dashboard from '../pages/Dashboard';
import MobileDashboard from '../pages/MobileDashboard';
import { Outlet, useNavigate } from 'react-router-dom';


const ClientSwitcher = () => {
  const  navigate = useNavigate();
  useEffect(()=>{
  if (isMobileDevice()) {
    navigate('./mobile');
    
  } else {
    navigate('./desktop');
  }
  }, [isMobileDevice()])
  return <Outlet/>
};

export default ClientSwitcher;
