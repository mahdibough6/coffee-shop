import { Outlet, Navigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext, createContext } from 'react';
import axiosInstance from './axioInstance';

import { EmployeeContext } from '../contexts/EmployeeContext';

const EmployeeRoutes = () => {
  const location = useLocation();
  const [employee, setEmployee] = useState(location.state?.employee);
  if (localStorage.getItem('jwtToken')) {
    return (
      <EmployeeContext.Provider value={[employee, setEmployee]}>
        <Outlet />
      </EmployeeContext.Provider>
    );
  } else {
    return <Navigate to="../login/" />;
  }
};

export default EmployeeRoutes;
