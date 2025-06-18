import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';

const Layout = () => {
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/login' || pathname === '/register';

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
