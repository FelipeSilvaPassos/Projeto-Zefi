
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans text-black">
      <Header />

      <main className="flex-1 bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
