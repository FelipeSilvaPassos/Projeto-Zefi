import { useConquistas } from '../../hooks/useConquistas';
import { Carregando, MensagemErro } from '../ui/Estados';
import MedalhaConquista from './MedalhaConquista';
import type { Usuario } from '../../types/usuario';

interface PainelConquistasProps {
  usuario: Usuario;
  /** Versão resumida para a barra lateral do feed */
  compacto?: boolean;
}

export default function PainelConquistas({ usuario, compacto = false }: PainelConquistasProps) {
  const { estado, resumo, recarregar } = useConquistas(usuario);

  return (
    <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Conquistas</h2>

      {estado.status === 'carregando' && <Carregando texto="Carregando conquistas..." />}

      {estado.status === 'erro' && <MensagemErro mensagem={estado.mensagem} aoTentarNovamente={recarregar} />}

      {resumo && (
        <div className="mt-3 flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-xl bg-sky-50 p-4">
            <span aria-hidden="true" className="text-4xl">
              {resumo.jornada.atual.emoji}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-extrabold">
                Nível {resumo.jornada.numero} · {resumo.jornada.atual.nome}
              </p>

              <div
                role="progressbar"
                aria-label="Progresso até o próximo nível"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={resumo.jornada.progresso}
                className="my-1 h-2 overflow-hidden rounded-full bg-white"
              >
                <div
                  className="h-full rounded-full bg-[#168BC4] transition-all"
                  style={{ width: `${resumo.jornada.progresso}%` }}
                />
              </div>

              <p className="text-xs text-gray-600">
                {resumo.jornada.proximo
                  ? `Faltam ${resumo.jornada.proximo.minimo - resumo.jornada.pontos} pontos para ${resumo.jornada.proximo.nome}`
                  : 'Você chegou ao nível máximo!'}
              </p>
            </div>
          </div>

          {compacto ? (
            <p className="text-sm text-gray-700">
              {resumo.conquistas.filter((c) => c.nivelAtual).length} de {resumo.conquistas.length} conquistas:{' '}
              {resumo.conquistas.map((c) => (c.nivelAtual ? `${c.emoji}` : '🔒')).join(' ')}
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {resumo.conquistas.map((conquista) => (
                <MedalhaConquista key={conquista.id} conquista={conquista} />
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
