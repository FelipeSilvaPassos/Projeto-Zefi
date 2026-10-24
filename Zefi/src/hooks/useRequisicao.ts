import { useCallback, useEffect, useState } from 'react';
import type { EstadoRequisicao } from '../types/api';

/** Executa uma chamada a API e controla os estados carregando / erro / sucesso. */
export function useRequisicao<T>(buscar: () => Promise<T>, dependencias: unknown[] = []) {
  const [estado, setEstado] = useState<EstadoRequisicao<T>>({ status: 'carregando' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const executar = useCallback(buscar, dependencias);

  const recarregar = useCallback(() => {
    setEstado({ status: 'carregando' });
    executar()
      .then((dados) => setEstado({ status: 'sucesso', dados }))
      .catch((erro: unknown) =>
        setEstado({ status: 'erro', mensagem: erro instanceof Error ? erro.message : 'Erro inesperado.' }));
  }, [executar]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { estado, recarregar };
}
