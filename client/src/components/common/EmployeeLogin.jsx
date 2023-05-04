import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NumPad from './NumPad';
import usePosStore from '../../store/posStore';
import { authenticate, getEmployees } from '../../api/pos/auth';
import { Avatar } from 'antd';
import { stringToColor } from '../../utils/helpers';
import usePosAuthStore from '../../store/posAuthStore';

const EmployeeLogin = () => {
  const { coffeeShopId } = usePosAuthStore();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({ id: null, username: null, role: null });
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const posJwt = localStorage.getItem('posJwt');
  const { login, isAuthenticated } = usePosAuthStore();

  useEffect(() => {
    if (coffeeShopId) {
      console.log("coffeShopId")
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
          login(employee.id, employee.username , employee.role)
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
      }, [employee, password, coffeeShopId ]);


  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPassword(numericValue);
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div>here is our logo</div>
      <div className="w-[450px] mx-auto flex flex-col">
        <EmployeeSelection
          employees={employees}
          setEmployee={setEmployee}
        />
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
        <div className='text-center p-9 mb-4'>
          <div
            className="bg-red-400 inline rounded-pill  p-9 mb-4 text-white "
            onClick={() => console.log('close')}
          >
            close
          </div>
        </div>
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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Select an employee</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(employees) &&
          employees.map((employee) => {
            const bgColor = stringToColor(employee.username);
            return (
              <div
                key={employee.id}
                className={`rounded-md p-4 cursor-pointer transition-all duration-200 ${
                  selectedEmployee && selectedEmployee.id === employee.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-black hover:bg-blue-200'
                }`}
                onClick={() => handleClick(employee)}
              >
                <Avatar
                  className="mx-auto mb-2 flex justify-center items-center"
                  style={{ backgroundColor: bgColor }}
                  size={64}
                >
                  {employee.username[0].toUpperCase()}
                </Avatar>
                <h2 className="text-xl font-bold">{employee.username}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

  export default EmployeeLogin;