// Union type com as 5 categorias aceitas pela API
export type Categoria = 'energia' | 'moda' | 'alimentação' | 'reciclagem' | 'transporte';

export const CATEGORIAS: { valor: Categoria; rotulo: string }[] = [
  { valor: 'energia', rotulo: '⚡ Energia' },
  { valor: 'moda', rotulo: '👕 Moda Sustentável' },
  { valor: 'alimentação', rotulo: '🥗 Alimentação Consciente' },
  { valor: 'reciclagem', rotulo: '♻️ Reciclagem' },
  { valor: 'transporte', rotulo: '🚲 Transporte Sustentável' },
];

export function rotuloCategoria(categoria: string): string {
  return CATEGORIAS.find((c) => c.valor === categoria)?.rotulo ?? categoria;
}
