import { useState, useMemo } from 'react';
import useFetch from '@/shared/hooks/useFetch';
import { ProductGrid, CategoryFilter } from '../components';
import { useLanguage } from '@shared/contexts/LanguageContext';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useLanguage();

  // Fetch de productos, categorías y company
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch('/products/');

  const {
    data: categoriesData,
    loading: categoriesLoading,
  } = useFetch('/categories/');

  // Extraer los arrays de results de la respuesta paginada
  const categories = categoriesData?.results || [];

  // Filtrar productos por categoría seleccionada
  const filteredProducts = useMemo(() => {
    const products = productsData?.results || [];
    if (!products) return [];
    if (!selectedCategory) return products;

    return products.filter((product) =>
      product.categories?.some((cat) => cat.id === selectedCategory)
    );
  }, [productsData, selectedCategory]);

  // Handler para cambio de categoría
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen">
      {/* Menu Section */}
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
 