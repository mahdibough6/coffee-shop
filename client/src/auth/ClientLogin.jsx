import { useState } from 'react';
import axios from 'axios';
import { authenticateClient } from '../api/coffeeShopAPI';
import { useNavigate } from 'react-router-dom';
import useClientStore from '../store/clientStore';
const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setClient, setCoffeeShopId} = useClientStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authenticateClient(username, password);
      const {token, client, coffeeShopId} = response.data;
      if(token && client){

        setClient(client);
        setCoffeeShopId(coffeeShopId);
        localStorage.setItem('jwtClient', token);
        navigate('../dashboard');

      }
      
      console.log(response.data);
      // handle successful login here

    } catch (error) {
      console.error(error);
      // handle login error here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default ClientLogin;
