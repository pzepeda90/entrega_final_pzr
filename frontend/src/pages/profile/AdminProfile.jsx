import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import { showSuccess, showError, showConfirm } from '../../services/notificationService';
import Button from '../../components/ui/Button';
import { ROLES } from '../../constants/roles';

const AdminProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    role: ROLES.ADMIN,
    activo: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [direcciones, setDirecciones] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        email: user.email || '',
        telefono: user.telefono || '',
        fecha_nacimiento: user.fecha_nacimiento || '',
        role: user.role,
        activo: user.activo,
      });
      setDirecciones(user.direcciones ? [...user.direcciones] : []);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleDireccionChange = (idx, e) => {
    const { name, value, type, checked } = e.target;
    setDirecciones((prev) =>
      prev.map((dir, i) =>
        i === idx ? { ...dir, [name]: type === 'checkbox' ? checked : value } : dir
      )
    );
  };

  const handleAddDireccion = () => {
    setDirecciones((prev) => [
      ...prev,
      {
        direccion_id: Date.now(),
        alias: '',
        calle: '',
        numero: '',
        departamento: '',
        ciudad: '',
        comuna: '',
        codigo_postal: '',
        pais: '',
        principal: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  };

  const handleRemoveDireccion = (idx) => {
    setDirecciones((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError('');
    // Validar contraseñas si se quiere cambiar
    if (passwords.newPassword || passwords.confirmPassword || passwords.currentPassword) {
      if (!passwords.currentPassword) {
        setPasswordError('Debes ingresar tu contraseña actual para cambiar la contraseña');
        setIsLoading(false);
        return;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        setPasswordError('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const payload = { ...formData, direcciones };
      if (passwords.newPassword) {
        payload.password = passwords.newPassword;
        payload.currentPassword = passwords.currentPassword;
      }
      dispatch(updateProfile(payload));
      showSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showError(error.message || 'Error al actualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = async () => {
    const shouldCancel = await showConfirm({
      title: '¿Cancelar edición?',
      text: 'Se perderán los cambios no guardados',
      confirmButtonText: 'Sí, cancelar',
    });
    if (shouldCancel) {
      setFormData({
        nombre: user?.nombre || '',
        apellido: user?.apellido || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        fecha_nacimiento: user?.fecha_nacimiento || '',
        role: user?.role,
        activo: user?.activo,
      });
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No se encontró información del perfil
          </h2>
          <p className="text-gray-600">
            Por favor, inicia sesión para ver tu perfil
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nombre || 'Admin')}&background=6366f1&color=fff&size=200`}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {user?.nombre} {user?.apellido}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">Administrador</p>
            <p className="text-xs text-gray-400 mt-1">ID: {user?.id}</p>
            <p className="text-xs text-gray-400 mt-1">Activo: {user?.activo ? 'Sí' : 'No'}</p>
            <p className="text-xs text-gray-400 mt-1">Fecha de registro: {user?.fecha_registro?.slice(0,10)}</p>
            <p className="text-xs text-gray-400 mt-1">Creado: {user?.created_at?.slice(0,10)}</p>
            <p className="text-xs text-gray-400 mt-1">Actualizado: {user?.updated_at?.slice(0,10)}</p>
          </div>

          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Editar Perfil
              </Button>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                />
              </div>
              <div>
                <label htmlFor="activo" className="block text-sm font-medium text-gray-700">
                  Activo
                </label>
                <select
                  id="activo"
                  name="activo"
                  value={formData.activo ? 'true' : 'false'}
                  onChange={e => handleChange({ target: { name: 'activo', value: e.target.value === 'true' } })}
                  disabled={!isEditing}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              </>
            )}

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Guardar Cambios
                </Button>
              </div>
            )}
          </form>

          {/* Sección de direcciones */}
          {direcciones && direcciones.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Direcciones</h3>
              <div className="space-y-4">
                {direcciones.map((dir, idx) => (
                  <div key={dir.direccion_id} className="p-4 border rounded-lg bg-gray-50">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Alias *</label>
                          <input type="text" name="alias" value={dir.alias} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Calle *</label>
                          <input type="text" name="calle" value={dir.calle} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Número *</label>
                          <input type="text" name="numero" value={dir.numero} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Departamento</label>
                          <input type="text" name="departamento" value={dir.departamento} onChange={e => handleDireccionChange(idx, e)} className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Ciudad *</label>
                          <input type="text" name="ciudad" value={dir.ciudad} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Comuna *</label>
                          <input type="text" name="comuna" value={dir.comuna} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Código Postal</label>
                          <input type="text" name="codigo_postal" value={dir.codigo_postal} onChange={e => handleDireccionChange(idx, e)} className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">País *</label>
                          <input type="text" name="pais" value={dir.pais} onChange={e => handleDireccionChange(idx, e)} required className="mt-1 block w-full px-2 py-1 border rounded" />
                        </div>
                        <div className="flex items-center mt-4">
                          <input type="checkbox" name="principal" checked={dir.principal} onChange={e => handleDireccionChange(idx, e)} className="mr-2" />
                          <label className="text-xs">Principal</label>
                        </div>
                        <div className="flex items-center mt-4">
                          <button type="button" onClick={() => handleRemoveDireccion(idx)} className="text-red-500 hover:underline text-xs">Eliminar</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div><span className="font-semibold">Alias:</span> {dir.alias}</div>
                        <div><span className="font-semibold">Calle:</span> {dir.calle} {dir.numero}</div>
                        <div><span className="font-semibold">Departamento:</span> {dir.departamento}</div>
                        <div><span className="font-semibold">Ciudad:</span> {dir.ciudad}</div>
                        <div><span className="font-semibold">Comuna:</span> {dir.comuna}</div>
                        <div><span className="font-semibold">Código Postal:</span> {dir.codigo_postal}</div>
                        <div><span className="font-semibold">País:</span> {dir.pais}</div>
                        <div><span className="font-semibold">Principal:</span> {dir.principal ? 'Sí' : 'No'}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <button type="button" onClick={handleAddDireccion} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Agregar Dirección</button>
              )}
            </div>
          )}

          {/* Mostrar fecha de creación fuera del formulario, solo visualización */}
          <div className="mt-4 text-xs text-gray-400">
            <span className="font-semibold">Fecha de creación:</span> {user?.created_at?.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile; 