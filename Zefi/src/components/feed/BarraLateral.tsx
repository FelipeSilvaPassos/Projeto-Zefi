import { Link } from 'react-router-dom';
import { rotuloCategoria } from '../../types/categoria';
import PainelConquistas from '../conquistas/PainelConquistas';
import AvatarUsuario from '../perfil/AvatarUsuario';
import ProximaRecompensa from '../recompensas/ProximaRecompensa';
import type { PerfilSocial } from '../../types/perfilSocial';
import type { Usuario } from '../../types/usuario';

interface BarraLateralProps {
  usuario: Usuario;
  social: PerfilSocial;
}

export default function BarraLateral({ usuario, social }: BarraLateralProps) {
  return (
    <aside className="flex flex-col gap-4" aria-label="Seu resumo">
      <article className="rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-sm">
        <div className="flex justify-center">
          <AvatarUsuario nome={usuario.nome} foto={social.foto} tamanho="grande" />
        </div>
        <p className="mt-3 text-lg font-extrabold">{usuario.nome}</p>
        <p className="text-sm text-gray-600">{rotuloCategoria(usuario.categoriaInteresse)}</p>
        {social.bio && <p className="mt-2 text-sm text-gray-800">{social.bio}</p>}

        <p className="mt-3 text-3xl font-extrabold text-[#168BC4]">
          {usuario.pontosAcumulados} <span className="text-base font-bold">pts</span>
        </p>

        <Link to="/perfil" className="mt-2 inline-block text-sm font-bold text-[#168BC4] underline">
          Ver e editar perfil
        </Link>
      </article>

      <ProximaRecompensa saldo={usuario.pontosAcumulados} compacto />
      <PainelConquistas usuario={usuario} compacto />
    </aside>
  );
}
