import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FundoAnimado from '../ui/FundoAnimado';

// Estrutura comum a todas as páginas: Header no topo, página no meio e Footer embaixo
export default function Layout() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-slate-50 font-sans text-tinta">
      <FundoAnimado />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}