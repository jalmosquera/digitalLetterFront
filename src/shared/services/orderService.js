import axios from 'axios';
import { getAuthHeaders } from '@shared/utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Create a new order in the database
 * @param {Object} orderData - Order data
 * @param {Array} orderData.items - Cart items with product and quantity
 * @param {Object} orderData.deliveryInfo - Delivery information
 * @returns {Promise} - Created order response
 */
export const createOrder = async ({ items, deliveryInfo }) => {
  try {
    // Transform cart items to the format expected by backend
    const orderItems = items.map(item => ({
      product: item.product.id,
      quantity: item.quantity,
    }));

    // Prepare order data for backend
    const orderPayload = {
      delivery_street: deliveryInfo.delivery_street,
      delivery_house_number: deliveryInfo.delivery_house_number,
      delivery_location: deliveryInfo.delivery_location,
      phone: deliveryInfo.phone,
      notes: deliveryInfo.notes || '',
      items: orderItems,
    };

    const response = await axios.post(
      `${API_URL}/api/orders/`,
      orderPayload,
      {
        headers: getAuthHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Get all orders for the authenticated user
 * @returns {Promise} - List of orders
 */
export const getOrders = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/orders/`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Get a specific order by ID
 * @param {number} orderId - Order ID
 * @returns {Promise} - Order details
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/orders/${orderId}/`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
