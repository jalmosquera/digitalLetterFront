import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

// Context providers
import { AuthProvider } from '@shared/contexts/AuthContext';
import { ThemeProvider } from '@shared/contexts/ThemeContext';
import { LanguageProvider } from '@shared/contexts/LanguageContext';
import { CartProvider } from '@shared/contexts/CartContext';

// Layouts y páginas
import MenuLayout from '@shared/components/layout/MenuLayout';
import AdminLayout from '@shared/components/layout/AdminLayout';
import HomePage from '@features/menu/pages/HomePage';
import ProductDetailPage from '@features/menu/pages/ProductDetailPage';
import ContactPage from '@features/menu/pages/ContactPage';
import PrivacyPage from '@features/menu/pages/PrivacyPage';
import { LoginPage, RegisterPage } from '@features/auth/pages';
import CartPage from '@features/cart/pages/CartPage';
import CheckoutPage from '@features/cart/pages/CheckoutPage';
import DashboardPage from '@features/admin/pages/DashboardPage';
import ProductsPage from '@features/admin/pages/ProductsPage';
import CategoriesPage from '@features/admin/pages/CategoriesPage';
import IngredientsPage from '@features/admin/pages/IngredientsPage';
import UsersPage from '@features/admin/pages/UsersPage';
import ProtectedRoute from '@shared/components/auth/ProtectedRoute';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <BrowserRouter>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                  duration: 1500,
                  style: {
                    background: isDark ? '#363636' : '#ffffff',
                    color: '#F76511',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                  success: {
                    duration: 1500,
                    iconTheme: {
                      primary: '#FF6B35',
                      secondary: '#F76511',
                    },
                  },
                  error: {
                    duration: 1500,
                  },
                }}
              />

              <Routes>
                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Público */}
                <Route path="/" element={<MenuLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="product/:id" element={<ProductDetailPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>

                {/* Admin (protegido) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['boss', 'employee']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="ingredients" element={<IngredientsPage />} />
                  <Route path="users" element={<UsersPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
