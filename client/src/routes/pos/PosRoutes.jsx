import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PosLogin from '../../components/pos/desktop/PosLogin';
import Pos from '../../components/pos/desktop/Pos';
import Recipe from '../../components/pos/desktop/Recipe';
import LicenseProtection from '../../components/common/LicenseProtection';
import ProtectedPosRoute from './ProtectedPosRoute';
import PosSwitcher from '../../components/common/PosSwitcher';
import EmployeeLogin from '../../components/common/EmployeeLogin';
import qz from 'qz-tray';

function PosRoutes() {
  useEffect(()=>{
  qz.security.setCertificatePromise(function(resolve, reject) {
    fetch("http://localhost:5000/certificate.txt", {cache: 'no-store', headers: {'Content-Type': 'text/plain'}})
       .then(function(data) { data.ok ? resolve(data.text()) : reject(data.text()); });
 });
  qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
   qz.security.setSignaturePromise(function(toSign) {
      return function(resolve, reject) {
         fetch("http://localhost:5000/signing?request=" + toSign, {cache: 'no-store', headers: {'Content-Type': 'text/plain'}})
            .then(function(data) { data.ok ? resolve(data.text()) : reject(data.text()); });
        };
    });
        qz.websocket.connect();

        return () => qz.websocket.disconnect();
  }, [])
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
