import { DEFINICOES_CONQUISTAS, NIVEIS_JORNADA } from '../data/conquistas';
import type {
  Conquista,
  DefinicaoConquista,
  MetricasUsuario,
  NivelConquista,
  ResumoJornada,
} from '../types/conquista';

const ORDEM_NIVEIS: NivelConquista[] = ['bronze', 'prata', 'ouro'];

function valorDaMetrica(definicao: DefinicaoConquista, metricas: MetricasUsuario): number {
  switch (definicao.id) {
    case 'acoes':
      return metricas.totalAcoes;
    case 'pontos':
      return metricas.pontos;
    case 'categorias':
      return metricas.categoriasDistintas;
    case 'constancia':
      return metricas.acoesUltimos7Dias;
  }
}

/** Calcula a medalha atual e o progresso até a próxima de uma conquista */
export function calcularConquista(definicao: DefinicaoConquista, atual: number): Conquista {
  let nivelAtual: NivelConquista | null = null;
  for (const nivel of ORDEM_NIVEIS) {
    if (atual >= definicao.metas[nivel]) nivelAtual = nivel;
  }

  const proximoNivel = ORDEM_NIVEIS.find((nivel) => atual < definicao.metas[nivel]);
  const proxima = proximoNivel ? { nivel: proximoNivel, meta: definicao.metas[proximoNivel] } : null;

  const base = nivelAtual ? definicao.metas[nivelAtual] : 0;
  const progresso = proxima ? Math.round(((atual - base) / (proxima.meta - base)) * 100) : 100;

  return { ...definicao, atual, nivelAtual, proxima, progresso };
}

export function calcularConquistas(metricas: MetricasUsuario): Conquista[] {
  return DEFINICOES_CONQUISTAS.map((definicao) => calcularConquista(definicao, valorDaMetrica(definicao, metricas)));
}

/** Descobre o nível da jornada e o progresso até o próximo */
export function calcularJornada(pontos: number): ResumoJornada {
  let indice = 0;
  NIVEIS_JORNADA.forEach((nivel, i) => {
    if (pontos >= nivel.minimo) indice = i;
  });

  const atual = NIVEIS_JORNADA[indice];
  const proximo = NIVEIS_JORNADA[indice + 1] ?? null;
  const progresso = proximo ? Math.round(((pontos - atual.minimo) / (proximo.minimo - atual.minimo)) * 100) : 100;

  return { numero: indice + 1, pontos, atual, proximo, progresso };
}
