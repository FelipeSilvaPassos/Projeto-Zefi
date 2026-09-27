// Camada base de integracao: TODAS as chamadas HTTP passam por aqui (fetch nativo, sem Axios)
import type { ErroApi } from '../types/api';

const BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

let tokenAtual: string | null = null;
let aoExpirarSessao: (() => void) | null = null;

/** O UsuarioContext informa o token do usuario logado */
export function definirToken(token: string | null): void {
  tokenAtual = token;
}

/** O UsuarioContext registra o que fazer quando a sessao expira (401) */
export function definirAoExpirarSessao(callback: () => void): void {
  aoExpirarSessao = callback;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface OpcoesRequisicao {
  metodo?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  corpo?: unknown;
  autenticada?: boolean;
}

export async function requisicao<T>(caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
  const { metodo = 'GET', corpo, autenticada = false } = opcoes;
  const cabecalhos: Record<string, string> = { 'Content-Type': 'application/json' };
  if (autenticada && tokenAtual) cabecalhos.Authorization = `Bearer ${tokenAtual}`;

  let resposta: Response;
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.');
  }

  if (!resposta.ok) {
    let mensagem = `Erro ${resposta.status}`;
    try {
      const erro = (await resposta.json()) as Partial<ErroApi>;
      if (erro.mensagem) mensagem = erro.mensagem;
    } catch {
      /* resposta sem corpo JSON */
    }
    if (resposta.status === 401 && autenticada) aoExpirarSessao?.();
    throw new ApiError(resposta.status, mensagem);
  }

  if (resposta.status === 204) return undefined as T; // DELETE / logout sem corpo
  return (await resposta.json()) as T;
}
