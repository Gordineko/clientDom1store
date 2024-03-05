import { $authHost, $host } from ".";

export const createOrder = async (order) => {
  try {
    const { data } = await $authHost.post("api/order", order);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const { data } = await $host.get("api/order/orders");
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
