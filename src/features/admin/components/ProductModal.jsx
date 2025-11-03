import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useFetch from '@shared/hooks/useFetch';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@shared/utils/auth';

const ProductModal = ({ isOpen, onClose, product, onSuccess }) => {
  const { data: categoriesData } = useFetch('/api/categories/');
  const categories = categoriesData?.results || [];

  const [formData, setFormData] = useState({
    name_es: '',
    name_en: '',
    description_es: '',
    description_en: '',
    price: '',
    category: '',
    stock: 0,
    available: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name_es: product.translations?.es?.name || '',
        name_en: product.translations?.en?.name || '',
        description_es: product.translations?.es?.description || '',
        description_en: product.translations?.en?.description || '',
        price: product.price?.replace(' €', '') || '',
        category: product.categories?.[0]?.id || '',
        stock: product.stock || 0,
        available: product.available ?? true,
        image: null,
      });
      setImagePreview(product.image);
    } else {
      setFormData({
        name_es: '',
        name_en: '',
        description_es: '',
        description_en: '',
        price: '',
        category: '',
        stock: 0,
        available: true,
        image: null,
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file' && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create translations object
      const translations = {
        es: {
          name: formData.name_es,
          description: formData.description_es,
        },
        en: {
          name: formData.name_en,
          description: formData.description_en,
        },
      };

      const dataToSend = {
        translations,
        price: formData.price,
        categories: [parseInt(formData.category)],
        stock: parseInt(formData.stock),
        available: formData.available,
      };

      const url = product
        ? `${import.meta.env.VITE_API_URL}/api/products/${product.id}/`
        : `${import.meta.env.VITE_API_URL}/api/products/`;

      let body;
      let headers = getAuthHeaders();

      // Si hay imagen, usar FormData con campos planos
      if (formData.image) {
        const formDataToSend = new FormData();

        // Traducciones como campos planos (backend los convierte automáticamente)
        formDataToSend.append('name_en', formData.name_en);
        formDataToSend.append('name_es', formData.name_es);

        // Solo agregar descriptions si tienen contenido
        if (formData.description_en) {
          formDataToSend.append('description_en', formData.description_en);
        }
        if (formData.description_es) {
          formDataToSend.append('description_es', formData.description_es);
        }

        // Campos regulares (como strings para FormData)
        formDataToSend.append('price', String(formData.price));
        formDataToSend.append('stock', String(formData.stock));
        formDataToSend.append('available', String(formData.available));

        // Categories - como string (el backend acepta "1,2" o "[1,2]")
        formDataToSend.append('categories', String(formData.category));

        // Imagen
        formDataToSend.append('image', formData.image);

        body = formDataToSend;
        // No agregar Content-Type, el navegador lo hace automáticamente con el boundary correcto
      } else {
        // Sin imagen, enviar como JSON
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataToSend);
      }

      const response = await fetch(url, {
        method: product ? 'PUT' : 'POST',
        headers,
        body,
      });

      if (response.ok) {
        toast.success(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
        onSuccess();
        onClose();
      } else {
        const error = await response.json();

        // Manejar diferentes formatos de error
        let errorMessage = 'Error al guardar el producto';
        if (error.detail) {
          errorMessage = error.detail;
        } else if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'object') {
          // Si el error es un objeto con campos específicos
          const errorFields = Object.keys(error);
          if (errorFields.length > 0) {
            errorMessage = `Error en: ${errorFields.join(', ')}`;
          }
        }

        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-border">
            <h3 className="text-xl font-bold text-gray-900 dark:text-text-primary">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Name Spanish */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre (Español) *
                </label>
                <input
                  type="text"
                  name="name_es"
                  value={formData.name_es}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Name English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre (Inglés) *
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Description Spanish */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción (Español)
                </label>
                <textarea
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange resize-none"
                />
              </div>

              {/* Description English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción (Inglés)
                </label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange resize-none"
                />
              </div>

              {/* Price, Stock and Category */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Precio (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.translations?.es?.name || cat.translations?.en?.name || 'Sin nombre'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Imagen
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Available */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="w-4 h-4 text-pepper-orange border-gray-300 rounded focus:ring-pepper-orange"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Disponible
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-pepper-orange rounded-lg hover:bg-pepper-orange/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default ProductModal;
