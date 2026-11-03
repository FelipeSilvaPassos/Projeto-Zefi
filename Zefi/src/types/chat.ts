export type AutorMensagem = 'zefi' | 'usuario';

export interface MensagemChat {
  id: string;
  autor: AutorMensagem;
  texto: string;
  /** Preenchidos quando o Zefi avalia uma ação */
  pontos?: number;
  categoria?: string;
  progresso?: string;
  /** Mensagem de erro (mostrada em vermelho) */
  erro?: boolean;
}
