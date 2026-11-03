import { useState } from 'react';
import { recompensaService } from '../../services/recompensaService';
import { useUsuario } from '../../context/useUsuario';
import { useRequisicao } from '../../hooks/useRequisicao';
import { Carregando, EstadoVazio, MensagemErro } from '../ui/Estados';
import { estiloBotaoPrimario, estiloBotaoSecundario } from '../ui/estilos';
import Spinner from '../ui/Spinner';
import type { Recompensa } from '../../types/recompensa';

interface CatalogoRecompensasProps {
  /** Saldo atual de pontos do usuário */
  saldo: number;
  /** Chamado depois de um resgate bem-sucedido (a página recarrega o saldo) */
  aoResgatar: () => void;
}

interface Aviso {
  texto: string;
  erro: boolean;
}

export default function CatalogoRecompensas({ saldo, aoResgatar }: CatalogoRecompensasProps) {
  const { usuario, atualizarUsuario } = useUsuario();
  const catalogo = useRequisicao(() => recompensaService.catalogo(), []);

  const [confirmandoId, setConfirmandoId] = useState<number | null>(null);
  const [resgatandoId, setResgatandoId] = useState<number | null>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);

  async function resgatar(recompensa: Recompensa) {
    if (!usuario) return;

    setAviso(null);
    setResgatandoId(recompensa.id);

    try {
      const resposta = await recompensaService.resgatar(usuario.cpf, recompensa.id);

      atualizarUsuario({ ...usuario, pontosAcumulados: resposta.novoSaldo });
      setAviso({ texto: resposta.mensagemZefi, erro: false });
      aoResgatar();
    } catch (erro) {
      setAviso({
        texto: erro instanceof Error ? erro.message : 'Não foi possível resgatar. Tente novamente.',
        erro: true,
      });
    } finally {
      setResgatandoId(null);
      setConfirmandoId(null);
    }
  }

  return (
    <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Recompensas</h2>
      <p className="mb-4 text-sm text-gray-600">Troque os seus pontos por recompensas do Soul Up.</p>

      {aviso && (
        <p
          role={aviso.erro ? 'alert' : 'status'}
          className={`mb-4 rounded-xl border p-3 text-sm font-medium ${
            aviso.erro ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'
          }`}
        >
          {aviso.texto}
        </p>
      )}

      {catalogo.estado.status === 'carregando' && <Carregando texto="Carregando recompensas..." />}

      {catalogo.estado.status === 'erro' && (
        <MensagemErro mensagem={catalogo.estado.mensagem} aoTentarNovamente={catalogo.recarregar} />
      )}

      {catalogo.estado.status === 'sucesso' && catalogo.estado.dados.length === 0 && (
        <EstadoVazio titulo="Nenhuma recompensa disponível por enquanto." />
      )}

      {catalogo.estado.status === 'sucesso' && catalogo.estado.dados.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-3">
          {catalogo.estado.dados.map((recompensa) => {
            const podeResgatar = saldo >= recompensa.custo;
            const confirmando = confirmandoId === recompensa.id;
            const resgatando = resgatandoId === recompensa.id;

            return (
              <li
                key={recompensa.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-sky-100 bg-sky-50/50 p-4"
              >
                <div>
                  <p className="font-bold">{recompensa.nome}</p>
                  <p className="text-sm font-semibold text-[#168BC4]">{recompensa.custo} pontos</p>
                </div>

                {!confirmando && (
                  <>
                    <button
                      type="button"
                      disabled={!podeResgatar || resgatandoId !== null}
                      onClick={() => setConfirmandoId(recompensa.id)}
                      className={`${estiloBotaoPrimario} px-4 py-2 text-sm`}
                    >
                      Resgatar
                    </button>
                    {!podeResgatar && (
                      <p className="text-xs text-gray-500">Faltam {recompensa.custo - saldo} pontos.</p>
                    )}
                  </>
                )}

                {confirmando && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium">Gastar {recompensa.custo} pontos?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={resgatando}
                        onClick={() => resgatar(recompensa)}
                        className={`${estiloBotaoPrimario} flex items-center gap-2 px-3 py-2 text-sm`}
                      >
                        {resgatando && <Spinner tamanho="pequeno" />}
                        Confirmar
                      </button>
                      <button
                        type="button"
                        disabled={resgatando}
                        onClick={() => setConfirmandoId(null)}
                        className={`${estiloBotaoSecundario} px-3 py-2 text-sm`}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
