import { useState } from 'react';
import { Link } from 'react-router-dom';
import { recompensaService } from '../services/recompensaService';
import { usuarioService } from '../services/usuarioService';
import { useUsuario } from '../context/useUsuario';
import { useRequisicao } from '../hooks/useRequisicao';
import { Carregando, EstadoVazio, MensagemErro } from '../components/ui/Estados';
import CardRecompensa from '../components/recompensas/CardRecompensa';
import ProximaRecompensa from '../components/recompensas/ProximaRecompensa';
import type { Recompensa } from '../types/recompensa';
import type { Usuario } from '../types/usuario';

interface Aviso {
  texto: string;
  erro: boolean;
}

function RecompensasConteudo({ usuario }: { usuario: Usuario }) {
  const { atualizarUsuario } = useUsuario();

  const perfil = useRequisicao(() => usuarioService.perfil(usuario.cpf), [usuario.cpf]);
  const catalogo = useRequisicao(() => recompensaService.catalogo(), []);

  const [confirmandoId, setConfirmandoId] = useState<number | null>(null);
  const [resgatandoId, setResgatandoId] = useState<number | null>(null);
  const [aviso, setAviso] = useState<Aviso | null>(null);

  const saldo = perfil.estado.status === 'sucesso' ? perfil.estado.dados.usuario.pontosAcumulados : usuario.pontosAcumulados;

  async function resgatar(recompensa: Recompensa) {
    setAviso(null);
    setResgatandoId(recompensa.id);

    try {
      const resposta = await recompensaService.resgatar(usuario.cpf, recompensa.id);
      atualizarUsuario({ ...usuario, pontosAcumulados: resposta.novoSaldo });
      setAviso({ texto: resposta.mensagemZefi, erro: false });
      perfil.recarregar();
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
    <section className="bg-[#F7FBFE] px-4 py-8 text-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#55BDF0] to-[#BFEAFF] p-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Recompensas</h1>
            <p className="text-black/80">Troque as suas boas ações por benefícios de verdade.</p>
          </div>

          <div className="rounded-2xl bg-white px-6 py-3 text-center shadow">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Seu saldo</p>
            <p className="text-4xl font-extrabold text-[#168BC4]">{saldo}</p>
            <p className="text-xs text-gray-600">pontos</p>
          </div>
        </header>

        <ProximaRecompensa saldo={saldo} compacto />

        {aviso && (
          <p
            role={aviso.erro ? 'alert' : 'status'}
            className={`rounded-xl border p-3 text-sm font-medium ${
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...catalogo.estado.dados]
              .sort((a, b) => a.custo - b.custo)
              .map((recompensa) => (
                <CardRecompensa
                  key={recompensa.id}
                  recompensa={recompensa}
                  saldo={saldo}
                  confirmando={confirmandoId === recompensa.id}
                  resgatando={resgatandoId === recompensa.id}
                  ocupado={resgatandoId !== null}
                  aoPedirConfirmacao={() => setConfirmandoId(recompensa.id)}
                  aoConfirmar={() => void resgatar(recompensa)}
                  aoCancelar={() => setConfirmandoId(null)}
                />
              ))}
          </ul>
        )}

        <p className="text-center text-sm text-gray-600">
          Quer mais pontos? Veja as <Link to="/missoes" className="font-bold text-[#168BC4] underline">missões</Link> ou
          conte ao <Link to="/chat" className="font-bold text-[#168BC4] underline">Zefi</Link> o que você fez hoje.
        </p>
      </div>
    </section>
  );
}

export default function Recompensas() {
  const { usuario } = useUsuario();
  if (!usuario) return null; // a rota é protegida; isto só satisfaz o TypeScript
  return <RecompensasConteudo usuario={usuario} />;
}
