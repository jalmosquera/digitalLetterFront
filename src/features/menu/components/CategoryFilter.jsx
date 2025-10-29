import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faCoffee,
  faPizzaSlice,
  faIceCream,
  faBurger,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@shared/contexts/LanguageContext';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  const { getTranslation } = useLanguage();

  // Mapeo de iconos por nombre de categoría
  const iconMap = {
    comida: faUtensils,
    bebida: faCoffee,
    pizza: faPizzaSlice,
    postre: faIceCream,
    hamburguesa: faBurger,
    default: faBowlFood,
  };

  // Función para obtener el nombre de la categoría desde translations
  const getCategoryName = (category) => {
    return getTranslation(category?.translations, 'name') || 'Sin nombre';
  };

  // Función para obtener el icono según el nombre de la categoría
  const getCategoryIcon = (categoryName) => {
    if (!categoryName || typeof categoryName !== 'string') {
      return iconMap.default;
    }
    const name = categoryName.toLowerCase();
    return iconMap[name] || iconMap.default;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pepper-orange border-t-transparent"></div>
      </div>
    );
  }

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal dark:text-white mb-6 text-center">
        Categorías
      </h2>

      {/* Filtros de categoría - Scroll horizontal en móvil */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center space-x-4 md:justify-center min-w-max md:min-w-0">
          {/* Opción "Todos" */}
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex flex-col items-center space-y-2 px-6 py-4 rounded-xl transition-all duration-200 min-w-[100px] ${
              selectedCategory === null
                ? 'bg-pepper-orange text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-pepper-charcoal dark:text-white hover:bg-pepper-light dark:hover:bg-gray-700 border-2 border-pepper-gray-light dark:border-gray-600'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUtensils}
                className="text-2xl"
              />
            </div>
            <span className="font-gabarito font-semibold text-sm">Todos</span>
          </button>

          {/* Categorías dinámicas */}
          {categories.map((category) => {
            const categoryName = getCategoryName(category);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center space-y-2 px-6 py-4 rounded-xl transition-all duration-200 min-w-[100px] ${
                  selectedCategory === category.id
                    ? 'bg-pepper-orange text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-pepper-charcoal dark:text-white hover:bg-pepper-light dark:hover:bg-gray-700 border-2 border-pepper-gray-light dark:border-gray-600'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={getCategoryIcon(categoryName)}
                    className="text-2xl"
                  />
                </div>
                <span className="font-gabarito font-semibold text-sm">
                  {categoryName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      translations: PropTypes.shape({
        es: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
        }),
        en: PropTypes.shape({
          name: PropTypes.string,
      description: PropTypes.string,
        }),
      }),
      image: PropTypes.string,
    })
  ),
  selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCategoryChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

CategoryFilter.defaultProps = {
  categories: [],
  selectedCategory: null,
  loading: false,
};

export default CategoryFilter;
