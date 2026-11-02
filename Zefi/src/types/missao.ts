import type { Categoria } from './categoria';

export interface Missao {
  id: number;
  nome: string;
  categoria: Categoria;
  pontosRecompensa: number;
}

export interface RecomendacaoResponse {
  recomendacaoId: number | null;
  missao: Missao | null;
  pontosPrevistos: number;
  bonusPersonalizacao: boolean;
  mensagemZefi: string;
  lembrete: string | null;
}

export interface AceiteResponse {
  pontosGanhos: number;
  novoSaldo: number;
  mensagemZefi: string;
  progresso: string;
}
