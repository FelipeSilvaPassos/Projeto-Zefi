export interface Recompensa {
  id: number;
  nome: string;
  custo: number;
}

export interface ResgateResponse {
  recompensa: string;
  custo: number;
  novoSaldo: number;
  mensagemZefi: string;
}
