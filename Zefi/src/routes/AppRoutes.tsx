
import { Route, Routes } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import RotaProtegida from './RotaProtegida';

// Páginas principais
import Inicio from '../pages/Inicio';
import Missoes from '../pages/Missoes';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Perfil from '../pages/Perfil';
import Recompensas from '../pages/Recompensas';

// Páginas institucionais
import Sobre from '../pages/Sobre';
import Faq from '../pages/Faq';
import Contato from '../pages/Contato';
import Integrantes from '../pages/Integrantes';

import NaoEncontrada from '../pages/NaoEncontrada';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Páginas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Páginas institucionais */}
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/integrantes" element={<Integrantes />} />

        {/* Páginas protegidas */}
        <Route element={<RotaProtegida />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/recompensas" element={<Recompensas />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Página não encontrada */}
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
