import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import MenuLayout from '@shared/components/layout/MenuLayout';
import HomePage from '@features/menu/pages/HomePage';
import ProductDetailPage from '@features/menu/pages/ProductDetailPage';
import ContactPage from '@features/menu/pages/ContactPage';
import PrivacyPage from '@features/menu/pages/PrivacyPage';
import { LoginPage, RegisterPage } from '@features/auth/pages';
import CartPage from '@features/cart/pages/CartPage';
import CheckoutPage from '@features/cart/pages/CheckoutPage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Observe theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
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
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
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
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public Routes (Pepper Design) */}
        <Route path="/" element={<MenuLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
