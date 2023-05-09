import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NumPad from './NumPad';
import usePosStore from '../../store/posStore';
import { authenticate, getEmployees } from '../../api/pos/auth';
import { Avatar } from 'antd';
import { stringToColor } from '../../utils/helpers';
import usePosAuthStore from '../../store/posAuthStore';
import shutdownIcon from '@assets/on-off-button.png';
import pubMarocLogo from '@assets/pub-maroc.ico';
import axios from 'axios';

const EmployeeLogin = () => {
  const { coffeeShopId } = usePosAuthStore();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: null,
    username: null,
    role: null,
  });
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const posJwt = localStorage.getItem('posJwt');
  const { login, isAuthenticated } = usePosAuthStore();

  useEffect(() => {
    if (coffeeShopId) {
      console.log('coffeShopId');
      const fetchEmployeesData = async () => {
        setIsLoading(true);
        try {
          const employeesData = await getEmployees(coffeeShopId);
          setEmployees(employeesData);
        } catch (error) {
          console.error('Error fetching employees data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEmployeesData();
    }
  }, []);

  useEffect(() => {
    const handleAuthentication = async () => {
      setIsLoading(true);
      try {
        const response = await authenticate(
          coffeeShopId,
          employee.username,
          password
        );

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('posJwt', token);
          login(employee.id, employee.username, employee.role);
          navigate('/pos');
        } else {
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error authenticating:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthentication();
  }, [employee, password, coffeeShopId]);

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPassword(numericValue);
  };
  const handleClose = async (e) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/system-utils/shutdown'
      );
      if (response.status === 200) {
        console.log('close');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen ">
      <div
        className="bg-red-[] flex flex-col justify-center  "
        style={{ backgroundColor: '#00833E' }}
      >
        <div className="flex-1 "></div>
        <div style={{ height: '300px' }} className="flex justify-center">
          <img src={pubMarocLogo} alt="" srcset="" />
        </div>

        <div className="flex-1"></div>
      </div>
      <div className=" w-[450px] mx-auto flex flex-col p-2">
        <div className="flex-1"></div>
        <div>
          <EmployeeSelection employees={employees} setEmployee={setEmployee} />
          <div className="w-full px-6 py-8">
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
          <NumPad value={password} onChange={setPassword} />
          <div className="text-center p-9 mb-4">
            <div className="   text-white ">
              <div
                onClick={handleClose}
                className="flex bg-red-400 mx-auto h-[80px] w-[80px] justify-center align-middle rounded-full py-3"
              >
                <img src={shutdownIcon} width={'55px'} height={'40px'} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

const EmployeeSelection = ({ employees = [], setEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClick = (employee) => {
    setSelectedEmployee(employee);
    setEmployee(employee);
  };

  return (
    <div className="grid grid-flow-col overflow-auto">
      {Array.isArray(employees) &&
        employees.map((employee) => {
          const bgColor = stringToColor(employee.username);
          return (
            <div
              key={employee.id}
              className={`rounded-md w-[100px] p-4 cursor-pointer transition-all duration-200 ${
                selectedEmployee && selectedEmployee.id === employee.id
                  ? 'bg-blue-200 text-white'
                  : 'bg-white text-black hover:bg-blue-200'
              }`}
              style={{
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
              }}
              onClick={() => handleClick(employee)}
            >
              <Avatar
                className="mx-auto mb-2  flex justify-center items-center"
                style={{ backgroundColor: bgColor }}
                size={64}
              >
                {employee.username[0].toUpperCase()}
              </Avatar>
              <h2 className="text-xl font-bold text-center">
                {employee.username}
              </h2>
            </div>
          );
        })}
    </div>
  );
};

export default EmployeeLogin;
