import { requisicao } from './api';
import type { AcaoSustentavel, AvaliacaoAcaoResponse } from '../types/acao';

export const acaoService = {
  registrar: (cpf: string, descricao: string) =>
    requisicao<AvaliacaoAcaoResponse>(`/api/usuarios/${cpf}/acoes`, {
      metodo: 'POST',
      corpo: { descricao },
      autenticada: true,
    }),

  listar: (cpf: string, limite = 10) =>
    requisicao<AcaoSustentavel[]>(`/api/usuarios/${cpf}/acoes?limite=${limite}`, { autenticada: true }),
};
