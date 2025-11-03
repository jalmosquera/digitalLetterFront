import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import useFetch from '@shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';
import toast from 'react-hot-toast';
import IngredientModal from '@features/admin/components/IngredientModal';
import { getAuthHeaders } from '@shared/utils/auth';

const IngredientsPage = () => {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  // Edición inline
  const [editingId, setEditingId] = useState(null);
  const [editedNameEs, setEditedNameEs] = useState('');
  const [editedNameEn, setEditedNameEn] = useState('');

  const { data: ingredientsData, loading, error, refetch } = useFetch('/api/ingredients/');
  const ingredients = ingredientsData?.results || [];

  const handleOpenModal = (ingredient = null) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
    setIsModalOpen(false);
  };

  const handleStartEdit = (ingredient) => {
    setEditingId(ingredient.id);
    setEditedNameEs(ingredient.translations?.es?.name || '');
    setEditedNameEn(ingredient.translations?.en?.name || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedNameEs('');
    setEditedNameEn('');
  };

  const handleSaveEdit = async (ingredientId) => {
    try {
      const dataToSend = {
        translations: {
          es: { name: editedNameEs },
          en: { name: editedNameEn },
        },
      };
  
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ingredients/${ingredientId}/`,
        {
          method: 'PUT',
          headers: getAuthHeaders({ 'Content-Type': 'application/json' }), // ✅ uso correcto
          body: JSON.stringify(dataToSend),
        }
      );
  
      if (response.ok) {
        toast.success('Ingrediente actualizado exitosamente');
        setEditingId(null);
        refetch();
      } else {
        const err = await response.json();
        console.error('Error al guardar:', err);
        toast.error('Error al actualizar el ingrediente');
      }
    } catch (err) {
      console.error('Error al conectar con el servidor:', err);
      toast.error('Error al conectar con el servidor');
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este ingrediente?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Ingrediente eliminado exitosamente');
        refetch();
      } else {
        toast.error('Error al eliminar el ingrediente');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el ingrediente');
    }
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
    const name = getTranslation(ingredient.translations, 'name')?.toLowerCase() || '';
    return name.includes(searchTerm.toLowerCase());
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando ingredientes...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 dark:text-red-400">Error al cargar ingredientes</div>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">
            Ingredientes
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona los ingredientes de tus productos
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-pepper-primary flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Nuevo Ingrediente</span>
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
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Nombre (ES)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Nombre (EN)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredIngredients.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-600 dark:text-text-secondary"
                  >
                    No se encontraron ingredientes
                  </td>
                </tr>
              ) : (
                filteredIngredients.map((ingredient) => {
                  const isEditing = editingId === ingredient.id;
                  const nameEs = ingredient.translations?.es?.name || '';
                  const nameEn = ingredient.translations?.en?.name || '';

                  return (
                    <tr
                      key={ingredient.id}
                      className={`transition-colors ${
                        isEditing
                          ? 'bg-blue-50 dark:bg-blue-900/10'
                          : 'hover:bg-gray-50 dark:hover:bg-dark-bg'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-text-secondary">
                        #{ingredient.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-medium">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedNameEs}
                            onChange={(e) => setEditedNameEs(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          nameEs || '-'
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-medium">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedNameEn}
                            onChange={(e) => setEditedNameEn(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-bg text-gray-900 dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          nameEn || '-'
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(ingredient.id)}
                              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                              title="Guardar"
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors ml-3"
                              title="Cancelar"
                            >
                              <FontAwesomeIcon icon={faX} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(ingredient)}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              title="Editar inline"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => handleOpenModal(ingredient)}
                              className="text-pepper-orange hover:text-pepper-orange/80 transition-colors ml-3"
                              title="Editar completo"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button
                              onClick={() => handleDelete(ingredient.id)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-3"
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

      {/* Ingredient Modal */}
      <IngredientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ingredient={selectedIngredient}
        onSuccess={refetch}
      />
    </div>
  );
};

export default IngredientsPage;
