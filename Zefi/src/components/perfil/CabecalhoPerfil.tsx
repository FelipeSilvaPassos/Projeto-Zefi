import { rotuloCategoria } from '../../types/categoria';
import { estiloBotaoSecundario } from '../ui/estilos';
import AvatarUsuario from './AvatarUsuario';
import type { PerfilSocial } from '../../types/perfilSocial';
import type { Usuario } from '../../types/usuario';

interface CabecalhoPerfilProps {
  usuario: Usuario;
  social: PerfilSocial;
  aoEditar: () => void;
}

export default function CabecalhoPerfil({ usuario, social, aoEditar }: CabecalhoPerfilProps) {
  return (
    <header className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-[#55BDF0] to-[#BFEAFF]" aria-hidden="true" />

      <div className="flex flex-wrap items-end gap-4 px-6 pb-6">
        <div className="-mt-14">
          <AvatarUsuario nome={usuario.nome} foto={social.foto} tamanho="grande" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-extrabold tracking-tight">{usuario.nome}</h1>
          <p className="text-sm text-gray-600">
            📍 {usuario.cidade} · {rotuloCategoria(usuario.categoriaInteresse)}
          </p>
        </div>

        <button type="button" onClick={aoEditar} className={`${estiloBotaoSecundario} px-4 py-2 text-sm`}>
          Editar perfil
        </button>

        <p className="w-full text-gray-800">
          {social.bio || <span className="text-gray-500">Você ainda não escreveu uma bio. Conte um pouco sobre você!</span>}
        </p>
      </div>
    </header>
  );
}
