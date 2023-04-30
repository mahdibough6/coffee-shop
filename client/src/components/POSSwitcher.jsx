import React from 'react';
import { isMobileDevice } from '../utils/helpers';
import POSMobile from '../pages/POSMobile';
import POS from '../pages/POS';

const POSSwitcher = () => {
  if (isMobileDevice()) {
    return <POSMobile />;
  } else {
    return <POS />;
  }
};

export default POSSwitcher;
