import React from 'react';
import { isMobileDevice } from '../utils/helpers';
import Dashboard from '../pages/Dashboard';
import MobileDashboard from '../pages/MobileDashboard';

const ClientSwitcher = () => {
  //if (isMobileDevice()) {
   // return <MobileDashboard />;
    //return <Dashboard />;
  //} else {
    return <Dashboard />;
 // }
};

export default ClientSwitcher;
