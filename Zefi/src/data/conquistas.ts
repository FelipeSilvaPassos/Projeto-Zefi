import type { DefinicaoConquista, NivelJornada } from '../types/conquista.ts';

export const DEFINICOES_CONQUISTAS: DefinicaoConquista[] = [
  { id: 'acoes', titulo: 'Mão na massa', emoji: '🌱', unidade: 'ações registradas', metas: { bronze: 1, prata: 10, ouro: 30 } },
  { id: 'pontos', titulo: 'Colecionador de Ecoa', emoji: '⭐', unidade: 'pontos', metas: { bronze: 50, prata: 200, ouro: 500 } },
  { id: 'categorias', titulo: 'Explorador', emoji: '🧭', unidade: 'categorias diferentes', metas: { bronze: 2, prata: 3, ouro: 5 } },
  { id: 'constancia', titulo: 'Constância', emoji: '🔥', unidade: 'ações nos últimos 7 dias', metas: { bronze: 1, prata: 3, ouro: 7 } },
];

/** Níveis da jornada, em ordem crescente de pontos */
export const NIVEIS_JORNADA: NivelJornada[] = [
  { nome: 'Semente', emoji: '🌱', minimo: 0 },
  { nome: 'Broto', emoji: '🌿', minimo: 50 },
  { nome: 'Árvore', emoji: '🌳', minimo: 150 },
  { nome: 'Floresta', emoji: '🌲', minimo: 400 },
  { nome: 'Guardião do Planeta', emoji: '🌍', minimo: 800 },
];
