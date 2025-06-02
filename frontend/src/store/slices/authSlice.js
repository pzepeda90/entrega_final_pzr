import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      // Guardar en localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'failed';
      state.error = action.payload;
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      // Guardar en localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.status = 'succeeded';
      // Actualizar localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
    restoreSession: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        try {
        state.token = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
        state.status = 'succeeded';
          state.error = null;
        } catch (error) {
          // Si hay un error al parsear el usuario, limpiar todo
          state.token = null;
          state.user = null;
          state.isAuthenticated = false;
          state.status = 'idle';
          state.error = null;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    },
  },
});

// Exportar acciones
export const {
  startLoading,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  updateProfile,
  clearError,
  restoreSession,
} = authSlice.actions;

// Selector para obtener el estado de autenticación
export const selectAuth = (state) => state.auth;

export default authSlice.reducer; 