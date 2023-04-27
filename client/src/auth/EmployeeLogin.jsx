import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Keyboard from '../components/Keyboard';

const EmployeeLogin = () => {
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuthenticated =true 

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPassword(numericValue);
  };

  /*useEffect(()=>{
    if(isAuthenticated){
      navigate('../pos')
    }
  })*/

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      <div className="">
        <div className="w-full px-6 py-8 ">
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            placeholder="enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <Keyboard value={password} onChange={setPassword} />
    </div>
  );
};

export default EmployeeLogin;
