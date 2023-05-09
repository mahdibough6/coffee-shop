import posApi from "./posApi"



export async function changeKeyValue(coffeeShopId, key, value) {
    try {
      const response = await posApi.put('api/coffee-shop-configs/', {
        coffeeShopId,
        key,
        value,
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  export async function getValue(coffeeShopId, key) {
    try {
      const response = await posApi.get(`api/coffee-shop-configs?coffeeShopId=${coffeeShopId}&key=${key}`);
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  