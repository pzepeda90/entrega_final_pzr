import { useState, useMemo, useCallback } from 'react';
import { useRoleValidation } from '../../hooks/useRoleValidation';
import { ROLES } from '../../constants/roles';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Skeleton from '../../components/ui/Skeleton';
import Tooltip from '../../components/ui/Tooltip';
import Transition from '../../components/ui/Transition';
import AlertService from '../../services/AlertService';
import VirtualList from '../../components/ui/VirtualList';
import useDebounce from '../../hooks/useDebounce';

// Datos mock de usuarios
const mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@cafe.com', role: ROLES.VENDEDOR, active: true, permissions: ['VER_PEDIDOS', 'GESTIONAR_PRODUCTOS'] },
  { id: 2, name: 'Ana López', email: 'ana@cafe.com', role: ROLES.VENDEDOR, active: true, permissions: ['VER_PEDIDOS'] },
  { id: 3, name: 'Carlos Cliente', email: 'carlos@cliente.com', role: ROLES.CLIENTE, active: true, permissions: [] },
  { id: 4, name: 'Admin', email: 'admin@cafe.com', role: ROLES.ADMIN, active: true, permissions: ['*'] },
];

const allPermissions = [
  { key: 'VER_PEDIDOS', label: 'Ver Pedidos' },
  { key: 'GESTIONAR_PRODUCTOS', label: 'Gestionar Productos' },
  { key: 'GESTIONAR_USUARIOS', label: 'Gestionar Usuarios' },
];

const roles = [
  { key: ROLES.ADMIN, label: 'Administrador' },
  { key: ROLES.VENDEDOR, label: 'Vendedor' },
  { key: ROLES.CLIENTE, label: 'Cliente' },
];

const tabOptions = [
  { key: ROLES.ADMIN, label: 'Administradores' },
  { key: ROLES.VENDEDOR, label: 'Vendedores' },
  { key: ROLES.CLIENTE, label: 'Clientes' },
];

const UsersManagement = () => {
  const { isValidRole } = useRoleValidation();
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(ROLES.ADMIN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  // Usar debounce para la búsqueda
  const debouncedSearch = useDebounce(search, 300);

  // Memoizar usuarios filtrados
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Validar que el rol sea válido
      if (!isValidRole(user.role)) {
        console.warn('Usuario con rol inválido encontrado:', user);
        return false;
      }
      
    const matchesRole = user.role === activeTab;
      const matchesSearch = debouncedSearch
        ? user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;
    return matchesRole && matchesSearch;
  });
  }, [users, activeTab, debouncedSearch, isValidRole]);

  // Handlers memorizados
  const handleOpenModal = useCallback((user = null) => {
    const initialUser = user || { role: activeTab, name: '', email: '', permissions: [], active: true };
    
    // Validar que el rol sea válido antes de editar
    if (!isValidRole(initialUser.role)) {
      AlertService.error('Error', 'Rol de usuario inválido');
      return;
    }
    
    setEditUser(initialUser);
    setIsModalOpen(true);
  }, [activeTab, isValidRole]);

  const handleSaveUser = useCallback(async (e) => {
    e.preventDefault();
    
    // Validar rol antes de guardar
    if (!isValidRole(editUser.role)) {
      AlertService.error('Error', 'El rol seleccionado no es válido');
      return;
    }
    
    setIsLoadingAction(true);
    try {
      if (editUser.id) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(prevUsers => prevUsers.map(u => u.id === editUser.id ? editUser : u));
        AlertService.success('¡Éxito!', 'Usuario actualizado correctamente');
    } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const nextId = Math.max(...users.map(u => u.id)) + 1;
        setUsers(prevUsers => [...prevUsers, { ...editUser, id: nextId }]);
        AlertService.success('¡Éxito!', 'Usuario creado correctamente');
    }
    setIsModalOpen(false);
    } catch (error) {
      AlertService.error('Error', 'Hubo un problema al guardar el usuario');
    } finally {
      setIsLoadingAction(false);
    }
  }, [editUser, users, isValidRole]);

  const handleDeleteUser = useCallback(async (user) => {
    const result = await AlertService.confirm(
      '¿Eliminar usuario?',
      `¿Estás seguro de que deseas eliminar a ${user.name}?`
    );

    if (result.isConfirmed) {
      setIsLoadingAction(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        AlertService.success('¡Éxito!', 'Usuario eliminado correctamente');
      } catch (error) {
        AlertService.error('Error', 'Hubo un problema al eliminar el usuario');
      } finally {
        setIsLoadingAction(false);
      }
    }
  }, []);

  // Renderizar item para la lista virtual
  const renderUserItem = useCallback((user) => (
    <Transition
      show={true}
      type="slideRight"
      className="flex items-center justify-between p-4 bg-white border-b border-gray-200"
    >
      <div className="flex-1">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content="Editar usuario" position="top">
          <Button
            size="sm"
            variant="info"
            onClick={() => handleOpenModal(user)}
            disabled={isLoadingAction}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Button>
        </Tooltip>
        <Tooltip content="Eliminar usuario" position="top">
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteUser(user)}
            disabled={isLoadingAction}
            isLoading={isLoadingAction}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </Tooltip>
      </div>
    </Transition>
  ), [handleOpenModal, handleDeleteUser, isLoadingAction]);

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-2 border-b">
        {tabOptions.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors duration-200 ${
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-primary'
            }`}
            onClick={() => {
              setActiveTab(tab.key);
              setSearch('');
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          Gestión de {tabOptions.find(t => t.key === activeTab)?.label}
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Tooltip content="Agregar nuevo usuario" position="left">
            <Button
              variant="primary"
              onClick={() => handleOpenModal()}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuevo Usuario
            </Button>
          </Tooltip>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <Skeleton className="h-12 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <VirtualList
            items={filteredUsers}
            renderItem={renderUserItem}
            itemHeight={80}
            containerHeight={600}
          />
          {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No se encontraron usuarios
            </div>
          )}
      </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editUser?.name || ''}
              onChange={e => setEditUser({ ...editUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editUser?.email || ''}
              onChange={e => setEditUser({ ...editUser, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editUser?.role || ''}
              onChange={e => setEditUser({ ...editUser, role: e.target.value })}
              required
            >
              <option value="">Seleccionar rol</option>
              {roles.map(r => (
                <option key={r.key} value={r.key}>{r.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permisos
            </label>
            <div className="flex flex-wrap gap-2">
              {allPermissions.map(perm => (
                <label key={perm.key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={editUser?.permissions?.includes(perm.key) || false}
                    onChange={e => {
                      const newPermissions = e.target.checked
                        ? [...(editUser?.permissions || []), perm.key]
                        : (editUser?.permissions || []).filter(p => p !== perm.key);
                      setEditUser({ ...editUser, permissions: newPermissions });
                    }}
                  />
                  <span>{perm.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editUser?.active || false}
              onChange={e => setEditUser({ ...editUser, active: e.target.checked })}
            />
              <span className="text-sm text-gray-700">Usuario activo</span>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoadingAction}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoadingAction}
              disabled={isLoadingAction}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersManagement; 