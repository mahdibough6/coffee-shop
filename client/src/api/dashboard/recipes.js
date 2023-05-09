import clientApi from './clientApi'




export const fetchFinishedRecipes = async (coffeeShopId, page, limit, startDate, endDate) => {
  try {
    const response = await clientApi.get(`api/coffee-shops/${coffeeShopId}/finished-recipes`, {
      params: {
        page,
        limit,
        startDate,
        endDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching finished recipes:', error);
    throw error;
  }
};

