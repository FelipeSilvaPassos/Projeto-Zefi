export interface AcaoSustentavel {
  id: number;
  cpfUsuario: string;
  descricao: string;
  categoriaDetectada: string;
  pontosAtribuidos: number;
  dataRegistro: string;
}

export interface AvaliacaoAcaoResponse {
  acaoId: number;
  categoria: string;
  pontos: number;
  novoSaldo: number;
  mensagemZefi: string;
  progresso: string;
}
