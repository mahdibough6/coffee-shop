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
export const getKitchenById= async  (kitchenId) =>{
  try {
    const response = await api.get(`/api/kitchens/${kitchenId}`);
    return response;

  } catch (error) {
    console.error('Error getting kitchen id:', error);
    throw new Error('Error getting kitchen id');
  }
}
//export const createOrderedProduct = async (productId, qte, orderId)

export const latestOngoingRecipe = async(coffeeShopId, employeeId)=>{
  try{
    const response = await api.get(`api/recipes/coffee-shops/${coffeeShopId}/employees/${employeeId}/latest-recipe`)
    return response.data;
  }catch(error){
    console.error('Error getting the latest ongoing recipe :', error)
    throw new Error('Error getting the latest ongoing recipe ')
  }
}

export async function createOrder(data) {
  try {
    const response = await api.post('api/orders', data);

    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}
export async function createOrderedProduct(data){
  try {
    const response = await api.post('api/ordered-products', data);

    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}

