import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useUsuario } from '../../context/useUsuario';
import type { LinkMenu } from '../../types/navegacao';

// Menu para visitantes (as páginas institucionais ficam no rodapé quando logado)
const LINKS_VISITANTE: LinkMenu[] = [
  { rotulo: 'Início', caminho: '/' },
  { rotulo: 'Missões', caminho: '/missoes' },
  { rotulo: 'Sobre', caminho: '/sobre' },
  { rotulo: 'FAQ', caminho: '/faq' },
  { rotulo: 'Integrantes', caminho: '/integrantes' },
  { rotulo: 'Contato', caminho: '/contato' },
];

// Menu para quem está logado
const LINKS_LOGADO: LinkMenu[] = [
  { rotulo: 'Feed', caminho: '/' },
  { rotulo: 'Missões', caminho: '/missoes' },
  { rotulo: 'Recompensas', caminho: '/recompensas' },
  { rotulo: 'Chat com o Zefi', caminho: '/chat' },
  { rotulo: 'Meu perfil', caminho: '/perfil' },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState<boolean>(false);
  const { usuario } = useUsuario();

  const links = usuario ? LINKS_LOGADO : LINKS_VISITANTE;

  // Estilo dos links, destacando a página atual
  const estiloLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'bg-[#BFEAFF] text-[#111111]'
        : 'text-[#111111]/80 hover:bg-[#BFEAFF]/60 hover:text-[#111111]'
    }`;

  const estiloEntrar = 'block rounded-lg px-3 py-2 text-sm font-semibold text-[#111111]/80 hover:bg-[#BFEAFF]/60';
  const estiloCriarConta =
    'block rounded-lg bg-[#55BDF0] px-4 py-2 text-center text-sm font-bold text-black hover:bg-[#BFEAFF]';

  const fechar = () => setMenuAberto(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DCEAF2] bg-white/95 backdrop-blur">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={fechar}
          className="flex shrink-0 items-center gap-2 text-[#111111]"
          aria-label="Zefi — página inicial"
        >
          <img src="/imgs-zefi/icone_feliz.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
          <span className="text-xl font-extrabold tracking-tight">Zefi</span>
          <span className="hidden border-l border-[#DCEAF2] pl-2 text-sm font-medium text-[#111111]/60 sm:inline">
            Soul Up
          </span>
        </Link>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="rounded-lg border border-[#DCEAF2] px-3 py-2 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#BFEAFF]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#55BDF0] lg:hidden"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuAberto ? 'Fechar ✕' : 'Menu ☰'}
        </button>

        {/* Menu desktop */}
        <ul className="hidden flex-wrap items-center justify-end gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.caminho}>
              <NavLink to={link.caminho} className={estiloLink} end={link.caminho === '/'}>
                {link.rotulo}
              </NavLink>
            </li>
          ))}

          {!usuario && (
            <>
              <li>
                <Link to="/login" className={estiloEntrar}>
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className={estiloCriarConta}>
                  Criar conta
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Menu mobile */}
      {menuAberto && (
        <ul
          id="menu-mobile"
          className="flex flex-col gap-1 border-t border-[#DCEAF2] bg-white px-4 py-3 lg:hidden"
        >
          {links.map((link) => (
            <li key={link.caminho}>
              <NavLink to={link.caminho} className={estiloLink} onClick={fechar} end={link.caminho === '/'}>
                {link.rotulo}
              </NavLink>
            </li>
          ))}

          {!usuario && (
            <>
              <li>
                <Link to="/login" className={estiloEntrar} onClick={fechar}>
                  Entrar
                </Link>
              </li>
              <li>
                <Link to="/cadastro" className={estiloCriarConta} onClick={fechar}>
                  Criar conta
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}
