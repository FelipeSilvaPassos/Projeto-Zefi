import { Link, useParams } from 'react-router-dom';
import { missaoService } from '../services/missaoService';
import { useRequisicao } from '../hooks/useRequisicao';
import { descricaoDaMissao } from '../data/descricoesMissoes';
import { rotuloCategoria } from '../types/categoria';
import { Carregando, MensagemErro } from '../components/ui/Estados';
import { estiloBotaoPrimario, estiloBotaoSecundario } from '../components/ui/estilos';
import { useUsuario } from '../context/useUsuario';
import type { Missao } from '../types/missao';

function Detalhe({ missao }: { missao: Missao }) {
  const { usuario } = useUsuario();
  const descricao = descricaoDaMissao(missao);

  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <header>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#168BC4]">
          {rotuloCategoria(missao.categoria)}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{missao.nome}</h1>
        <p className="mt-2 text-gray-700">{descricao.descricao}</p>
      </header>

      <section>
        <h2 className="mb-2 text-lg font-bold">Como fazer</h2>
        <ol className="list-decimal space-y-1 pl-5 text-gray-800">
          {descricao.passos.map((passo) => (
            <li key={passo}>{passo}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl bg-sky-50 p-4">
        <h2 className="mb-1 text-lg font-bold">Seu impacto</h2>
        <p className="text-gray-800">{descricao.impacto}</p>
      </section>

      <p className="rounded-xl bg-green-50 p-4 font-bold text-green-800">
        Recompensa: {missao.pontosRecompensa} Pontos Ecoa
      </p>

      <div className="flex flex-wrap gap-3">
        <Link to="/missoes" className={estiloBotaoSecundario}>
          Voltar para as missões
        </Link>
        <Link to={usuario ? '/' : '/cadastro'} className={estiloBotaoPrimario}>
          {usuario ? 'Pedir esta missão ao Zefi' : 'Criar conta para participar'}
        </Link>
      </div>
    </article>
  );
}

export default function MissaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const idNumerico = Number(id);
  const idValido = Number.isInteger(idNumerico) && idNumerico > 0;

  const missao = useRequisicao(
    () => (idValido ? missaoService.buscar(idNumerico) : Promise.reject(new Error('Missão inválida.'))),
    [idNumerico, idValido],
  );

  return (
    <section className="bg-[#F7FBFE] px-4 py-10 text-black">
      <div className="mx-auto w-full max-w-3xl">
        {missao.estado.status === 'carregando' && <Carregando texto="Carregando a missão..." />}

        {missao.estado.status === 'erro' && (
          <div className="flex flex-col gap-4">
            <MensagemErro
              mensagem={idValido ? 'Não encontramos essa missão.' : missao.estado.mensagem}
              aoTentarNovamente={idValido ? missao.recarregar : undefined}
            />
            <Link to="/missoes" className={`${estiloBotaoSecundario} self-start`}>
              Ver todas as missões
            </Link>
          </div>
        )}

        {missao.estado.status === 'sucesso' && <Detalhe missao={missao.estado.dados} />}
      </div>
    </section>
  );
}
