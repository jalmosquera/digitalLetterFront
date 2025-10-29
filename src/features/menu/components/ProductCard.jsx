import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFire } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    id,
    translations,
    price,
    image,
    is_popular = false,
    is_new = false,
    available = true,
  } = product;

  // Extraer datos de traducción (priorizar español)
  const name = translations?.es?.name || translations?.en?.name || 'Sin nombre';
  const description = translations?.es?.description || translations?.en?.description || '';

  // Navegar a detalle del producto
  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  // Manejar agregar al carrito (previene navegación)
  const handleAddToCart = (e) => {
    e.stopPropagation();
    // TODO: Implementar funcionalidad de carrito
    console.log('Agregar al carrito:', product);
    alert(`${name} agregado al carrito`);
  };

  // Imagen placeholder si no hay imagen (SVG inline)
  const productImage = image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23f5f5f5"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="%23999"%3ESin Imagen%3C/text%3E%3C/svg%3E';

  // El precio ya viene formateado desde la API
  const formattedPrice = price;

  return (
    <div
      onClick={handleCardClick}
      className="card-pepper overflow-hidden group cursor-pointer relative transition-all duration-200 hover:shadow-xl"
    >
      {/* Badge - Popular o Nuevo */}
      {(is_popular || is_new) && (
        <div className="absolute top-3 right-3 z-10">
          {is_popular && (
            <span className="inline-flex items-center space-x-1 bg-pepper-orange text-white px-3 py-1 rounded-full text-sm font-gabarito font-semibold shadow-lg">
              <FontAwesomeIcon icon={faFire} className="text-xs" />
              <span>Popular</span>
            </span>
          )}
          {is_new && !is_popular && (
            <span className="inline-flex items-center space-x-1 bg-pepper-yellow text-white px-3 py-1 rounded-full text-sm font-gabarito font-semibold shadow-lg">
              <FontAwesomeIcon icon={faStar} className="text-xs" />
              <span>Nuevo</span>
            </span>
          )}
        </div>
      )}

      {/* Badge - No disponible */}
      {!available && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-gabarito font-semibold shadow-lg">
            Agotado
          </span>
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <img
          src={productImage}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            !available ? 'opacity-60 grayscale' : ''
          }`}
          loading="lazy"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="font-gabarito font-bold text-lg md:text-xl text-pepper-charcoal mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Descripción */}
        {description && (
          <p className="font-inter text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between">
          <span className="font-gabarito font-bold text-2xl text-pepper-orange">
            {formattedPrice}
          </span>

          {/* Botón de acción */}
          {available && (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-pepper-orange text-white rounded-lg font-gabarito font-semibold text-sm hover:bg-opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              aria-label={`Agregar ${name} al carrito`}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    is_popular: PropTypes.bool,
    is_new: PropTypes.bool,
    available: PropTypes.bool,
  }).isRequired,
};

export default ProductCard;
