import { useState } from 'react';
import { authenticateClient } from '@api/dashboard/auth';
import { useNavigate } from 'react-router-dom';
import useClientStore from '@store/clientStore';

const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setClient, setCoffeeShopId } = useClientStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticateClient(username, password);
      const { token, client, coffeeShopId } = response.data;
      if (token && client) {
        setClient(client);
        setCoffeeShopId(coffeeShopId);
        localStorage.setItem('jwtClient', token);
        navigate('/pm-panel/dashboard/products');
      }

      console.log(response.data);
      // handle successful login here
    } catch (error) {
      console.error(error);
      // handle login error here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl mb-8 font-bold text-center">Login</h1>
        <label className="block mb-2">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default ClientLogin;
