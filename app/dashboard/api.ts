import { type Order } from "@/utils/mockData"
import axios from 'axios';

export const getOrders = async (restaurantId: string): Promise<Order[]> => {
  try {
    const response = await axios.get(`/api/orderList?restaurant_id=${restaurantId}`);
    const data = response.data;

    // Map the API response to the Order type, parsing date strings into Date objects
    const orders: Order[] = data.map((item: any) => ({
      orderId: item.order_id,
      timestamp: new Date(item.created_at),
      total: parseFloat(item.total_amount),
      status: item.order_status,
      customerName: item.user_name,
      items: item.items,
      lastStatusChange: new Date(item.updated_at),
      deliveryMethod: item.order_type,
      chatTranscript: JSON.parse(item.conversation_history || "[]"), // Parse conversation_history
      deliveryAddress: item.delivery_address,
    }));

    return orders;
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    throw error; // Re-throw the error so the component can handle it
  }
}

export const updateOrderStatus = async (orderId: number, newStatus: Order["status"]) => {
  try {
    await axios.post('/api/update_order_status', {
      order_id: orderId,
      order_status: newStatus,
    });
  } catch (error: any) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};
