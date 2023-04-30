import React from 'react';
import { isMobileDevice } from '../utils/helpers';
import MobilePOS from '../pages/POSMobile';
import POS from '../pages/POS';

const Switcher = () => {
  if (isMobileDevice()) {
    return <MobilePOS/>;
  } else {
    return <POS />;
  }
};

export default Switcher;
