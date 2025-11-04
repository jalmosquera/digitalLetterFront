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
      street: 'Calle',
      houseNumber: 'Número',
      location: 'Localidad',
      ardales: 'Ardales',
      carratraca: 'Carratraca',
      notes: '📝 *Notas:*',
      order: '🍕 *Pedido:*',
      quantity: 'Cantidad',
      unitPrice: 'Precio unitario',
      subtotal: 'Subtotal',
      ingredients: 'Ingredientes',
      additionalIngredients: 'Ingredientes adicionales',
      total: '💰 *TOTAL:*',
    },
    en: {
      title: '🛒 *NEW ORDER*',
      customer: '👤 *Customer:*',
      phone: '📱 *Phone:*',
      delivery: '📍 *Delivery Address:*',
      street: 'Street',
      houseNumber: 'Number',
      location: 'Location',
      ardales: 'Ardales',
      carratraca: 'Carratraca',
      notes: '📝 *Notes:*',
      order: '🍕 *Order:*',
      quantity: 'Quantity',
      unitPrice: 'Unit price',
      subtotal: 'Subtotal',
      ingredients: 'Ingredients',
      additionalIngredients: 'Additional ingredients',
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
  message += `${t.street}: ${deliveryInfo.delivery_street}\n`;
  message += `${t.houseNumber}: ${deliveryInfo.delivery_house_number}\n`;

  // Location with translation
  const locationText = deliveryInfo.delivery_location === 'ardales' ? t.ardales : t.carratraca;
  message += `${t.location}: ${locationText}\n`;

  // Notes
  if (deliveryInfo.notes) {
    message += `\n${t.notes} ${deliveryInfo.notes}\n`;
  }

  // Order items
  message += `\n${t.order}\n`;
  message += '━━━━━━━━━━━━━━━━━━━━\n';

  items.forEach((item, index) => {
    const productName = getTranslation(item.product.translations, 'name') || 'Sin nombre';

    // Calculate base price
    const basePrice = parseFloat(item.product.price) || 0;

    // Calculate extras price
    let extrasPrice = 0;
    if (item.customization?.selectedExtras) {
      extrasPrice = item.customization.selectedExtras.reduce((sum, extra) => {
        return sum + (parseFloat(extra.price) || 0);
      }, 0);
    }

    // Total price per unit (base + extras)
    const pricePerUnit = basePrice + extrasPrice;
    const itemSubtotal = pricePerUnit * item.quantity;

    message += `${index + 1}. *${productName}*\n`;
    message += `   ${t.quantity}: ${item.quantity}\n`;
    message += `   ${t.unitPrice}: €${pricePerUnit.toFixed(2)}\n`;
    if (extrasPrice > 0) {
      message += `   (Base: €${basePrice.toFixed(2)} + Extras: €${extrasPrice.toFixed(2)})\n`;
    }
    message += `   ${t.subtotal}: €${itemSubtotal.toFixed(2)}\n`;

    // Add ingredient customization if customer deselected any
    if (item.customization) {
      const { selectedIngredients, selectedExtras, additionalNotes } = item.customization;
      const totalIngredients = item.product.ingredients?.length || 0;

      // Only show ingredients if customer deselected any
      if (selectedIngredients && selectedIngredients.length < totalIngredients && totalIngredients > 0) {
        const selectedIngredientNames = item.product.ingredients
          .filter(ing => selectedIngredients.includes(ing.id))
          .map(ing => getTranslation(ing.translations, 'name'))
          .join(', ');

        if (selectedIngredientNames) {
          message += `   ${t.ingredients}: ${selectedIngredientNames}\n`;
        }
      }

      // Add extra ingredients if selected
      if (selectedExtras && selectedExtras.length > 0) {
        const extrasText = selectedExtras
          .map(extra => `${getTranslation(extra.translations, 'name')} (+€${parseFloat(extra.price).toFixed(2)})`)
          .join(', ');
        message += `   🌟 Extras: ${extrasText}\n`;
      }

      // Add additional ingredients if provided
      if (additionalNotes && additionalNotes.trim()) {
        message += `   ${t.additionalIngredients}: ${additionalNotes}\n`;
      }
    }

    message += '\n';
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
