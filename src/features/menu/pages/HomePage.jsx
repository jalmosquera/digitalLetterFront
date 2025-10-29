import { useState, useMemo } from 'react';
import useFetch from '@/shared/hooks/useFetch';
import { ProductGrid, CategoryFilter } from '../components';
import { useLanguage } from '@shared/contexts/LanguageContext';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useLanguage();

  // Fetch de productos y categorías
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch('/api/products/');

  const {
    data: categoriesData,
    loading: categoriesLoading,
  } = useFetch('/api/categories/');

  // Fetch de datos de la compañía
  const {
    data: companyData,
  } = useFetch('/api/company/');

  // Extraer los arrays de results de la respuesta paginada
  const products = productsData?.results || [];
  const categories = categoriesData?.results || [];
  const company = companyData?.results?.[0]; // Primer elemento del array

  // Extraer nombre de la compañía (con fallback)
  const companyName = company?.translations?.es?.name ||
                      company?.translations?.en?.name ||
                      company?.name ||
                      'Digital Letter';

  // Filtrar productos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!selectedCategory) return products;

    return products.filter((product) =>
      product.categories?.some((cat) => cat.id === selectedCategory)
    );
  }, [products, selectedCategory]);

  // Handler para cambio de categoría
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handler para scroll suave hacia el menú
  const handleExploreMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <section className="bg-pepper-orange text-white py-20 lg:py-32">
        <div className="container-pepper text-center">
          <h1 className="font-cherry-bomb text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            {t('home.welcome')} {companyName}
          </h1>
          <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            {t('home.heroDescription')}
          </p>
          <button
            onClick={handleExploreMenu}
            className="btn-pepper-primary bg-white text-pepper-orange hover:bg-pepper-light text-lg px-8 py-4"
          >
            {t('home.exploreMenu')}
          </button>
        </div>
      </section> */}

      

      {/* Menu Section - NUEVA */}
      <section
        id="menu-section"
        className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-200"
      >
        <div className="container-pepper">
          <h2 className="font-gabarito font-black text-3xl md:text-4xl lg:text-5xl text-center text-pepper-charcoal dark:text-white mb-4">
            {t('home.ourMenu')}
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {t('home.menuDescription')}
          </p>

          {/* Filtro de categorías */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            loading={categoriesLoading}
          />

          {/* Grid de productos */}
          <ProductGrid
            products={filteredProducts}
            loading={productsLoading}
            error={productsError}
          />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
 