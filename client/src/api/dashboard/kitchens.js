import clientApi from "./clientApi";


export const fetchKitchens = async (coffeeShopId)=>{
  try{
    const response = await clientApi.get(`api/kitchens/coffee-shops/${coffeeShopId}`)
    return response;
  }catch(error){
    throw error;
  }
}