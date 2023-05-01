import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NumPad from '../components/NumPad';
import usePOSStore from '../store/POSStore'
import { authenticate } from '../api/coffeeShopAPI';


const EmployeeLogin = () => {
  const {
    employees,
    coffeeShopKey,
    currentEmployee,
    setCurrentEmployee
  } = usePOSStore()


  console.log("employees length:", employees.length);

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuthenticated = true 

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setPassword(numericValue);
  };

  useEffect(() => {
const handleAuthentication = async () => {
  try {

    console.log(coffeeShopKey, currentEmployee.username, password);
    const response = await authenticate(coffeeShopKey, currentEmployee.username, password);
    if (response.status === 200) {
      const token = response.data.token; // assuming that the JWT is returned in the response as a 'token' field
      localStorage.setItem('jwt', token);
      console.log("login in +++++++++++++++++++++++++++++++++++")
      navigate('../pos');

    } else {
      console.error('Authentication failed');
    }
  } catch (error) {
    console.error(error);
  }
};
handleAuthentication();
}, [currentEmployee.username, password]);

  return (
    <div className='grid grid-cols-2 test  h-screen '>
    <div className='test2'>here is the our logo</div>
    <div className="test2 w-[450px] mx-auto flex flex-col ">
      <div>
      <EmployeeSelection
        employees={employees}
        currentEmployee={currentEmployee}
        setCurrentEmployee={setCurrentEmployee}
      />
      </div>
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
      <NumPad value={password} onChange={setPassword} />

      <div className=''>
        <div 
        className='bg-red-400 inline p-6 text-white '
        onClick={()=>console.log("close")}
        >close</div>
      </div>
    </div>
</div>
  );
};

const EmployeeSelection = ({ employees, currentEmployee, setCurrentEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentEmployee(employee);
  };

  const getColor = (firstName, lastName) => {
    const initials = firstName.charAt(0) + lastName.charAt(0);
    const colors = [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    const index = (initials.charCodeAt(0) + initials.charCodeAt(1)) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Select an employee</h1>
      <div className="grid grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={`rounded-md p-4 cursor-pointer transition-all duration-200 ${
              selectedEmployee && selectedEmployee.id === employee.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-black hover:bg-blue-200'
            }`}
            onClick={() => handleClick(employee)}
          >
            <div
              className={`${getColor(employee.first, employee.last)} text-white w-32 h-32 rounded-full mx-auto mb-2 flex justify-center items-center`}
            >
              <span className="text-xl font-bold">
                {`${employee.first.charAt(0)}${employee.last.charAt(0)}`}
              </span>
            </div>
            <h2 className="text-xl font-bold">{`${employee.first} ${employee.last}`}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EmployeeLogin;
