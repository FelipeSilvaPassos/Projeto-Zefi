import { useState, type FormEvent } from 'react';
import AvatarUsuario from '../perfil/AvatarUsuario';
import { estiloBotaoPrimario } from '../ui/estilos';
import Spinner from '../ui/Spinner';
import type { Usuario } from '../../types/usuario';

const MAXIMO = 280;

interface CompositorPostProps {
  usuario: Usuario;
  foto: string | null;
  /** Publica a ação; devolve uma mensagem de erro ou null se deu certo */
  aoPublicar: (texto: string) => Promise<string | null>;
}

export default function CompositorPost({ usuario, foto, aoPublicar }: CompositorPostProps) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (texto.trim().length < 5) {
      setErro('Conte um pouco mais sobre o que você fez (mínimo 5 caracteres).');
      return;
    }

    setErro('');
    setEnviando(true);
    const resultado = await aoPublicar(texto.trim());
    setEnviando(false);

    if (resultado) setErro(resultado);
    else setTexto('');
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <AvatarUsuario nome={usuario.nome} foto={foto} tamanho="medio" />

        <div className="min-w-0 flex-1">
          <label htmlFor="nova-acao" className="sr-only">
            O que você fez de sustentável hoje?
          </label>
          <textarea
            id="nova-acao"
            value={texto}
            onChange={(e) => setTexto(e.target.value.slice(0, MAXIMO))}
            rows={3}
            placeholder={`O que você fez de sustentável hoje, ${usuario.nome.split(' ')[0]}?`}
            className="w-full resize-none rounded-xl border-2 border-sky-100 p-3 outline-none focus:border-[#55BDF0]"
          />

          {erro && (
            <p role="alert" className="mt-1 text-sm font-medium text-red-700">
              {erro}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500">
              {texto.length}/{MAXIMO} · o Zefi avalia e te dá pontos
            </span>
            <button type="submit" disabled={enviando} className={`${estiloBotaoPrimario} flex items-center gap-2 px-5 py-2 text-sm`}>
              {enviando && <Spinner tamanho="pequeno" />}
              Publicar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
