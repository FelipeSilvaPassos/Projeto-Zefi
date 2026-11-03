import { useRef, useState, type FormEvent } from 'react';
import { usuarioService } from '../../services/usuarioService';
import { useUsuario } from '../../context/useUsuario';
import { CATEGORIAS, type Categoria } from '../../types/categoria';
import { LIMITE_BIO, type PerfilSocial } from '../../types/perfilSocial';
import { prepararFoto } from '../../utils/imagem';
import { MensagemErro } from '../ui/Estados';
import { estiloBotaoPrimario, estiloBotaoSecundario, estiloCampo } from '../ui/estilos';
import Spinner from '../ui/Spinner';
import AvatarUsuario from './AvatarUsuario';
import type { Usuario } from '../../types/usuario';

interface FormEditarPerfilProps {
  usuario: Usuario;
  social: PerfilSocial;
  aoSalvarSocial: (social: PerfilSocial) => boolean;
  aoFechar: () => void;
}

export default function FormEditarPerfil({ usuario, social, aoSalvarSocial, aoFechar }: FormEditarPerfilProps) {
  const { atualizarUsuario } = useUsuario();
  const inputArquivo = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState(usuario.nome);
  const [cidade, setCidade] = useState(usuario.cidade);
  const [categoria, setCategoria] = useState<Categoria>(usuario.categoriaInteresse);
  const [bio, setBio] = useState(social.bio);
  const [foto, setFoto] = useState<string | null>(social.foto);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function escolherFoto(arquivo: File | undefined) {
    if (!arquivo) return;
    setErro('');
    try {
      setFoto(await prepararFoto(arquivo));
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível usar essa foto.');
    }
  }

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro('');

    if (nome.trim().length < 3) {
      setErro('O nome precisa ter pelo menos 3 caracteres.');
      return;
    }
    if (!cidade.trim()) {
      setErro('Informe a sua cidade.');
      return;
    }

    setSalvando(true);

    try {
      const mudouDadosDaConta =
        nome.trim() !== usuario.nome || cidade.trim() !== usuario.cidade || categoria !== usuario.categoriaInteresse;

      if (mudouDadosDaConta) {
        const atualizado = await usuarioService.atualizar(usuario.cpf, {
          nome: nome.trim(),
          email: usuario.email,
          cidade: cidade.trim(),
          categoriaInteresse: categoria,
        });
        atualizarUsuario(atualizado);
      }

      const gravou = aoSalvarSocial({ bio: bio.trim(), foto });
      if (!gravou) {
        setErro('Seus dados foram salvos, mas a foto/bio só vale nesta visita (armazenamento do navegador indisponível).');
        return;
      }

      aoFechar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Editar perfil</h2>

      <div className="mb-5 flex flex-wrap items-center gap-4">
        <AvatarUsuario nome={nome || usuario.nome} foto={foto} tamanho="grande" />

        <div className="flex flex-col gap-2">
          <input
            ref={inputArquivo}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            aria-label="Escolher foto de perfil"
            onChange={(e) => {
              void escolherFoto(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => inputArquivo.current?.click()}
            className={`${estiloBotaoSecundario} px-4 py-2 text-sm`}
          >
            Trocar foto
          </button>
          {foto && (
            <button type="button" onClick={() => setFoto(null)} className="text-sm font-semibold text-red-700 underline">
              Remover foto
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} className={estiloCampo(false)} maxLength={100} />
        </label>

        <label className="block text-sm font-bold">
          Cidade
          <input value={cidade} onChange={(e) => setCidade(e.target.value)} className={estiloCampo(false)} maxLength={60} />
        </label>

        <label className="block text-sm font-bold sm:col-span-2">
          Categoria de interesse
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as Categoria)}
            className={estiloCampo(false)}
          >
            {CATEGORIAS.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.rotulo}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold sm:col-span-2">
          Bio
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, LIMITE_BIO))}
            rows={3}
            placeholder="Conte um pouco sobre você e sobre o que te move a cuidar do planeta..."
            className={estiloCampo(false)}
          />
          <span className="text-xs font-normal text-gray-500">
            {bio.length}/{LIMITE_BIO} caracteres
          </span>
        </label>
      </div>

      {erro && (
        <div className="mt-4">
          <MensagemErro mensagem={erro} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={aoFechar} disabled={salvando} className={estiloBotaoSecundario}>
          Cancelar
        </button>
        <button type="submit" disabled={salvando} className={`${estiloBotaoPrimario} flex items-center gap-2`}>
          {salvando && <Spinner tamanho="pequeno" />}
          Salvar alterações
        </button>
      </div>
    </form>
  );
}
