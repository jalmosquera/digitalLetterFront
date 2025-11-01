import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '@shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: productsData, loading, error, refetch } = useFetch('/api/products/');

  const products = productsData?.results || [];

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        toast.success('Producto eliminado exitosamente');
        refetch();
      } else {
        toast.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el producto');
    }
  };

  const filteredProducts = products.filter(product => {
    const name = getTranslation(product.translations, 'name')?.toLowerCase() || '';
    return name.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 dark:text-red-400">Error al cargar productos</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">
            Productos
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona los productos de tu menú
          </p>
        </div>
        <button className="btn-pepper-primary flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Disponible
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-600 dark:text-text-secondary">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const name = getTranslation(product.translations, 'name') || 'Sin nombre';
                  const categoryName = product.category?.name || 'Sin categoría';

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image || '/placeholder-product.jpg'}
                          alt={name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-medium">
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-semibold">
                        €{parseFloat(product.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-text-secondary">
                        {categoryName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.is_available
                            ? 'bg-pepper-orange/10 text-pepper-orange'
                            : 'bg-gray-500/10 text-gray-500'
                        }`}>
                          {product.is_available ? 'Disponible' : 'No disponible'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        <button
                          className="text-pepper-orange hover:text-pepper-orange/80 transition-colors"
                          title="Editar"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-3"
                          title="Eliminar"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
