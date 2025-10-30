import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '@shared/contexts/CartContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAuth } from '@shared/contexts/AuthContext';
import { sendOrderViaWhatsApp } from '@shared/services/whatsappService';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { t, getTranslation, language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    delivery_address: '',
    delivery_location: '',
    delivery_province: '',
    phone: user?.phone || '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated or cart is empty
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const totalPrice = getTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!deliveryInfo.delivery_address.trim()) {
      newErrors.delivery_address = t('auth.requiredField');
    }

    if (!deliveryInfo.delivery_location.trim()) {
      newErrors.delivery_location = t('auth.requiredField');
    }

    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = t('auth.requiredField');
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        items,
        deliveryInfo,
        user,
        totalPrice,
      };

      // Send via WhatsApp
      sendOrderViaWhatsApp(orderData, language, getTranslation);

      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error sending order:', error);
      alert(t('checkout.orderError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-pepper">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-pepper-orange hover:text-pepper-orange-dark mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            {t('productDetail.back')}
          </button>
          <h1 className="text-3xl lg:text-4xl font-gabarito font-bold text-pepper-charcoal dark:text-white">
            {t('checkout.title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="font-gabarito font-bold text-xl text-pepper-charcoal dark:text-white mb-6">
                {t('checkout.deliveryInfo')}
              </h2>

              <div className="space-y-4">
                {/* Delivery Address */}
                <div>
                  <label
                    htmlFor="delivery_address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('checkout.deliveryAddress')} *
                  </label>
                  <input
                    id="delivery_address"
                    name="delivery_address"
                    type="text"
                    value={deliveryInfo.delivery_address}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.delivery_address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 transition-colors`}
                    placeholder={t('checkout.addressPlaceholder')}
                  />
                  {errors.delivery_address && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.delivery_address}
                    </p>
                  )}
                </div>

                {/* Delivery Location */}
                <div>
                  <label
                    htmlFor="delivery_location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('checkout.deliveryLocation')} *
                  </label>
                  <input
                    id="delivery_location"
                    name="delivery_location"
                    type="text"
                    value={deliveryInfo.delivery_location}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.delivery_location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 transition-colors`}
                    placeholder={t('checkout.locationPlaceholder')}
                  />
                  {errors.delivery_location && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.delivery_location}
                    </p>
                  )}
                </div>

                {/* Delivery Province */}
                <div>
                  <label
                    htmlFor="delivery_province"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('checkout.deliveryProvince')}
                  </label>
                  <input
                    id="delivery_province"
                    name="delivery_province"
                    type="text"
                    value={deliveryInfo.delivery_province}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 transition-colors"
                    placeholder={t('checkout.provincePlaceholder')}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('auth.phoneNumber')} *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={deliveryInfo.phone}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 transition-colors`}
                    placeholder={t('auth.phonePlaceholder')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t('checkout.notes')}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={deliveryInfo.notes}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 transition-colors resize-none"
                    placeholder={t('checkout.notesPlaceholder')}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('checkout.sending')}
                    </span>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-lg" />
                      {t('checkout.sendOrder')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="font-gabarito font-bold text-xl text-pepper-charcoal dark:text-white mb-6">
                {t('checkout.orderSummary')}
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => {
                  const name = getTranslation(product.translations, 'name') || 'Sin nombre';
                  const price = parseFloat(product.price) || 0;
                  const subtotal = price * quantity;

                  return (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {quantity}x {name}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between font-gabarito font-bold text-xl text-pepper-charcoal dark:text-white">
                  <span>{t('cart.total')}</span>
                  <span className="text-pepper-orange">€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
