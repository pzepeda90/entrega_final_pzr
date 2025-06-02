import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  startLoading,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  updateProfile,
  clearError,
  restoreSession,
  selectAuth,
} from '../store/slices/authSlice';
import authService from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);

  // Restaurar sesión al montar el componente
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      dispatch(startLoading());
      const data = await authService.login(email, password);
      dispatch(loginSuccess(data));
      if (data.user.role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/products');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  // Registrar usuario
  const register = async (userData) => {
    try {
      dispatch(startLoading());
      const data = await authService.register(userData);
      dispatch(registerSuccess(data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw error;
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Actualizar perfil
  const handleUpdateProfile = async (userData) => {
    try {
      dispatch(startLoading());
      const data = await authService.updateProfile(userData);
      dispatch(updateProfile(data.user));
      return data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async (passwords) => {
    try {
      dispatch(startLoading());
      const data = await authService.changePassword(passwords);
      dispatch(clearError());
      return data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  // Solicitar recuperación de contraseña
  const handleRequestPasswordReset = async (email) => {
    try {
      dispatch(startLoading());
      const data = await authService.requestPasswordReset(email);
      dispatch(clearError());
      return data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  // Restablecer contraseña
  const handleResetPassword = async (token, newPassword) => {
    try {
      dispatch(startLoading());
      const data = await authService.resetPassword(token, newPassword);
      dispatch(clearError());
      return data;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  return {
    // Estado
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    status: auth.status,
    error: auth.error,

    // Métodos
    login,
    register,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    requestPasswordReset: handleRequestPasswordReset,
    resetPassword: handleResetPassword,
    clearError: () => dispatch(clearError()),
  };
};

export default useAuth; 