import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getAuthHeaders } from '@shared/utils/auth';

const CategoryModal = ({ isOpen, onClose, category, onSuccess }) => {
  const [formData, setFormData] = useState({
    name_es: '',
    name_en: '',
    description_es: '',
    description_en: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name_es: category.translations?.es?.name || '',
        name_en: category.translations?.en?.name || '',
        description_es: category.translations?.es?.description || '',
        description_en: category.translations?.en?.description || '',
        image: null,
      });
      setImagePreview(category.image);
    } else {
      setFormData({
        name_es: '',
        name_en: '',
        description_es: '',
        description_en: '',
        image: null,
      });
      setImagePreview(null);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

      const dataToSend = {
        translations,
      };

      const url = category
        ? `${import.meta.env.VITE_API_URL}/api/categories/${category.id}/`
        : `${import.meta.env.VITE_API_URL}/api/categories/`;

      let body;
      let headers = getAuthHeaders();

      // Si hay imagen, usar FormData con campos planos
      if (formData.image) {
        const formDataToSend = new FormData();

        formDataToSend.append('name_en', formData.name_en);
        formDataToSend.append('name_es', formData.name_es);

        if (formData.description_en) {
          formDataToSend.append('description_en', formData.description_en);
        }
        if (formData.description_es) {
          formDataToSend.append('description_es', formData.description_es);
        }

        formDataToSend.append('image', formData.image);

        body = formDataToSend;
      } else {
        // Sin imagen, enviar como JSON
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(dataToSend);
      }

      const response = await fetch(url, {
        method: category ? 'PUT' : 'POST',
        headers,
        body,
      });

      if (response.ok) {
        toast.success(category ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente');
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        let errorMessage = 'Error al guardar la categoría';
        if (error.detail) {
          errorMessage = error.detail;
        } else if (typeof error === 'object') {
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
              {category ? 'Editar Categoría' : 'Nueva Categoría'}
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
                {loading ? 'Guardando...' : (category ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default CategoryModal;
