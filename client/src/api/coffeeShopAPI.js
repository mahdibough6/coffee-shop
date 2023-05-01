import axiosInstance from './axiosInstance';
import api from './api';

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

export const fetchCategories = async (coffeeShopId)=>{
  try{
    const response = await api.get(`api/product-categories/coffee-shops/${coffeeShopId}`)
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}

export const fetchProducts = async (coffeeShopId, productCategoryId)=>{
  try{
    const response = await api.get(`api/products/coffee-shops/${coffeeShopId}/product-categories/${productCategoryId}`)
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}

export const getKitchenByProductId = async  (productId) =>{
  try {
    const response = await api.get(`/api/kitchens/products/${productId}`);
    return response;

  } catch (error) {
    console.error('Error getting kitchen id:', error);
    throw new Error('Error getting kitchen id');
  }
}

//export const createOrderedProduct = async (productId, qte, orderId)

