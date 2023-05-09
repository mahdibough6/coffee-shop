import posApi from "./posApi";

export const getKitchenById= async  (kitchenId) =>{
  try {
    const response = await posApi.get(`/api/kitchens/${kitchenId}`);
    return response;

  } catch (error) {
    console.error('Error getting kitchen id:', error);
    throw new Error('Error getting kitchen id');
  }
}