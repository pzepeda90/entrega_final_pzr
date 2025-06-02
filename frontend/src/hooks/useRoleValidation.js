import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ROLES } from '../constants/roles';

/**
 * Hook personalizado para validar y manejar roles de usuario
 * @returns {Object} Objeto con métodos y propiedades para validación de roles
 */
export const useRoleValidation = () => {
  const { user } = useSelector(state => state.auth);

  // Validar y limpiar cualquier inconsistencia en localStorage
  useEffect(() => {
    // Eliminar entradas antiguas o incorrectas
    localStorage.removeItem('userRole');
    
    // Validar que el rol del usuario sea válido
    if (user?.role && !Object.values(ROLES).includes(user.role)) {
      console.error('Role inválido detectado:', user.role);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, [user]);

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (!Object.values(ROLES).includes(requiredRole)) {
      console.warn('Intentando validar un rol no definido:', requiredRole);
      return false;
    }
    return user.role === requiredRole;
  };

  const hasAnyRole = (requiredRoles) => {
    if (!user) return false;
    return requiredRoles.some(role => hasRole(role));
  };

  const getCurrentRole = () => {
    return user?.role || null;
  };

  const isValidRole = (role) => {
    return Object.values(ROLES).includes(role);
  };

  return {
    hasRole,
    hasAnyRole,
    getCurrentRole,
    isValidRole,
    userRole: user?.role
  };
}; 