import axiosInstance from './axiosInstance';

export const fetchEmployees = async (coffeeShopKey) => {
  try {
    const response = await axiosInstance.post(`/protected/employees`, 
      {
        coffeeShopKey,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const authenticate = async (coffeeShopKey, username, password) => {
  try {
    const response = await axiosInstance.post(`/login`, 
      {
        coffeeShopKey,
        username,
        password
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authenticateClient = async (username, password) => {
  try {
    const response = await axiosInstance.post(`/client-login`, 
      {
        username,
        password
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


