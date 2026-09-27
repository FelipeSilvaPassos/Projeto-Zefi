import { requisicao } from './api';
import type { AceiteResponse, Missao, RecomendacaoResponse } from '../types/missao';
import type { Categoria } from '../types/categoria';

export const missaoService = {
  listar: (categoria?: Categoria) =>
    requisicao<Missao[]>(`/api/missoes${categoria ? `?categoria=${encodeURIComponent(categoria)}` : ''}`),

  buscar: (id: number) => requisicao<Missao>(`/api/missoes/${id}`),

  recomendacao: (cpf: string) =>
    requisicao<RecomendacaoResponse>(`/api/usuarios/${cpf}/recomendacao`, { autenticada: true }),

  aceitar: (cpf: string, recomendacaoId: number) =>
    requisicao<AceiteResponse>(`/api/usuarios/${cpf}/recomendacoes/${recomendacaoId}/aceitar`, {
      metodo: 'PUT',
      autenticada: true,
    }),
};
