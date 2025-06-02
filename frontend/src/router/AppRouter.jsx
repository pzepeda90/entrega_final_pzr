import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../constants/routes';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import MainLayout from '../layouts/MainLayout';

// Guards
import ProtectedRoute from '../components/guards/ProtectedRoute';

// Páginas públicas
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProductsPage from '../pages/products/ProductsPage';

// Páginas de cliente
import Cart from '../pages/client/Cart';
import Orders from '../pages/client/Orders';

// Páginas de administrador
import AdminDashboard from '../pages/admin/Dashboard';
import AdminOrders from '../pages/admin/orders/OrdersManagement';
import ProductsManagement from '../pages/admin/products/ProductsManagement';
import ProductForm from '../pages/admin/products/ProductForm';
import UsersManagement from '../pages/admin/users/UsersManagement';

// Páginas compartidas
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={PUBLIC_ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={PUBLIC_ROUTES.PRODUCTS} element={<ProductsPage />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Rutas de Administrador */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
            <Route path={PRIVATE_ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
            <Route path={PRIVATE_ROUTES.ADMIN.ORDERS} element={<AdminOrders />} />
            <Route path={PRIVATE_ROUTES.ADMIN.PRODUCTS} element={<ProductsManagement />} />
            <Route path={PRIVATE_ROUTES.ADMIN.NEW_PRODUCT} element={<ProductForm />} />
            <Route path={PRIVATE_ROUTES.ADMIN.EDIT_PRODUCT()} element={<ProductForm />} />
            <Route path={PRIVATE_ROUTES.ADMIN.USERS} element={<UsersManagement />} />
          </Route>

          {/* Rutas de Vendedor */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.VENDEDOR]} />}>
            <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
            <Route path={PRIVATE_ROUTES.VENDEDOR.MY_PRODUCTS} element={<ProductsManagement />} />
            <Route path={PRIVATE_ROUTES.VENDEDOR.MY_ORDERS} element={<Orders />} />
          </Route>

          {/* Rutas de Cliente */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.CLIENTE]} />}>
            <Route path={PRIVATE_ROUTES.PROFILE} element={<Profile />} />
            <Route path={PRIVATE_ROUTES.CART} element={<Cart />} />
            <Route path={PRIVATE_ROUTES.CLIENTE.MY_ORDERS} element={<Orders />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to={PUBLIC_ROUTES.PRODUCTS} replace />} />
      
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter; 