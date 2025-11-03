import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

import useFetch from '@shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';
import toast from 'react-hot-toast';
import ProductModal from '@features/admin/components/ProductModal';
import { getAuthHeaders } from '@shared/utils/auth';

const ProductsPage = () => {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const { data: productsData, loading, error, refetch } = useFetch('/api/products/');
  const { data: categoriesData } = useFetch('/api/categories/');

  const products = productsData?.results || [];
  const categories = categoriesData?.results || [];

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    const price = typeof product.price === 'string'
      ? product.price.replace(' €', '')
      : product.price;

    setEditedData({
      name_es: product.translations?.es?.name || '',
      name_en: product.translations?.en?.name || '',
      price: price,
      stock: product.stock,
      available: product.available,
      category: product.categories?.[0]?.id || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = async (productId) => {
    try {
      const dataToSend = {
        translations: {
          es: { name: editedData.name_es },
          en: { name: editedData.name_en },
        },
        price: parseFloat(editedData.price),
        stock: parseInt(editedData.stock),
        available: editedData.available,
        categories: [parseInt(editedData.category)],
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${productId}/`,
        {
          method: 'PUT',
          headers: getAuthHeaders({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        toast.success('Producto actualizado exitosamente');
        setEditingId(null);
        setEditedData({});
        refetch();
      } else {
        const error = await response.json();
        toast.error('Error al actualizar el producto');
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al conectar con el servidor');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
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
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-text-primary">
            Productos
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona los productos de tu menú
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 btn-pepper-primary"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-card dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Imagen
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Nombre (ES)
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Nombre (EN)
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Precio
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Categoría
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Disponible
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-600 uppercase dark:text-text-secondary">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-600 dark:text-text-secondary">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isEditing = editingId === product.id;
                  const nameES = product.translations?.es?.name || 'Sin nombre';
                  const nameEN = product.translations?.en?.name || '';
                  const categoryName = product.categories?.[0]
                    ? getTranslation(product.categories[0].translations, 'name')
                    : 'Sin categoría';
                  const price = typeof product.price === 'string'
                    ? product.price.replace(' €', '')
                    : product.price;

                  return (
                    <tr key={product.id} className={`transition-colors ${
                      isEditing
                        ? 'bg-blue-50 dark:bg-blue-900/10'
                        : product.available
                          ? 'hover:bg-gray-50 dark:hover:bg-dark-bg'
                          : 'bg-gray-100 dark:bg-gray-800 opacity-75 hover:bg-gray-150 dark:hover:bg-gray-750'
                    }`}>
                      {/* Imagen */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image || '/placeholder-product.jpg'}
                          alt={nameES}
                          className="object-cover w-12 h-12 rounded-lg"
                        />
                      </td>

                      {/* Nombre ES */}
                      <td className="px-4 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.name_es}
                            onChange={(e) => handleFieldChange('name_es', e.target.value)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900 dark:text-text-primary">
                            {nameES}
                          </span>
                        )}
                      </td>

                      {/* Nombre EN */}
                      <td className="px-4 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedData.name_en}
                            onChange={(e) => handleFieldChange('name_en', e.target.value)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-text-secondary">
                            {nameEN || '-'}
                          </span>
                        )}
                      </td>

                      {/* Precio */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editedData.price}
                            onChange={(e) => handleFieldChange('price', e.target.value)}
                            className="w-24 px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-gray-900 dark:text-text-primary">
                            €{parseFloat(price).toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editedData.stock}
                            onChange={(e) => handleFieldChange('stock', e.target.value)}
                            className="w-20 px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          <span className="text-sm text-gray-900 dark:text-text-primary">
                            {product.stock}
                          </span>
                        )}
                      </td>

                      {/* Categoría */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={editedData.category}
                            onChange={(e) => handleFieldChange('category', e.target.value)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          >
                            <option value="">Seleccionar...</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>
                                {getTranslation(cat.translations, 'name') || 'Sin nombre'}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-text-secondary">
                            {categoryName}
                          </span>
                        )}
                      </td>

                      {/* Disponible */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {isEditing ? (
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editedData.available}
                              onChange={(e) => handleFieldChange('available', e.target.checked)}
                              className="w-4 h-4 border-gray-300 rounded text-pepper-orange focus:ring-pepper-orange"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                              {editedData.available ? 'Sí' : 'No'}
                            </span>
                          </label>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.available
                              ? 'bg-pepper-orange/10 text-pepper-orange'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {product.available ? 'Disponible' : 'No disponible'}
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4 space-x-2 text-sm text-right whitespace-nowrap">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(product.id)}
                              className="text-green-600 transition-colors hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                              title="Guardar"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="ml-3 text-gray-600 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Cancelar"
                            >
                              <FontAwesomeIcon icon={faX} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(product)}
                              className="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Editar inline"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => handleOpenModal(product)}
                              className="ml-3 transition-colors text-pepper-orange hover:text-pepper-orange/80"
                              title="Editar completo (ingredientes, imagen, etc)"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="ml-3 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              title="Eliminar"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onSuccess={refetch}
      />
    </div>
  );
};

export default ProductsPage;
