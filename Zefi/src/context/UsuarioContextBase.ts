
import { createContext } from 'react';
import type { LoginResponse, Usuario } from '../types/usuario';

export interface UsuarioContextValor {
  usuario: Usuario | null;
  entrar: (dados: LoginResponse) => void;
  sair: () => void;
  atualizarUsuario: (usuario: Usuario) => void;
}

export const UsuarioContext =
  createContext<UsuarioContextValor | undefined>(undefined);
