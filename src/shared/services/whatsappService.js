/**
 * WhatsApp service for sending orders
 */

const WHATSAPP_NUMBER = '+34623736566'; // User's WhatsApp number

/**
 * Generate bilingual order message based on language
 * @param {Object} orderData - Order information
 * @param {Array} orderData.items - Cart items
 * @param {Object} orderData.deliveryInfo - Delivery information
 * @param {Object} orderData.user - User information
 * @param {string} language - Language code ('es' or 'en')
 * @param {Function} getTranslation - Translation function for product names
 * @returns {string} Formatted WhatsApp message
 */
export const generateOrderMessage = (orderData, language, getTranslation) => {
  const { items, deliveryInfo, user, totalPrice } = orderData;

  const messages = {
    es: {
      title: '🛒 *NUEVO PEDIDO*',
      customer: '👤 *Cliente:*',
      phone: '📱 *Teléfono:*',
      delivery: '📍 *Dirección de Entrega:*',
      address: 'Dirección',
      location: 'Localidad',
      province: 'Provincia',
      notes: '📝 *Notas:*',
      order: '🍕 *Pedido:*',
      quantity: 'Cantidad',
      unitPrice: 'Precio unitario',
      subtotal: 'Subtotal',
      total: '💰 *TOTAL:*',
    },
    en: {
      title: '🛒 *NEW ORDER*',
      customer: '👤 *Customer:*',
      phone: '📱 *Phone:*',
      delivery: '📍 *Delivery Address:*',
      address: 'Address',
      location: 'City',
      province: 'Province',
      notes: '📝 *Notes:*',
      order: '🍕 *Order:*',
      quantity: 'Quantity',
      unitPrice: 'Unit price',
      subtotal: 'Subtotal',
      total: '💰 *TOTAL:*',
    },
  };

  const t = messages[language] || messages.es;

  // Build message
  let message = `${t.title}\n\n`;

  // Customer info
  message += `${t.customer} ${user.name}\n`;
  message += `${t.phone} ${deliveryInfo.phone}\n\n`;

  // Delivery address
  message += `${t.delivery}\n`;
  message += `${t.address}: ${deliveryInfo.delivery_address}\n`;
  message += `${t.location}: ${deliveryInfo.delivery_location}\n`;
  if (deliveryInfo.delivery_province) {
    message += `${t.province}: ${deliveryInfo.delivery_province}\n`;
  }

  // Notes
  if (deliveryInfo.notes) {
    message += `\n${t.notes} ${deliveryInfo.notes}\n`;
  }

  // Order items
  message += `\n${t.order}\n`;
  message += '━━━━━━━━━━━━━━━━━━━━\n';

  items.forEach((item, index) => {
    const productName = getTranslation(item.product.translations, 'name') || 'Sin nombre';
    const price = parseFloat(item.product.price) || 0;
    const itemSubtotal = price * item.quantity;

    message += `${index + 1}. *${productName}*\n`;
    message += `   ${t.quantity}: ${item.quantity}\n`;
    message += `   ${t.unitPrice}: €${price.toFixed(2)}\n`;
    message += `   ${t.subtotal}: €${itemSubtotal.toFixed(2)}\n\n`;
  });

  message += '━━━━━━━━━━━━━━━━━━━━\n';
  message += `${t.total} €${totalPrice.toFixed(2)}`;

  return message;
};

/**
 * Open WhatsApp with pre-filled message
 * @param {string} message - Message to send
 */
export const sendWhatsAppMessage = (message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodedMessage}`;

  // Open WhatsApp in new window
  window.open(whatsappUrl, '_blank');
};

/**
 * Create order and send via WhatsApp
 * @param {Object} orderData - Complete order data
 * @param {string} language - Current language
 * @param {Function} getTranslation - Translation function
 */
export const sendOrderViaWhatsApp = (orderData, language, getTranslation) => {
  const message = generateOrderMessage(orderData, language, getTranslation);
  sendWhatsAppMessage(message);
};

export default {
  generateOrderMessage,
  sendWhatsAppMessage,
  sendOrderViaWhatsApp,
};
