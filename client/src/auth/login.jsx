import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const SingleEmployee = ({ empl, handleSelect }) => {
  return (
    <div
      onClick={() => handleSelect(empl.username)}
      className=" bg-gray-400 rounded-md m-2 inline-block  p-3 cursor-pointer hover:bg-gray-300"
    >
      <span>{empl.username}</span>
    </div>
  );
};

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [employee, setEmployee] = useState({
    id: null,
    first: null,
    tel: null,
    username: null,
    pwd: null,
    role: null,
  });
  const [listOfEmployees, setListOfEmployees] = useState([]);
  function updateToken(newToken) {
    // Save the new JWT token to local storage
    localStorage.setItem('jwtToken', newToken);
    // Update the state with the new token
    setJwtToken(newToken);
  }
  const checkCredentials = async () => {
    try {
      const res = await axios.post(`${apiUrl}login/employee`, {
        username,
        password,
      });
      const { token, employee: empData } = res.data;

      if(token && empData){
        updateToken(token);
        setEmployee(empData);
      }
    } catch (err) {
      console.error('error getting the token!', err);
    }
  };

  useEffect(() => {
    checkCredentials();
  }, [password]); 
  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}api/employees`);
        console.log('response :', res.data);
        setListOfEmployees(res.data.employees);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  const handleClear = () => {
    setPassword('');
  };

  const handleRemove = () => {
    setPassword(password.slice(0, -1));
  };

  const handleNumberClick = (number) => {
    setPassword(password + number);
  };
  const handleSelect = (username) => {
    setUsername(username);
    console.log(username);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      {jwtToken && <Navigate to="../resto" state={{ employee }} replace />}
      <div className="">
        {/* TODO username need to be displayed here */}
        <div>
          {listOfEmployees.map((empl) => (
            <SingleEmployee
              empl={empl}
              handleSelect={handleSelect}
              key={empl.id}
            />
          ))}
        </div>
        <div className="w-full px-6 py-8 ">
          <input
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <br />
        <div className="grid grid-cols-3 ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className="mb-number-btn"
            >
              {number}
            </button>
          ))}
          <button onClick={handleClear}>Clear</button>
          <button
            onClick={() => handleNumberClick(0)}
            className="mb-number-btn"
          >
            0
          </button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
