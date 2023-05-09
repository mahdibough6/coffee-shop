import posApi  from './posApi';

export const fetchProducts = async (coffeeShopId, productCategoryId)=>{
  try{
    const response = await posApi.get(`api/products/coffee-shops/${coffeeShopId}/product-categories/${productCategoryId}`)
    return response;
  }catch(error){
    console.log("qifeoqhifemsqfhiopeqshifmequfojeisqfm",error)
    console.error(error);
    throw error;
  }
}