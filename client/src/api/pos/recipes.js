import posApi  from './posApi';

export const latestOngoingRecipe = async(coffeeShopId, employeeId)=>{
  try{
    const response = await posApi.get(`api/recipes/coffee-shops/${coffeeShopId}/employees/${employeeId}/latest-recipe`)
    return response.data;
  }catch(error){
    console.error('Error getting the latest ongoing recipe :', error)
    throw new Error('Error getting the latest ongoing recipe ')
  }
}
export const getRecipeOrders = async (coffeeShopId, recipeId) => {
  try {
    const response = await posApi.get(
      `/api/orders/coffee-shops/${coffeeShopId}/recipes/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting the recipe orders:', error);
    throw new Error('Error getting the recipe orders');
  }
};

export const finishRecipe = async (coffeeShopId, recipeId, totalPrice) => {
  try {
    const response = await posApi.put(
      `api/recipes/coffee-shops/${coffeeShopId}/recipes/${recipeId}/finish-recipe`,
      { totalPrice: totalPrice }
    );
    return response.data;
  } catch (error) {
    console.error('Error finishing the recipe:', error);
    throw new Error('Error finishing the recipe');
  }
};
