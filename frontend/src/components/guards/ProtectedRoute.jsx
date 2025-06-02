import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRoleValidation } from '../../hooks/useRoleValidation';
import { PUBLIC_ROUTES } from '../../constants/routes';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { hasAnyRole, getCurrentRole } = useRoleValidation();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Si se especifican roles permitidos, verificar que el usuario tenga al menos uno de ellos
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = hasAnyRole(allowedRoles);
    if (!hasPermission) {
      console.warn(
        `Acceso denegado - Rol actual: ${getCurrentRole()}, Roles permitidos:`,
        allowedRoles
      );
      return <Navigate to={PUBLIC_ROUTES.PRODUCTS} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute; 