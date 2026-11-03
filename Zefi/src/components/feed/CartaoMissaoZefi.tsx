import { useState } from 'react';
import { missaoService } from '../../services/missaoService';
import { useUsuario } from '../../context/useUsuario';
import { rotuloCategoria } from '../../types/categoria';
import { estiloBotaoPrimario, estiloBotaoSecundario } from '../ui/estilos';
import Spinner from '../ui/Spinner';
import ZefiAvatar from '../zefi/ZefiAvatar';
import type { RecomendacaoResponse } from '../../types/missao';
import type { Usuario } from '../../types/usuario';

interface CartaoMissaoZefiProps {
  usuario: Usuario;
  /** Chamado depois que a missão é aceita (o feed recarrega pontos e conquistas) */
  aoAceitar: () => void;
}

/** O Zefi "posta" uma missão sob medida — só busca quando o usuário pede */
export default function CartaoMissaoZefi({ usuario, aoAceitar }: CartaoMissaoZefiProps) {
  const { atualizarUsuario } = useUsuario();

  const [recomendacao, setRecomendacao] = useState<RecomendacaoResponse | null>(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function pedirMissao() {
    setErro('');
    setMensagem('');
    setCarregando(true);
    try {
      setRecomendacao(await missaoService.recomendacao(usuario.cpf));
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível buscar uma missão agora.');
    } finally {
      setCarregando(false);
    }
  }

  async function aceitar() {
    if (!recomendacao?.recomendacaoId) return;
    setErro('');
    setCarregando(true);
    try {
      const resposta = await missaoService.aceitar(usuario.cpf, recomendacao.recomendacaoId);
      atualizarUsuario({ ...usuario, pontosAcumulados: resposta.novoSaldo });
      setMensagem(`${resposta.mensagemZefi} (+${resposta.pontosGanhos} pts)`);
      setRecomendacao(null);
      aoAceitar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível aceitar a missão.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <article className="rounded-2xl border-2 border-[#55BDF0] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <ZefiAvatar tamanho="medio" nivel="ALTO" />
        <div className="flex-1">
          <p className="font-bold">Zefi · Missão do dia</p>
          <p className="text-xs text-gray-500">Sugestão feita para você</p>
        </div>
      </div>

      {!recomendacao && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-700">{mensagem || 'Quer uma missão sob medida para ganhar pontos extras?'}</p>
          <button type="button" onClick={() => void pedirMissao()} disabled={carregando} className={`${estiloBotaoSecundario} flex items-center gap-2 px-4 py-2 text-sm`}>
            {carregando && <Spinner tamanho="pequeno" />}
            Pedir missão
          </button>
        </div>
      )}

      {recomendacao && (
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-sm text-gray-800">{recomendacao.mensagemZefi}</p>

          {recomendacao.missao ? (
            <>
              <div className="rounded-xl bg-sky-50 p-3">
                <p className="font-bold">{recomendacao.missao.nome}</p>
                <p className="text-sm text-gray-600">
                  {rotuloCategoria(recomendacao.missao.categoria)} · vale{' '}
                  <strong>{recomendacao.pontosPrevistos} pts</strong>
                  {recomendacao.bonusPersonalizacao && ' (com bônus de +10%)'}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled={carregando} onClick={() => void aceitar()} className={`${estiloBotaoPrimario} flex items-center gap-2 px-4 py-2 text-sm`}>
                  {carregando && <Spinner tamanho="pequeno" />}
                  Aceitar missão
                </button>
                <button type="button" disabled={carregando} onClick={() => setRecomendacao(null)} className={`${estiloBotaoSecundario} px-4 py-2 text-sm`}>
                  Agora não
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">Nenhuma missão disponível no momento.</p>
          )}
        </div>
      )}

      {erro && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-700">
          {erro}
        </p>
      )}
    </article>
  );
}
