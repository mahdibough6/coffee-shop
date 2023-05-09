import axios from "axios"; 
import clientApi from './clientApi'
const API_BASE_URL = import.meta.env.VITE_API_URL

export async function createCategory(data) {

  const formData = data;
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const jwt = localStorage.getItem('jwtClient');
  try {
    const response = await axios.post(`${API_BASE_URL}api/product-categories`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt}`,
      },
    })
    console.log("response ::::")
    console.log(response);
    return response;

  } catch (error) {
    console.error('Failed to create category:', error);
    throw new Error('Failed to create category');
  }
}
export const fetchCategories = async (coffeeShopId)=>{
  try{
    const response = await clientApi.get(`api/product-categories/coffee-shops/${coffeeShopId}`)
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
};