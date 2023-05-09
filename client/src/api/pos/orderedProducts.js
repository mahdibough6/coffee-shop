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

export async function fetchRecipeSummary(coffeeShopId, recipeId){
  try {
    const response = await posApi.get(`api/ordered-products/coffee-shops/${coffeeShopId}/recipes/${recipeId}`);
    return response.data;

  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}