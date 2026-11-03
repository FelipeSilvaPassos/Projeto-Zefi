import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';
import { useUsuario } from '../context/useUsuario';
import { useRequisicao } from '../hooks/useRequisicao';
import { Carregando, MensagemErro } from '../components/ui/Estados';
import { estiloBotaoSecundario } from '../components/ui/estilos';
import PainelConquistas from '../components/conquistas/PainelConquistas';
import ProximaRecompensa from '../components/recompensas/ProximaRecompensa';
import CabecalhoPerfil from '../components/perfil/CabecalhoPerfil';
import FormEditarPerfil from '../components/perfil/FormEditarPerfil';
import { usePerfilSocial } from '../hooks/usePerfilSocial';
import BalaoFala from '../components/zefi/BalaoFala';
import ZefiAvatar from '../components/zefi/ZefiAvatar';
import { rotuloCategoria } from '../types/categoria';
import type { Usuario } from '../types/usuario';
import type { NivelEngajamento } from '../types/zefi';

const ROTULOS_NIVEL: Record<NivelEngajamento, string> = {
  BAIXO: 'Baixo',
  MEDIO: 'Médio',
  ALTO: 'Alto',
};

/** Mostra só os 2 últimos dígitos do CPF: ***.***.***-12 */
function mascararCpf(cpf: string): string {
  return `***.***.***-${cpf.slice(-2)}`;
}

function Dado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{rotulo}</dt>
      <dd className="mt-0.5 font-medium text-black">{valor}</dd>
    </div>
  );
}

function PerfilConteudo({ usuario }: { usuario: Usuario }) {
  const navegar = useNavigate();
  const { sair } = useUsuario();
  const { perfil: social, salvar: salvarSocial } = usePerfilSocial(usuario.cpf);
  const [editando, setEditando] = useState(false);

  const perfil = useRequisicao(() => usuarioService.perfil(usuario.cpf), [usuario.cpf]);
  const engajamento = useRequisicao(() => usuarioService.engajamento(usuario.cpf), [usuario.cpf]);

  async function handleSair() {
    try {
      await usuarioService.logout();
    } catch {
      // Mesmo que o servidor não responda, a sessão local é encerrada
    }
    navegar('/', { replace: true });
    sair();
  }

  const nivel: NivelEngajamento = engajamento.estado.status === 'sucesso' ? engajamento.estado.dados.nivel : 'MEDIO';

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 text-black">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {editando ? (
          <FormEditarPerfil
            usuario={usuario}
            social={social}
            aoSalvarSocial={salvarSocial}
            aoFechar={() => setEditando(false)}
          />
        ) : (
          <CabecalhoPerfil usuario={usuario} social={social} aoEditar={() => setEditando(true)} />
        )}

        <div className="flex flex-wrap items-center gap-4">
          <ZefiAvatar tamanho="medio" nivel={nivel} />
          <div className="min-w-0 flex-1">
            {engajamento.estado.status === 'sucesso' && <BalaoFala texto={engajamento.estado.dados.mensagemZefi} />}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Saldo de pontos */}
          <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Seus pontos</h2>

            {perfil.estado.status === 'carregando' && <Carregando />}
            {perfil.estado.status === 'erro' && (
              <MensagemErro mensagem={perfil.estado.mensagem} aoTentarNovamente={perfil.recarregar} />
            )}
            {perfil.estado.status === 'sucesso' && (
              <>
                <p className="mt-2 text-5xl font-extrabold text-[#168BC4]">
                  {perfil.estado.dados.usuario.pontosAcumulados}
                </p>
                <p className="mt-3 text-sm text-gray-700">
                  {perfil.estado.dados.pontosParaProximaRecompensa > 0
                    ? `Faltam ${perfil.estado.dados.pontosParaProximaRecompensa} pontos para a próxima recompensa.`
                    : 'Você já pode resgatar qualquer recompensa!'}
                </p>
                <p className="mt-2 text-sm text-gray-500">{perfil.estado.dados.mensagemZefi}</p>
              </>
            )}
          </article>

          {/* Engajamento */}
          <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Seu engajamento</h2>

            {engajamento.estado.status === 'carregando' && <Carregando />}
            {engajamento.estado.status === 'erro' && (
              <MensagemErro mensagem={engajamento.estado.mensagem} aoTentarNovamente={engajamento.recarregar} />
            )}
            {engajamento.estado.status === 'sucesso' && (
              <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-sky-50 p-3">
                  <dd className="text-xl font-extrabold">{ROTULOS_NIVEL[engajamento.estado.dados.nivel]}</dd>
                  <dt className="text-xs text-gray-600">Nível</dt>
                </div>
                <div className="rounded-xl bg-sky-50 p-3">
                  <dd className="text-xl font-extrabold">{engajamento.estado.dados.acoesUltimos7Dias}</dd>
                  <dt className="text-xs text-gray-600">Ações em 7 dias</dt>
                </div>
                <div className="rounded-xl bg-sky-50 p-3">
                  <dd className="text-xl font-extrabold">{engajamento.estado.dados.recomendacoesIgnoradas}</dd>
                  <dt className="text-xs text-gray-600">Missões ignoradas</dt>
                </div>
              </dl>
            )}
          </article>
        </div>

        {/* Conquistas em níveis */}
        <PainelConquistas usuario={usuario} />

        {/* Recompensas */}
        <ProximaRecompensa
          saldo={perfil.estado.status === 'sucesso' ? perfil.estado.dados.usuario.pontosAcumulados : usuario.pontosAcumulados}
        />

        {/* Dados da conta */}
        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Seus dados</h2>

          <dl className="grid gap-4 sm:grid-cols-2">
            <Dado rotulo="Nome" valor={usuario.nome} />
            <Dado rotulo="E-mail" valor={usuario.email} />
            <Dado rotulo="Cidade" valor={usuario.cidade} />
            <Dado rotulo="Categoria de interesse" valor={rotuloCategoria(usuario.categoriaInteresse)} />
            <Dado rotulo="CPF" valor={mascararCpf(usuario.cpf)} />
          </dl>
        </article>

        <div className="flex justify-end">
          <button type="button" onClick={handleSair} className={estiloBotaoSecundario}>
            Sair da conta
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Perfil() {
  const { usuario } = useUsuario();

  if (!usuario) return null; // a rota é protegida; isto só satisfaz o TypeScript

  return <PerfilConteudo usuario={usuario} />;
}
