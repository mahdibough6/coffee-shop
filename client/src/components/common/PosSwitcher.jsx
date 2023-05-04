import React from 'react';
import { isMobileDevice } from '../../utils/helpers';
import { Outlet } from 'react-router-dom';
import UnderDevelopment from './UnderDevelopement';


const PosSwitcher = () => {
  if (isMobileDevice()) {
    return <UnderDevelopment/>;
  } else {
    return <Outlet />;
  }
};

export default PosSwitcher;

