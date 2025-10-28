import { Outlet } from 'react-router-dom';
import Navbar from '@shared/components/menu/Navbar';
import Footer from '@shared/components/menu/Footer';

const MenuLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MenuLayout;
