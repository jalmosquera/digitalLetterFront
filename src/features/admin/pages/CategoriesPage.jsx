import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import useFetch from '@shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: categoriesData, loading, error, refetch } = useFetch('/api/categories/');

  const categories = categoriesData?.results || [];

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        toast.success('Categoría eliminada exitosamente');
        refetch();
      } else {
        toast.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar la categoría');
    }
  };

  const filteredCategories = categories.filter(category => {
    const name = getTranslation(category.translations, 'name')?.toLowerCase() || '';
    return name.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando categorías...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 dark:text-red-400">Error al cargar categorías</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">
            Categorías
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona las categorías de productos
          </p>
        </div>
        <button className="btn-pepper-primary flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nueva Categoría</span>
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
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-600 dark:text-text-secondary">
            No se encontraron categorías
          </div>
        ) : (
          filteredCategories.map((category) => {
            const name = getTranslation(category.translations, 'name') || 'Sin nombre';
            const description = getTranslation(category.translations, 'description') || '';

            return (
              <div
                key={category.id}
                className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6 hover:border-pepper-orange/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-text-primary mb-2">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-sm text-gray-600 dark:text-text-secondary line-clamp-2">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div className="text-sm text-gray-600 dark:text-text-secondary">
                    ID: {category.id}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-pepper-orange hover:text-pepper-orange/80 transition-colors p-2"
                      title="Editar"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2"
                      title="Eliminar"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
