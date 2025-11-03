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
  const [editedIcon, setEditedIcon] = useState('');
  const [editedNameEs, setEditedNameEs] = useState('');
  const [editedNameEn, setEditedNameEn] = useState('');

  const { data: ingredientsData, loading, error, refetch } = useFetch('/api/ingredients/');
  const ingredients = ingredientsData?.results || ingredientsData || [];

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
    setEditedIcon(ingredient.icon || '');
    setEditedNameEs(ingredient.translations?.es?.name || '');
    setEditedNameEn(ingredient.translations?.en?.name || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedIcon('');
    setEditedNameEs('');
    setEditedNameEn('');
  };

  const handleSaveEdit = async (ingredientId) => {
    try {
      const dataToSend = {
        icon: editedIcon,
        translations: {
          es: { name: editedNameEs },
          en: { name: editedNameEn },
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ingredients/${ingredientId}/`,
        {
          method: 'PUT',
          headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
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
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-text-primary">
            Ingredientes
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona los ingredientes de tus productos
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 btn-pepper-primary"
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
            className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            type="text"
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-dark-border dark:bg-dark-card dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Icon
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Nombre (ES)
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase dark:text-text-secondary">
                  Nombre (EN)
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-600 uppercase dark:text-text-secondary">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredIngredients.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
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
                      {/* Icon Column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="text"
                            maxLength="2"
                            value={editedIcon}
                            onChange={(e) => setEditedIcon(e.target.value)}
                            className="w-12 h-10 text-2xl text-center bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                            placeholder="🍅"
                          />
                        ) : (
                          <span className="text-2xl">{ingredient.icon || '📦'}</span>
                        )}
                      </td>

                      {/* ID Column */}
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap dark:text-text-secondary">
                        #{ingredient.id}
                      </td>

                      {/* Nombre ES Column */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedNameEs}
                            onChange={(e) => setEditedNameEs(e.target.value)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          nameEs || '-'
                        )}
                      </td>

                      {/* Nombre EN Column */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-text-primary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedNameEn}
                            onChange={(e) => setEditedNameEn(e.target.value)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-dark-bg dark:text-text-primary focus:ring-2 focus:ring-pepper-orange focus:outline-none"
                          />
                        ) : (
                          nameEn || '-'
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 space-x-2 text-sm text-right whitespace-nowrap">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => handleSaveEdit(ingredient.id)}
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
                              onClick={() => handleStartEdit(ingredient)}
                              className="text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Editar inline"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => handleOpenModal(ingredient)}
                              className="ml-3 transition-colors text-pepper-orange hover:text-pepper-orange/80"
                              title="Editar completo"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button
                              onClick={() => handleDelete(ingredient.id)}
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
