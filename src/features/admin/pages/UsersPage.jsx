import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import useFetch from '@shared/hooks/useFetch';
import toast from 'react-hot-toast';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: usersData, loading, error, refetch } = useFetch('/api/users/');

  const users = usersData?.results || [];

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        toast.success('Usuario eliminado exitosamente');
        refetch();
      } else {
        toast.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el usuario');
    }
  };

  const filteredUsers = users.filter(user => {
    const username = user.username?.toLowerCase() || '';
    const email = user.email?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return username.includes(search) || email.includes(search);
  });

  const getRoleLabel = (role) => {
    const roles = {
      'boss': 'Propietario',
      'employee': 'Empleado',
      'client': 'Cliente',
    };
    return roles[role] || role;
  };

  const getRoleBadge = (role) => {
    const badges = {
      'boss': 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300',
      'employee': 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300',
      'client': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
    };
    return badges[role] || badges['client'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 dark:text-red-400">Error al cargar usuarios</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">
            Usuarios
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <button className="btn-pepper-primary flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nuevo Usuario</span>
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
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-pepper-orange"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Activo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-600 dark:text-text-secondary">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-pepper-orange rounded-full flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faUser} className="text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-text-primary">
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-text-secondary">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.is_active
                          ? 'bg-pepper-orange/10 text-pepper-orange'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {user.is_active ? 'Activo' : 'Inactivo'}
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
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-3"
                        title="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
