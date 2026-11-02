
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { definirAoExpirarSessao, definirToken } from '../services/api';
import type { Usuario } from '../types/usuario';

import {
  UsuarioContext,
  type UsuarioContextValor,
} from './UsuarioContextBase';

interface Sessao {
  token: string;
  usuario: Usuario;
}

const CHAVE = 'zefi:sessao';

function lerSessaoSalva(): Sessao | null {
  try {
    const salvo = sessionStorage.getItem(CHAVE);
    return salvo ? (JSON.parse(salvo) as Sessao) : null;
  } catch {
    return null;
  }
}

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(lerSessaoSalva);

  // Mantém o token e a sessão sincronizados
  useEffect(() => {
    definirToken(sessao?.token ?? null);

    if (sessao) {
      sessionStorage.setItem(CHAVE, JSON.stringify(sessao));
    } else {
      sessionStorage.removeItem(CHAVE);
    }
  }, [sessao]);

  const sair = useCallback(() => setSessao(null), []);

  useEffect(() => {
    definirAoExpirarSessao(sair);
  }, [sair]);

  const valor: UsuarioContextValor = {
    usuario: sessao?.usuario ?? null,

    entrar: ({ token, usuario }) => {
      definirToken(token);
      setSessao({ token, usuario });
    },

    sair,

    atualizarUsuario: (usuario) =>
      setSessao((atual) => (atual ? { ...atual, usuario } : atual)),
  };

  return (
    <UsuarioContext.Provider value={valor}>
      {children}
    </UsuarioContext.Provider>
  );
}
