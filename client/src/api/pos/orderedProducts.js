import posApi from "./posApi";


export async function createOrderedProduct(data){
  try {
    const response = await posApi.post('api/ordered-products', data);

    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}