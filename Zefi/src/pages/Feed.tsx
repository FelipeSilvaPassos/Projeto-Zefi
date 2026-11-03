import { useState } from 'react';
import { Link } from 'react-router-dom';
import { acaoService } from '../services/acaoService';
import { useUsuario } from '../context/useUsuario';
import { usePerfilSocial } from '../hooks/usePerfilSocial';
import { useRequisicao } from '../hooks/useRequisicao';
import BarraLateral from '../components/feed/BarraLateral';
import CartaoMissaoZefi from '../components/feed/CartaoMissaoZefi';
import CompositorPost from '../components/feed/CompositorPost';
import PostAcao from '../components/feed/PostAcao';
import { Carregando, EstadoVazio, MensagemErro } from '../components/ui/Estados';
import type { ComentariosZefi } from '../types/feed';
import type { Usuario } from '../types/usuario';

const LIMITE_POSTS = 20;

function FeedConteudo({ usuario }: { usuario: Usuario }) {
  const { atualizarUsuario } = useUsuario();
  const { perfil: social } = usePerfilSocial(usuario.cpf);

  const acoes = useRequisicao(() => acaoService.listar(usuario.cpf, LIMITE_POSTS), [usuario.cpf]);
  const [comentarios, setComentarios] = useState<ComentariosZefi>({});
  // Muda a cada ação nova para a barra lateral buscar pontos e conquistas de novo
  const [versao, setVersao] = useState(0);

  const atualizarTudo = () => {
    acoes.recarregar();
    setVersao((v) => v + 1);
  };

  async function publicar(texto: string): Promise<string | null> {
    try {
      const resposta = await acaoService.registrar(usuario.cpf, texto);
      atualizarUsuario({ ...usuario, pontosAcumulados: resposta.novoSaldo });
      setComentarios((atuais) => ({ ...atuais, [resposta.acaoId]: resposta.mensagemZefi }));
      atualizarTudo();
      return null;
    } catch (erro) {
      return erro instanceof Error ? erro.message : 'Não foi possível publicar. Tente novamente.';
    }
  }

  return (
    <section className="bg-[#F7FBFE] px-4 py-6 text-black">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Olá, {usuario.nome.split(' ')[0]}! 👋
          </h1>

          <CompositorPost usuario={usuario} foto={social.foto} aoPublicar={publicar} />

          <CartaoMissaoZefi usuario={usuario} aoAceitar={atualizarTudo} />

          <h2 className="mt-2 text-lg font-bold">Sua linha do tempo</h2>

          {acoes.estado.status === 'carregando' && <Carregando texto="Carregando seu feed..." />}

          {acoes.estado.status === 'erro' && (
            <MensagemErro mensagem={acoes.estado.mensagem} aoTentarNovamente={acoes.recarregar} />
          )}

          {acoes.estado.status === 'sucesso' && acoes.estado.dados.length === 0 && (
            <EstadoVazio titulo="Seu feed ainda está vazio">
              <p className="text-sm text-gray-600">
                Publique a sua primeira ação sustentável acima ou veja as{' '}
                <Link to="/missoes" className="font-bold text-[#168BC4] underline">
                  missões
                </Link>
                .
              </p>
            </EstadoVazio>
          )}

          {acoes.estado.status === 'sucesso' && acoes.estado.dados.length > 0 && (
            <ul className="flex flex-col gap-4">
              {acoes.estado.dados.map((acao) => (
                <PostAcao
                  key={acao.id}
                  acao={acao}
                  usuario={usuario}
                  foto={social.foto}
                  comentarioZefi={comentarios[acao.id]}
                />
              ))}
            </ul>
          )}
        </div>

        <BarraLateral key={versao} usuario={usuario} social={social} />
      </div>
    </section>
  );
}

export default function Feed() {
  const { usuario } = useUsuario();
  if (!usuario) return null;
  return <FeedConteudo usuario={usuario} />;
}
