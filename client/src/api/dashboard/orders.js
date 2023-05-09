import clientApi from './clientApi';

export const fetchOrderedProducts = async (orderId) => {
    try {
      const response = await clientApi.get(`api/orders/${orderId}/ordered-products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ordered products:', error);
      throw error;
    }
  };