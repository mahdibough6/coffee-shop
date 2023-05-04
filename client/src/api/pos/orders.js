import posApi from "./posApi";


export async function createOrder(data) {
  try {
    const response = await posApi.post('api/orders', data);

    return response.data;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to create order');
  }
}
export const cancelOrder = async (coffeeShopId, orderId) => {
  try {
    const response = await posApi.put(
      `api/orders/coffee-shops/${coffeeShopId}/orders/${orderId}/cancel-order`
    );
    return response.data;
  } catch (error) {
    console.error('Error canceling the order:', error);
    throw new Error('Error canceling the order');
  }
};