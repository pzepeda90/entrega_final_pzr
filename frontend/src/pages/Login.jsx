import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../mocks/authMock';
import { ROLES } from '../constants/roles';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, error, status, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // La navegación se maneja en el hook useAuth
    } catch (err) {
      // El error se maneja en el hook useAuth
    }
  };

  const handleDemoLogin = async (userType) => {
    const demoUser = mockUsers.find((user) => user.role === userType);
    if (demoUser) {
      try {
        await login(demoUser.email, demoUser.password);
      } catch (err) {
        // El error se maneja en el hook useAuth
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 disabled:opacity-50"
            >
              {status === 'loading' ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Cuentas de prueba
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              onClick={() => handleDemoLogin(ROLES.ADMIN)}
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Ingresar como Administrador
            </button>
            <button
              onClick={() => handleDemoLogin(ROLES.VENDEDOR)}
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Ingresar como Vendedor
            </button>
            <button
              onClick={() => handleDemoLogin(ROLES.CLIENTE)}
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
            >
              Ingresar como Cliente
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-medium text-brown-600 hover:text-brown-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 