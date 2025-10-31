import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faStar,
  faFire,
  faPlus,
  faMinus,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useFetch from '@/shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useCart } from '@shared/contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { getTranslation, t } = useLanguage();
  const { addToCart } = useCart();

  // Fetch del producto
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`/api/products/${id}/`);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Initialize selected ingredients when product loads (all selected by default)
  useEffect(() => {
    if (productData && productData.ingredients) {
      const allIngredientIds = productData.ingredients.map(ing => ing.id);
      setSelectedIngredients(allIngredientIds);
    }
  }, [productData]);

  // Manejar incremento de cantidad
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // Manejar decremento de cantidad
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredientId) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        return [...prev, ingredientId];
      }
    });
  };

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    const customization = {
      selectedIngredients,
      additionalNotes: additionalNotes.trim(),
    };
    addToCart(productData, quantity, customization);

    // Show success notification
    toast.success(t('cart.addedToCart'), {
      icon: '🛒',
    });

    // Reset to defaults after adding
    setQuantity(1);
    setAdditionalNotes('');
    if (productData && productData.ingredients) {
      const allIngredientIds = productData.ingredients.map(ing => ing.id);
      setSelectedIngredients(allIngredientIds);
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-pepper-orange border-t-transparent"></div>
          <p className="font-gabarito font-semibold text-xl text-pepper-charcoal mt-4">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-gabarito font-bold text-2xl text-pepper-charcoal mb-2">
            Producto no encontrado
          </h3>
          <p className="font-inter text-gray-600 mb-6">
            {error || 'El producto que buscas no existe.'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-pepper-primary"
          >
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const {
    translations,
    price,
    image,
    is_popular = false,
    is_new = false,
    available = true,
    categories = [],
    ingredients = [],
  } = productData;

  // Extraer datos de traducción usando el idioma actual
  const name = getTranslation(translations, 'name') || 'Sin nombre';
  const description = getTranslation(translations, 'description') || '';

  // Imagen placeholder
  const productImage = image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="%23999"%3ESin Imagen%3C/text%3E%3C/svg%3E';

  // El precio ya viene formateado desde la API como string (ej: "7487.00 €")
  const formattedPrice = price;

  // Para calcular el total, necesitamos extraer el número del string
  const priceNumber = parseFloat(price?.replace(/[^\d.]/g, '') || 0);
  const totalPrice = priceNumber * quantity + ' €';



  
  return (
    <div className="min-h-screen bg-pepper-light dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container-pepper">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-pepper-orange hover:text-pepper-charcoal dark:hover:text-white transition-colors mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="font-gabarito font-semibold"></span>
        </button>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del producto */}
          <div className="relative">
            <div
              className="card-pepper overflow-hidden relative bg-white dark:bg-gray-800 cursor-pointer group/image"
              onClick={() => setIsImageModalOpen(true)}
            >
              {/* Badges */}
              {(is_popular || is_new) && (
                <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                  {is_popular && (
                    <span className="inline-flex items-center space-x-1 bg-pepper-orange text-white px-3 py-2 rounded-full text-sm font-gabarito font-semibold shadow-lg">
                      <FontAwesomeIcon icon={faFire} className="text-xs" />
                      <span>Popular</span>
                    </span>
                  )}
                  {is_new && (
                    <span className="inline-flex items-center space-x-1 bg-pepper-yellow text-white px-3 py-2 rounded-full text-sm font-gabarito font-semibold shadow-lg">
                      <FontAwesomeIcon icon={faStar} className="text-xs" />
                      <span>Nuevo</span>
                    </span>
                  )}
                </div>
              )}

              {/* Badge no disponible */}
              {!available && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-gabarito font-semibold shadow-lg">
                    Agotado
                  </span>
                </div>
              )}

              <img
                src={productImage}
                alt={name}
                className={`w-full h-auto object-cover transition-transform duration-300 group-hover/image:scale-105 ${
                  !available ? 'opacity-60 grayscale' : ''
                }`}
                style={{ aspectRatio: '16/9' }}
              />

              {/* Overlay hover indicator */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover/image:opacity-10 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-full p-3 opacity-0 group-hover/image:opacity-100 transform scale-75 group-hover/image:scale-100 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-pepper-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            {/* Categorías */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block px-3 py-1 bg-white dark:bg-gray-800 text-pepper-orange text-sm font-gabarito font-semibold rounded-full border-2 border-pepper-orange"
                  >
                    {getTranslation(category.translations, 'name') || 'Sin categoría'}
                  </span>
                ))}
              </div>
            )}

            {/* Nombre */}
            <h1 className="font-gabarito font-black text-3xl md:text-4xl lg:text-5xl text-pepper-charcoal dark:text-white mb-4">
              {name}
            </h1>

            {/* Descripción */}
            {description && (
              <p className="font-inter text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Ingredientes con checkboxes */}
            {ingredients && ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-gabarito font-bold text-xl text-pepper-charcoal dark:text-white mb-3">
                  {t('productDetail.ingredients')}:
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {t('productDetail.selectIngredients')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {ingredients.map((ingredient, index) => {
                    const ingredientName = getTranslation(ingredient.translations, 'name') || 'Ingrediente';
                    const isSelected = selectedIngredients.includes(ingredient.id);

                    return (
                      <label
                        key={ingredient.id || index}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-pepper-orange border-pepper-orange text-white'
                            : 'bg-white dark:bg-gray-800 border-pepper-gray-light dark:border-gray-600 text-pepper-charcoal dark:text-white hover:border-pepper-orange'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleIngredient(ingredient.id)}
                          className="w-4 h-4 rounded border-gray-300 text-pepper-orange focus:ring-pepper-orange"
                        />
                        <span className="text-2xl">{ingredient.icon}</span>
                        <span className="font-gabarito font-semibold">
                          {ingredientName}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Campo para ingredientes adicionales */}
                <div className="mt-4">
                  <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">
                    <span className="inline-block bg-yellow-200 dark:bg-yellow-500/30 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg leading-relaxed text-justify">
                      {t('productDetail.additionalIngredients')}
                    </span>
                  </label>
                  <input
                    id="additionalNotes"
                    type="text"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder={t('productDetail.additionalIngredientsPlaceholder')}
                    className="w-full px-4 py-2 border-2 border-pepper-gray-light dark:border-gray-600 rounded-lg focus:border-pepper-orange focus:outline-none dark:bg-gray-800 dark:text-white transition-colors "
                  />
                </div>
              </div>
            )}

            {/* Precio */}
            <div className="mb-8">
              <span className="font-gabarito font-black text-4xl text-pepper-orange">
                {formattedPrice}
              </span>
            </div>

            {/* Selector de cantidad y botón agregar */}
            {available ? (
              <div className="space-y-4">
                {/* Selector de cantidad */}
                <div className="flex items-center space-x-4">
                  <span className="font-gabarito font-semibold text-pepper-charcoal dark:text-white">
                    Cantidad:
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleDecrement}
                      className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-pepper-gray-light dark:border-gray-600 rounded-lg hover:border-pepper-orange transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-pepper-charcoal dark:text-white" />
                    </button>
                    <span className="font-gabarito font-bold text-2xl text-pepper-charcoal dark:text-white min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-pepper-gray-light dark:border-gray-600 rounded-lg hover:border-pepper-orange transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-pepper-charcoal dark:text-white" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-pepper-gray-light dark:border-gray-600">
                  <span className="font-gabarito font-semibold text-lg text-pepper-charcoal dark:text-white">
                    Total:
                  </span>
                  <span className="font-gabarito font-black text-2xl text-pepper-orange">
                    {totalPrice}
                  </span>
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-pepper-orange text-white rounded-lg font-gabarito font-bold text-lg hover:bg-opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Agregar al carrito</span>
                </button>
              </div>
            ) : (
              <div className="py-6 px-8 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                <p className="font-gabarito font-bold text-xl text-gray-600 dark:text-gray-300">
                  Este producto no está disponible en este momento
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal with Blur Background */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-pepper-orange transition-colors p-2"
              aria-label="Cerrar"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={productImage}
              alt={name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="font-gabarito font-bold text-2xl text-white">
                {name}
              </h3>
              {description && (
                <p className="font-inter text-sm text-gray-200 mt-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
