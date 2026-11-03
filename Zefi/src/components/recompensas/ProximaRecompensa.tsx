import { Link } from 'react-router-dom';
import { recompensaService } from '../../services/recompensaService';
import { useRequisicao } from '../../hooks/useRequisicao';
import { Carregando, MensagemErro } from '../ui/Estados';

interface ProximaRecompensaProps {
  saldo: number;
  /** Versão menor para a barra lateral do feed */
  compacto?: boolean;
}

/** Mostra a recompensa mais próxima de ser alcançada, com barra de progresso */
export default function ProximaRecompensa({ saldo, compacto = false }: ProximaRecompensaProps) {
  const catalogo = useRequisicao(() => recompensaService.catalogo(), []);

  return (
    <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">🎁 Recompensas</h2>
        <Link to="/recompensas" className="text-sm font-bold text-[#168BC4] underline">
          Ver todas
        </Link>
      </div>

      {catalogo.estado.status === 'carregando' && <Carregando texto="Carregando recompensas..." />}

      {catalogo.estado.status === 'erro' && (
        <MensagemErro mensagem={catalogo.estado.mensagem} aoTentarNovamente={catalogo.recarregar} />
      )}

      {catalogo.estado.status === 'sucesso' && (() => {
        const ordenado = [...catalogo.estado.dados].sort((a, b) => a.custo - b.custo);
        const disponiveis = ordenado.filter((r) => r.custo <= saldo);
        const proxima = ordenado.find((r) => r.custo > saldo);

        if (ordenado.length === 0) return <p className="mt-3 text-sm text-gray-600">Nenhuma recompensa disponível.</p>;

        const progresso = proxima ? Math.min(100, Math.round((saldo / proxima.custo) * 100)) : 100;

        return (
          <div className="mt-3 flex flex-col gap-3">
            <p className="text-sm text-gray-700">
              <strong>{disponiveis.length}</strong> de {ordenado.length} já podem ser resgatadas com os seus{' '}
              <strong>{saldo}</strong> pontos.
            </p>

            {proxima ? (
              <div>
                <p className="text-sm font-semibold">
                  Próxima: {proxima.nome} <span className="text-[#168BC4]">({proxima.custo} pts)</span>
                </p>
                <div
                  role="progressbar"
                  aria-label={`Progresso para ${proxima.nome}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progresso}
                  className="my-1 h-3 overflow-hidden rounded-full bg-sky-100"
                >
                  <div className="h-full rounded-full bg-[#55BDF0] transition-all" style={{ width: `${progresso}%` }} />
                </div>
                <p className="text-xs text-gray-600">Faltam {proxima.custo - saldo} pontos.</p>
              </div>
            ) : (
              <p className="rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800">
                Você já pode resgatar qualquer recompensa! 🎉
              </p>
            )}

            {!compacto && (
              <Link
                to="/recompensas"
                className="self-start rounded-xl bg-[#55BDF0] px-4 py-2 text-sm font-bold text-black hover:bg-[#BFEAFF]"
              >
                Resgatar recompensas
              </Link>
            )}
          </div>
        );
      })()}
    </article>
  );
}
