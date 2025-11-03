import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import useFetch from '@shared/hooks/useFetch';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@shared/utils/auth';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ProductModal = ({ isOpen, onClose, product, onSuccess }) => {
  const { getTranslation } = useLanguage();
  const { data: categoriesData } = useFetch('/api/categories/');
  const { data: ingredientsData } = useFetch('/api/ingredients/');
  
  const categories = categoriesData?.results || [];
  const ingredients = ingredientsData?.results || [];

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
    ingredients: [],
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
        ingredients: product.ingredients?.map(ing => ing.id) || [],
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
        ingredients: [],
      });
      setImagePreview(null);
    }
  }, [product, isOpen]);

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

  const handleIngredientToggle = (ingredientId) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredientId)
        ? prev.ingredients.filter(id => id !== ingredientId)
        : [...prev.ingredients, ingredientId]
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
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

    const url = product
      ? `${import.meta.env.VITE_API_URL}/api/products/${product.id}/`
      : `${import.meta.env.VITE_API_URL}/api/products/`;

    let body;
    let headers = getAuthHeaders();
    let method = 'POST'; // Para crear

    // Si es edición, usa PATCH (no PUT)
    if (product) {
      method = 'PATCH';
    }

    // Si hay imagen, usar FormData
    if (formData.image) {
      const formDataToSend = new FormData();

      // Traducciones
      formDataToSend.append('name_en', formData.name_en);
      formDataToSend.append('name_es', formData.name_es);
      formDataToSend.append('description_en', formData.description_en || '');
      formDataToSend.append('description_es', formData.description_es || '');

      // Campos regulares
      formDataToSend.append('price', String(formData.price));
      formDataToSend.append('stock', String(formData.stock));
      formDataToSend.append('available', String(formData.available));
      formDataToSend.append('categories', String(formData.category));

      // ✅ Ingredientes como array
      formData.ingredients.forEach(ingId => {
        formDataToSend.append('ingredients', ingId);
      });

      // Imagen
      formDataToSend.append('image', formData.image);

      body = formDataToSend;
      delete headers['Content-Type'];
    } else {
      // ✅ Sin imagen, enviar como JSON
      headers['Content-Type'] = 'application/json';
      
      const payload = {
        translations,
        price: String(formData.price),
        stock: parseInt(formData.stock),
        available: formData.available,
        ingredients: formData.ingredients,
      };

      // Solo agregar categories si hay seleccionada
      if (formData.category) {
        payload.categories = [parseInt(formData.category)];
      }

      body = JSON.stringify(payload);
    }

  

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const responseData = await response.json();

    if (response.ok) {
      toast.success(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
      onSuccess();
      onClose();
    } else {
      let errorMessage = 'Error al guardar el producto';
      
      if (responseData.detail) {
        errorMessage = responseData.detail;
      } else if (responseData.message) {
        errorMessage = responseData.message;
      } else if (responseData.ingredients) {
        errorMessage = `Error en ingredientes: ${responseData.ingredients}`;
      } else if (typeof responseData === 'object') {
        const errorFields = Object.keys(responseData).filter(k => responseData[k]);
        if (errorFields.length > 0) {
          errorMessage = `Error: ${errorFields.join(', ')}`;
        }
      }

      console.error('Error response:', responseData);
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
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
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-dark-card sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
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
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre (Español) *
                </label>
                <input
                  type="text"
                  name="name_es"
                  value={formData.name_es}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Name English */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre (Inglés) *
                </label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Description Spanish */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción (Español)
                </label>
                <textarea
                  name="description_es"
                  value={formData.description_es}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg resize-none dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Description English */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción (Inglés)
                </label>
                <textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg resize-none dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
              </div>

              {/* Price, Stock and Category */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
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

              {/* Ingredientes */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ingredientes
                </label>
                <div className="grid grid-cols-2 gap-3 p-3 border border-gray-200 rounded-lg dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
                  {ingredients.length > 0 ? (
                    ingredients.map(ing => (
                      <label key={ing.id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.ingredients.includes(ing.id)}
                          onChange={() => handleIngredientToggle(ing.id)}
                          className="w-4 h-4 border-gray-300 rounded text-pepper-orange focus:ring-pepper-orange"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {ing.icon} {getTranslation(ing.translations, 'name')}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      No hay ingredientes disponibles
                    </p>
                  )}
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Imagen
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-bg dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-32 h-32 mt-2 rounded-lg"
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
                  className="w-4 h-4 border-gray-300 rounded text-pepper-orange focus:ring-pepper-orange"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Disponible
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200 dark:border-dark-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:text-gray-300 dark:bg-dark-bg dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-card"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-pepper-orange hover:bg-pepper-orange/90 disabled:opacity-50"
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
