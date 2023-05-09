import clientApi from "./clientApi";

export const getEmployees = async (coffeeShopId) =>{
  try {
    const response = await clientApi.post(`protected/pos-employees`, 
      {
        coffeeShopId
      }
    );
    return response.data;
  } catch (error) {
    console.error("!!! cannote retrieve data !!!",error);
    throw error;
  }
}