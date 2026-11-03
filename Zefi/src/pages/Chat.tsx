import { useEffect, useRef, useState, type FormEvent } from 'react';
import { acaoService } from '../services/acaoService';
import { useUsuario } from '../context/useUsuario';
import BalaoMensagem from '../components/zefi/BalaoMensagem';
import { estiloBotaoPrimario, estiloCampo } from '../components/ui/estilos';
import Spinner from '../components/ui/Spinner';
import type { MensagemChat } from '../types/chat';

// Mesmos limites validados pelo backend (AcaoBO)
const TAMANHO_MINIMO = 5;
const TAMANHO_MAXIMO = 500;
const QUANTIDADE_HISTORICO = 10;

export default function Chat() {
  const { usuario, atualizarUsuario } = useUsuario();

  const [historico, setHistorico] = useState<MensagemChat[]>([]);
  const [conversa, setConversa] = useState<MensagemChat[]>([]);
  const [texto, setTexto] = useState('');
  const [erroCampo, setErroCampo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [carregandoHistorico, setCarregandoHistorico] = useState(true);

  const listaRef = useRef<HTMLDivElement>(null);
  const contadorId = useRef(0);

  const cpf = usuario?.cpf;

  function novoId(): string {
    contadorId.current += 1;
    return `msg-${contadorId.current}`;
  }

  // Carrega as últimas ações do usuário como conversa anterior
  useEffect(() => {
    if (!cpf) return;
    let ativo = true;

    acaoService
      .listar(cpf, QUANTIDADE_HISTORICO)
      .then((acoes) => {
        if (!ativo) return;

        // A API devolve da mais nova para a mais antiga: invertemos para ler de cima para baixo
        const mensagens: MensagemChat[] = [...acoes].reverse().flatMap((acao) => [
          { id: `hist-u-${acao.id}`, autor: 'usuario' as const, texto: acao.descricao },
          {
            id: `hist-z-${acao.id}`,
            autor: 'zefi' as const,
            texto: 'Registrei essa ação para você!',
            pontos: acao.pontosAtribuidos,
            categoria: acao.categoriaDetectada,
          },
        ]);

        setHistorico(mensagens);
      })
      .catch(() => {
        // Sem histórico a conversa continua funcionando normalmente
      })
      .finally(() => {
        if (ativo) setCarregandoHistorico(false);
      });

    return () => {
      ativo = false;
    };
  }, [cpf]);

  // Mantém a conversa rolada até a última mensagem
  useEffect(() => {
    const lista = listaRef.current;
    if (lista) lista.scrollTop = lista.scrollHeight;
  }, [historico, conversa, enviando]);

  if (!usuario) return null; // a rota é protegida; isto só satisfaz o TypeScript

  const boasVindas: MensagemChat = {
    id: 'boas-vindas',
    autor: 'zefi',
    texto: `Oi, ${usuario.nome.split(' ')[0]}! Eu sou o Zefi 🌬️ Me conta o que você fez de bom pelo planeta hoje, e eu te dou pontos!`,
  };

  const mensagens = [boasVindas, ...historico, ...conversa];

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!usuario || enviando) return;

    const descricao = texto.trim();

    if (descricao.length < TAMANHO_MINIMO) {
      setErroCampo(`Conte um pouco mais: use pelo menos ${TAMANHO_MINIMO} caracteres.`);
      return;
    }

    setErroCampo('');
    setEnviando(true);
    setTexto('');
    setConversa((atual) => [...atual, { id: novoId(), autor: 'usuario', texto: descricao }]);

    try {
      const resposta = await acaoService.registrar(usuario.cpf, descricao);

      setConversa((atual) => [
        ...atual,
        {
          id: novoId(),
          autor: 'zefi',
          texto: resposta.mensagemZefi,
          pontos: resposta.pontos,
          categoria: resposta.categoria,
          progresso: resposta.progresso,
        },
      ]);

      // Atualiza o saldo de pontos mostrado no topo
      atualizarUsuario({ ...usuario, pontosAcumulados: resposta.novoSaldo });
    } catch (erro) {
      setConversa((atual) => [
        ...atual,
        {
          id: novoId(),
          autor: 'zefi',
          erro: true,
          texto: erro instanceof Error ? erro.message : 'Não consegui registrar sua ação. Tente novamente.',
        },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="bg-[#F7FBFE] px-4 py-8 text-black">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Chat com o Zefi</h1>
            <p className="text-gray-600">Conte uma ação sustentável e ganhe pontos na hora.</p>
          </div>

          <p className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
            Seu saldo: <span className="text-[#168BC4]">{usuario.pontosAcumulados} pontos</span>
          </p>
        </header>

        <div
          ref={listaRef}
          role="log"
          aria-live="polite"
          aria-label="Conversa com o Zefi"
          className="flex h-[55vh] flex-col gap-4 overflow-y-auto rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"
        >
          {carregandoHistorico && (
            <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Spinner tamanho="pequeno" /> Carregando conversa anterior...
            </p>
          )}

          {mensagens.map((mensagem) => (
            <BalaoMensagem key={mensagem.id} mensagem={mensagem} />
          ))}

          {enviando && (
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <Spinner tamanho="pequeno" /> O Zefi está pensando...
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
          <label htmlFor="mensagem-chat" className="sr-only">
            Conte o que você fez
          </label>

          <div className="flex gap-2">
            <input
              id="mensagem-chat"
              type="text"
              value={texto}
              maxLength={TAMANHO_MAXIMO}
              disabled={enviando}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ex.: separei o lixo reciclável hoje"
              aria-invalid={erroCampo !== ''}
              className={`${estiloCampo(erroCampo !== '')} mt-0 flex-1`}
            />

            <button type="submit" disabled={enviando} className={estiloBotaoPrimario}>
              Enviar
            </button>
          </div>

          {erroCampo && (
            <p role="alert" className="text-sm font-medium text-red-700">
              {erroCampo}
            </p>
          )}

          <p className="text-right text-xs text-gray-500">
            {texto.length}/{TAMANHO_MAXIMO}
          </p>
        </form>
      </div>
    </section>
  );
}
