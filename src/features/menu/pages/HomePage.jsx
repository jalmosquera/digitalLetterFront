import { useState, useMemo } from 'react';
import useFetch from '@/shared/hooks/useFetch';
import { ProductGrid, CategoryFilter } from '../components';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Extraer nombre de la compañía (con fallback)
  const companyName = companyData?.translations?.es?.name ||
                      companyData?.translations?.en?.name ||
                      companyData?.name ||
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-pepper-orange text-white py-20 lg:py-32">
        <div className="container-pepper text-center">
          <h1 className="font-cherry-bomb text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in-up">
            Welcome to {companyName}
          </h1>
          <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            Experience the future of dining with our digital menu. Browse
            delicious dishes and order with ease.
          </p>
          <button className="btn-pepper-primary bg-white text-pepper-orange hover:bg-pepper-light text-lg px-8 py-4">
            Explore Menu
          </button>
        </div>
      </section>

      

      {/* Menu Section - NUEVA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-pepper">
          <h2 className="font-gabarito font-black text-3xl md:text-4xl lg:text-5xl text-center text-pepper-charcoal mb-4">
            Nuestro Menú
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestra selección de platillos deliciosos preparados con
            amor.
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

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-pepper-light">
        <div className="container-pepper text-center">
          <h2 className="font-gabarito font-black text-3xl md:text-4xl lg:text-5xl text-pepper-charcoal mb-6">
            Ready to Order?
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our menu and discover amazing dishes waiting for you.
          </p>
          <button className="btn-pepper-primary text-lg px-8 py-4">
            View Full Menu
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
