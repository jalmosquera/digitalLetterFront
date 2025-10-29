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
import { useState } from 'react';
import useFetch from '@/shared/hooks/useFetch';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Fetch del producto
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`/api/products/${id}/`);

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

  // Manejar agregar al carrito
  const handleAddToCart = () => {
    // TODO: Implementar funcionalidad de carrito
    console.log('Agregar al carrito:', { product: productData, quantity });
    alert(`${quantity} ${productData.name} agregado al carrito`);
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

  // Extraer datos de traducción (priorizar español)
  const name = translations?.es?.name || translations?.en?.name || 'Sin nombre';
  const description = translations?.es?.description || translations?.en?.description || '';

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
          <span className="font-gabarito font-semibold">Volver</span>
        </button>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen del producto */}
          <div className="relative">
            <div className="card-pepper overflow-hidden relative bg-white dark:bg-gray-800">
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
                className={`w-full h-auto object-cover ${
                  !available ? 'opacity-60 grayscale' : ''
                }`}
                style={{ aspectRatio: '16/9' }}
              />
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
                    {category.translations?.es?.name || category.translations?.en?.name || 'Sin categoría'}
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

            {/* Ingredientes */}
            {ingredients && ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-gabarito font-bold text-xl text-pepper-charcoal dark:text-white mb-3">
                  Ingredientes:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={ingredient.id || index}
                      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-pepper-gray-light dark:border-gray-600 hover:border-pepper-orange transition-colors"
                    >
                      <span className="text-2xl">{ingredient.icon}</span>
                      <span className="font-gabarito font-semibold text-pepper-charcoal dark:text-white">
                        {ingredient.translations?.es?.name || ingredient.translations?.en?.name || 'Ingrediente'}
                      </span>
                    </div>
                  ))}
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
    </div>
  );
};

export default ProductDetailPage;
