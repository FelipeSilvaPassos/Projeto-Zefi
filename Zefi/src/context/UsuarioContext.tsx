import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { definirAoExpirarSessao, definirToken } from '../services/api';
import type { LoginResponse, Usuario } from '../types/usuario';

interface Sessao {
  token: string;
  usuario: Usuario;
}

interface UsuarioContextValor {
  usuario: Usuario | null;
  entrar: (dados: LoginResponse) => void;
  sair: () => void;
  atualizarUsuario: (usuario: Usuario) => void;
}

const CHAVE = 'zefi:sessao';
const UsuarioContext = createContext<UsuarioContextValor | undefined>(undefined);

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

  // Mantem o token da camada de servicos e o sessionStorage sincronizados
  useEffect(() => {
    definirToken(sessao?.token ?? null);
    if (sessao) sessionStorage.setItem(CHAVE, JSON.stringify(sessao));
    else sessionStorage.removeItem(CHAVE);
  }, [sessao]);

  const sair = useCallback(() => setSessao(null), []);

  useEffect(() => {
    definirAoExpirarSessao(sair); // se a API responder 401, desloga
  }, [sair]);

  const valor: UsuarioContextValor = {
    usuario: sessao?.usuario ?? null,
    entrar: ({ token, usuario }) => {
      definirToken(token); // disponivel imediatamente para a proxima chamada
      setSessao({ token, usuario });
    },
    sair,
    atualizarUsuario: (usuario) => setSessao((atual) => (atual ? { ...atual, usuario } : atual)),
  };

  return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>;
}

export function useUsuario(): UsuarioContextValor {
  const contexto = useContext(UsuarioContext);
  if (!contexto) throw new Error('useUsuario precisa estar dentro de <UsuarioProvider>');
  return contexto;
}
