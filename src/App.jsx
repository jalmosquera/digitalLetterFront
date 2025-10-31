import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#FF6B35',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
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
