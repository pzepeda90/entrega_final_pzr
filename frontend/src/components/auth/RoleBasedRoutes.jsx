import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLES } from '../../constants/roles';
import { PUBLIC_ROUTES, DEFAULT_ROUTES_BY_ROLE } from '../../constants/routes';

const RoleBasedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Si no se especifican roles permitidos, permitir acceso a cualquier usuario autenticado
  if (!allowedRoles) {
    return <Outlet />;
  }

  // Verificar si el rol del usuario está permitido
  if (!allowedRoles.includes(user?.role)) {
    // Redirigir a la ruta por defecto según el rol del usuario
    return <Navigate to={DEFAULT_ROUTES_BY_ROLE[user?.role]} replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoutes; 