import { requisicao } from './api';
import type { Recompensa, ResgateResponse } from '../types/recompensa';

export const recompensaService = {
  catalogo: () => requisicao<Recompensa[]>('/api/recompensas'),

  resgatar: (cpf: string, recompensaId: number) =>
    requisicao<ResgateResponse>(`/api/usuarios/${cpf}/resgates`, {
      metodo: 'POST',
      corpo: { recompensaId },
      autenticada: true,
    }),
};
