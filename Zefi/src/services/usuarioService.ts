import { requisicao } from './api';
import type {
  CadastroUsuario, DadosEditaveis, EngajamentoResponse, LoginResponse, PerfilResponse, Usuario,
} from '../types/usuario';

export const usuarioService = {
  cadastrar: (dados: CadastroUsuario) =>
    requisicao<Usuario>('/api/usuarios', { metodo: 'POST', corpo: dados }),

  login: (cpf: string, senha: string) =>
    requisicao<LoginResponse>('/api/usuarios/login', { metodo: 'POST', corpo: { cpf, senha } }),

  logout: () =>
    requisicao<void>('/api/usuarios/logout', { metodo: 'POST', autenticada: true }),

  perfil: (cpf: string) =>
    requisicao<PerfilResponse>(`/api/usuarios/${cpf}`, { autenticada: true }),

  atualizar: (cpf: string, dados: DadosEditaveis) =>
    requisicao<Usuario>(`/api/usuarios/${cpf}`, { metodo: 'PUT', corpo: dados, autenticada: true }),

  excluir: (cpf: string) =>
    requisicao<void>(`/api/usuarios/${cpf}`, { metodo: 'DELETE', autenticada: true }),

  engajamento: (cpf: string) =>
    requisicao<EngajamentoResponse>(`/api/usuarios/${cpf}/engajamento`, { autenticada: true }),
};
