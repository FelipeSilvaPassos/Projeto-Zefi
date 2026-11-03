import type { Conquista, NivelConquista } from '../../types/conquista';

const NIVEIS: Record<NivelConquista, { texto: string; medalha: string; cor: string }> = {
  bronze: { texto: 'Bronze', medalha: '🥉', cor: 'bg-orange-100 text-orange-800' },
  prata: { texto: 'Prata', medalha: '🥈', cor: 'bg-gray-200 text-gray-800' },
  ouro: { texto: 'Ouro', medalha: '🥇', cor: 'bg-yellow-100 text-yellow-800' },
};

export default function MedalhaConquista({ conquista }: { conquista: Conquista }) {
  const { titulo, emoji, unidade, atual, nivelAtual, proxima, progresso } = conquista;
  const bloqueada = nivelAtual === null;

  return (
    <li className={`flex flex-col gap-3 rounded-xl border border-sky-100 bg-white p-4 ${bloqueada ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-2xl ${
            bloqueada ? 'grayscale' : ''
          }`}
        >
          {emoji}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">{titulo}</p>
          {nivelAtual ? (
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${NIVEIS[nivelAtual].cor}`}>
              {NIVEIS[nivelAtual].medalha} {NIVEIS[nivelAtual].texto}
            </span>
          ) : (
            <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              🔒 Bloqueada
            </span>
          )}
        </div>
      </div>

      <div>
        <div
          role="progressbar"
          aria-label={`Progresso em ${titulo}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progresso}
          className="h-2 overflow-hidden rounded-full bg-sky-100"
        >
          <div className="h-full rounded-full bg-[#55BDF0] transition-all" style={{ width: `${progresso}%` }} />
        </div>

        <p className="mt-1 text-xs text-gray-600">
          {proxima
            ? `${atual}/${proxima.meta} ${unidade} para a medalha de ${NIVEIS[proxima.nivel].texto.toLowerCase()}`
            : 'Nível máximo alcançado! 🎉'}
        </p>
      </div>
    </li>
  );
}
