import type { Categoria } from './categoria';
import type { NivelEngajamento } from './zefi';

export interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  cidade: string;
  pontosAcumulados: number;
  categoriaInteresse: Categoria;
}

/** Campos que o usuario pode editar no perfil */
export type DadosEditaveis = Pick<Usuario, 'nome' | 'email' | 'cidade' | 'categoriaInteresse'>;

/** Intersection type: cadastro = dados editaveis + CPF + senha */
export type CadastroUsuario = DadosEditaveis & { cpf: string; senha: string };

export interface LoginResponse {
  token: string;
  expiraEm: string;
  usuario: Usuario;
}

export interface PerfilResponse {
  usuario: Usuario;
  pontosParaProximaRecompensa: number;
  mensagemZefi: string;
}

export interface EngajamentoResponse {
  nivel: NivelEngajamento;
  acoesUltimos7Dias: number;
  recomendacoesIgnoradas: number;
  mensagemZefi: string;
}
