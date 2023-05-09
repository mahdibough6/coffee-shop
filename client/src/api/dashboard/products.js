import clientApi from "./clientApi";
import axios from 'axios';

export async function createProduct(data) {

  const formData = data;
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const jwt = localStorage.getItem('jwtClient');
  try {
    const response = await axios.post(`api/products`, data, {
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${jwt}`,
      },
    })
    console.log("response ::::")
    console.log(response);
    return response;

  } catch (error) {
    console.error('Failed to create product:', error);
    throw new Error('Failed to create product');
  }
}




export async function fetchProductsWithPagination(page = 1, pageSize = 10, coffeeShopId) {
  try {
    const response = await clientApi.get(`api/products/with-pagination`, {
      params: {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        coffeeShopId
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
}