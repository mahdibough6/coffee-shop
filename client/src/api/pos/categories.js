import posApi  from './posApi';

export const fetchCategories = async (coffeeShopId)=>{
  try{
    const response = await posApi.get(`api/product-categories/coffee-shops/${coffeeShopId}`)
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}