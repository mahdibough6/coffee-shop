import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PosLogin from '../../components/pos/desktop/PosLogin';
import Pos from '../../components/pos/desktop/Pos';
import Recipe from '../../components/pos/desktop/Recipe';
import LicenseProtection from '../../components/common/LicenseProtection';
import ProtectedPosRoute from './ProtectedPosRoute';
import PosSwitcher from '../../components/common/PosSwitcher';
import EmployeeLogin from '../../components/common/EmployeeLogin';

function PosRoutes() {
  return (
    <Routes>
      <Route element={<LicenseProtection />}>
        <Route element={<ProtectedPosRoute />}>
          <Route element={<PosSwitcher />}>
            <Route path="" element={<Pos />} />
            <Route path="recipe/" element={<Recipe />} />
          </Route>
        </Route>
        <Route path='pos-login/' element={<EmployeeLogin/>}/>
      </Route>

    </Routes>
  );
}
//

export default PosRoutes;
