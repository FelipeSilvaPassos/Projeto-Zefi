
import type { NomeIcone } from "../components/ui/icones";

// Valores preservados para manter compatibilidade com a API
export type Categoria =
  | "energia"
  | "moda"
  | "alimentação"
  | "reciclagem"
  | "transporte";

export const CATEGORIAS: {
  valor: Categoria;
  rotulo: string;
  icone: NomeIcone;
}[] = [
  {
    valor: "energia",
    rotulo: "Energia",
    icone: "energia",
  },
  {
    valor: "moda",
    rotulo: "Moda Sustentável",
    icone: "folha",
  },
  {
    valor: "alimentação",
    rotulo: "Alimentação Consciente",
    icone: "folha",
  },
  {
    valor: "reciclagem",
    rotulo: "Reciclagem",
    icone: "reciclagem",
  },
  {
    valor: "transporte",
    rotulo: "Transporte Sustentável",
    icone: "transporte",
  },
];

export function rotuloCategoria(categoria: string): string {
  return (
    CATEGORIAS.find((c) => c.valor === categoria)?.rotulo ??
    categoria
  );
}
