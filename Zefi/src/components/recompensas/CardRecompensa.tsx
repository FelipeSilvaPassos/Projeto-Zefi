import { estiloBotaoPrimario, estiloBotaoSecundario } from '../ui/estilos';
import Spinner from '../ui/Spinner';
import type { Recompensa } from '../../types/recompensa';

interface CardRecompensaProps {
  recompensa: Recompensa;
  saldo: number;
  confirmando: boolean;
  resgatando: boolean;
  /** Algum outro resgate está em andamento */
  ocupado: boolean;
  aoPedirConfirmacao: () => void;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export default function CardRecompensa({
  recompensa,
  saldo,
  confirmando,
  resgatando,
  ocupado,
  aoPedirConfirmacao,
  aoConfirmar,
  aoCancelar,
}: CardRecompensaProps) {
  const podeResgatar = saldo >= recompensa.custo;
  const progresso = Math.min(100, Math.round((saldo / recompensa.custo) * 100));

  return (
    <li
      className={`flex flex-col justify-between gap-4 rounded-2xl border-2 p-5 shadow-sm ${
        podeResgatar ? 'border-[#55BDF0] bg-white' : 'border-sky-100 bg-white/70'
      }`}
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-3xl">
          {podeResgatar ? '🎁' : '🔒'}
        </span>
        <div>
          <p className="text-lg font-bold">{recompensa.nome}</p>
          <p className="font-semibold text-[#168BC4]">{recompensa.custo} pontos</p>
        </div>
      </div>

      <div>
        <div
          role="progressbar"
          aria-label={`Progresso para ${recompensa.nome}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progresso}
          className="h-2 overflow-hidden rounded-full bg-sky-100"
        >
          <div className="h-full rounded-full bg-[#55BDF0]" style={{ width: `${progresso}%` }} />
        </div>
        <p className="mt-1 text-xs text-gray-600">
          {podeResgatar ? 'Disponível para resgate!' : `Faltam ${recompensa.custo - saldo} pontos`}
        </p>
      </div>

      {!confirmando ? (
        <button
          type="button"
          disabled={!podeResgatar || ocupado}
          onClick={aoPedirConfirmacao}
          className={`${estiloBotaoPrimario} py-2 text-sm`}
        >
          Resgatar
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Gastar {recompensa.custo} pontos nesta recompensa?</p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={resgatando}
              onClick={aoConfirmar}
              className={`${estiloBotaoPrimario} flex items-center gap-2 px-4 py-2 text-sm`}
            >
              {resgatando && <Spinner tamanho="pequeno" />}
              Confirmar
            </button>
            <button
              type="button"
              disabled={resgatando}
              onClick={aoCancelar}
              className={`${estiloBotaoSecundario} px-4 py-2 text-sm`}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
