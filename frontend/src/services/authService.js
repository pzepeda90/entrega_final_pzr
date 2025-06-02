import axios from 'axios';
import { mockAuthService } from '../mocks/authMock';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Configuración de axios con interceptores
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  // Iniciar sesión
  async login(email, password) {
    const data = await mockAuthService.login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  // Registrar usuario
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/usuarios/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al verificar token' };
    }
  },

  // Actualizar perfil
  async updateProfile(userData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_URL}/usuarios/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar perfil');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (passwords) => {
    try {
      const response = await axiosInstance.put('/auth/change-password', passwords);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al cambiar contraseña' };
    }
  },

  // Recuperar contraseña (solicitud)
  requestPasswordReset: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Error al solicitar recuperación de contraseña',
      };
    }
  },

  // Restablecer contraseña
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || {
        message: 'Error al restablecer contraseña',
      };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService; 