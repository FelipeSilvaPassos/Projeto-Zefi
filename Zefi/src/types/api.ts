/** Formato de erro devolvido pela API Java */
export interface ErroApi {
  status: number;
  mensagem: string;
}

/** Union discriminada com os 3 estados de qualquer requisicao */
export type EstadoRequisicao<T> =
  | { status: 'carregando' }
  | { status: 'erro'; mensagem: string }
  | { status: 'sucesso'; dados: T };
