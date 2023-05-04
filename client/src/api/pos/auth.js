import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});

export const authenticate = async (coffeeShopId, username, password) => {
  try {
    const response = await api.post(`/pos-login`, 
      {
        coffeeShopId,
        username,
        password
      }
    );
    console.log("response data for the authenticate function :", response.data)
    return response;
  } catch (error) {
    console.error("!!! cannot login !!!",error);
    throw error;
  }
};

export const getEmployees = async (coffeeShopId) =>{
  try {
    const response = await api.post(`protected/pos-employees`, 
      {
        coffeeShopId
      }
    );
    return response.data;
  } catch (error) {
    console.error("!!! cannote retrieve data !!!",error);
    throw error;
  }
}
