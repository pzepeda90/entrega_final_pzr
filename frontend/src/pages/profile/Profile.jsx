import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { PUBLIC_ROUTES } from '../../constants/routes';
import AdminProfile from './AdminProfile';
import VendorProfile from './VendorProfile';
import ClientProfile from './ClientProfile';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  // Si no hay usuario, mostrar mensaje de error
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

  // Renderizar el perfil correspondiente según el rol
  switch (user.role) {
    case ROLES.ADMIN:
      return <AdminProfile />;
    case ROLES.VENDEDOR:
      return <VendorProfile />;
    case ROLES.CLIENTE:
      return <ClientProfile />;
    default:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rol no válido
            </h2>
            <p className="text-gray-600">
              El rol de usuario no está configurado correctamente
            </p>
          </div>
        </div>
      );
  }
};

export default Profile; 