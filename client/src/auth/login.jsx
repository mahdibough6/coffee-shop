import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      // handle login failure
      console.log("hell no !")
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      <div className="md:flex">
        <div className="w-full px-6 py-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-900">
            Login to Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Enter your username and password below.
          </p>
          <form className="mt-4" onSubmit={handleSubmit}>
            <label
              className="block font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              className="block mt-3 font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
           
           
            <input
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="block w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
