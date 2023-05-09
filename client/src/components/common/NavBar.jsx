import { Avatar } from "antd";
import { useState, useEffect } from "react";
import usePosStore from '../../store/posStore'
import { useNavigate } from "react-router-dom";
import usePosAuthStore from "../../store/posAuthStore";

const NavBar = () => {
  const { logout, employeeRole } = usePosAuthStore();
  const navigation = useNavigate();

  const handleLogout = async () => {
      logout();
      localStorage.removeItem('posJwt')
      navigation('/pos/pos-login');
  };

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () => setDate(new Date());

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Casablanca',
  };

  const dateFormatted = date.toLocaleDateString('en-US', options);
  const timeFormatted = date.toLocaleTimeString('en-US', {
    timeZone: 'Africa/Casablanca',
  });

  return (
    <div className="flex items-center justify-between h-16 bg-white shadow border-b-4 border-green-800">
      <div className="flex items-center" onClick={()=>navigation('/pos')}>
        <img src="/pub-maroc.ico" width="40px" alt="logo" className="ml-4" />
        <div className="border-l border-3 border-gray-400 ml-3 w-3 h-9"></div>
        <span className="text-gray-800 mr-4 text-sm font-bold">{dateFormatted} {timeFormatted}</span>
      </div>
      <div className="flex items-center">
        <Avatar className="bg-green-400 font-bold" size="large" gap={'0'}>
          {employeeRole}
        </Avatar>
        <div className="border-l border-3 border-gray-400 ml-3 w-3 h-9"></div>
        <div
          className="text-red-800 mr-3 bg-red-200 border-2 border-red-400 px-4 py-2 rounded text-sm font-bold"
          onClick={() => handleLogout()}
        >
         LogOut 
        </div>
      </div>
    </div>
  );
};

export default NavBar;
