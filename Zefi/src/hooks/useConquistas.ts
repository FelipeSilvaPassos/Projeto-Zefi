import { useMemo } from 'react';
import { acaoService } from '../services/acaoService';
import { usuarioService } from '../services/usuarioService';
import { calcularConquistas, calcularJornada } from '../utils/conquistas.ts';
import { useRequisicao } from './useRequisicao';
import type { Conquista, ResumoJornada } from '../types/conquista.ts';
import type { Usuario } from '../types/usuario';

const LIMITE_ACOES = 50;

interface Atividade {
  totalAcoes: number;
  pontosDasAcoes: number;
  categoriasDistintas: number;
  acoesUltimos7Dias: number;
}

export interface ResumoConquistas {
  conquistas: Conquista[];
  jornada: ResumoJornada;
}

/** Busca a atividade do usuário na API e calcula conquistas e nível da jornada */
export function useConquistas(usuario: Usuario) {
  const { estado, recarregar } = useRequisicao<Atividade>(async () => {
    const [acoes, engajamento] = await Promise.all([
      acaoService.listar(usuario.cpf, LIMITE_ACOES),
      usuarioService.engajamento(usuario.cpf),
    ]);

    return {
      totalAcoes: acoes.length,
      pontosDasAcoes: acoes.reduce((soma, acao) => soma + acao.pontosAtribuidos, 0),
      categoriasDistintas: new Set(acoes.map((acao) => acao.categoriaDetectada).filter((c) => c !== 'geral')).size,
      acoesUltimos7Dias: engajamento.acoesUltimos7Dias,
    };
  }, [usuario.cpf]);

  const resumo = useMemo<ResumoConquistas | null>(() => {
    if (estado.status !== 'sucesso') return null;

    // Usa o maior valor entre o saldo e os pontos das ações, para o nível não cair ao resgatar uma recompensa
    const pontos = Math.max(usuario.pontosAcumulados, estado.dados.pontosDasAcoes);

    return {
      conquistas: calcularConquistas({
        totalAcoes: estado.dados.totalAcoes,
        pontos,
        categoriasDistintas: estado.dados.categoriasDistintas,
        acoesUltimos7Dias: estado.dados.acoesUltimos7Dias,
      }),
      jornada: calcularJornada(pontos),
    };
  }, [estado, usuario.pontosAcumulados]);

  return { estado, resumo, recarregar };
}
