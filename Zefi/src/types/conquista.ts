export type TipoConquista = 'acoes' | 'pontos' | 'categorias' | 'constancia';
export type NivelConquista = 'bronze' | 'prata' | 'ouro';

/** Dados do usuário usados para calcular as conquistas */
export interface MetricasUsuario {
  totalAcoes: number;
  pontos: number;
  categoriasDistintas: number;
  acoesUltimos7Dias: number;
}

/** Como cada conquista é definida (metas de cada medalha) */
export interface DefinicaoConquista {
  id: TipoConquista;
  titulo: string;
  emoji: string;
  unidade: string;
  metas: Record<NivelConquista, number>;
}

export interface ProximaMeta {
  nivel: NivelConquista;
  meta: number;
}

/** Intersection type: a definição + o resultado calculado para o usuário */
export type Conquista = DefinicaoConquista & {
  atual: number;
  nivelAtual: NivelConquista | null;
  proxima: ProximaMeta | null;
  /** Progresso de 0 a 100 até a próxima medalha */
  progresso: number;
};

/** Nível geral da jornada do usuário (Semente, Broto, Árvore...) */
export interface NivelJornada {
  nome: string;
  emoji: string;
  minimo: number;
}

export interface ResumoJornada {
  numero: number;
  pontos: number;
  atual: NivelJornada;
  proximo: NivelJornada | null;
  progresso: number;
}
