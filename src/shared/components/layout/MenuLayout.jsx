import { Outlet } from 'react-router-dom';
import Navbar from '@shared/components/menu/Navbar';
import Footer from '@shared/components/menu/Footer';
import useFetch from '@shared/hooks/useFetch';

const MenuLayout = () => {
  // Fetch company data once at layout level
  const { data: companyData } = useFetch('/api/company/');

  // Extract company info from paginated response
  const company = companyData?.results?.[0];
  const companyName = company?.translations?.es?.name ||
                      company?.translations?.en?.name ||
                      company?.name ||
                      'Digital Letter';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar companyName={companyName} />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer company={company} />
    </div>
  );
};

export default MenuLayout;
