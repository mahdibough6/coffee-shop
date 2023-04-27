import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LicenseProtection = () => {
  const [licenseKey, setLicenseKey] = useState('');

  useEffect(() => {
    // Check if the license key is present in local storage
    const storedLicenseKey = localStorage.getItem('licenseKey');
    if (storedLicenseKey) {
      setLicenseKey(storedLicenseKey);
    }
  }, []);

  const isAuthenticated = true /*verifyLicenseKey(licenseKey)*/;

  if (isAuthenticated) {
    // Store the license key in local storage if it is valid
    localStorage.setItem('licenseKey', licenseKey);

    return <Outlet />;
  } else {
    return <Navigate to="../employee-login/" />;
  }
};

export default LicenseProtection;
