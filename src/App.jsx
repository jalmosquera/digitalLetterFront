import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuLayout from '@shared/components/layout/MenuLayout';
import HomePage from '@features/menu/pages/HomePage';
import ProductDetailPage from '@features/menu/pages/ProductDetailPage';
import ContactPage from '@features/menu/pages/ContactPage';
import PrivacyPage from '@features/menu/pages/PrivacyPage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Pepper Design) */}
        <Route path="/" element={<MenuLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
