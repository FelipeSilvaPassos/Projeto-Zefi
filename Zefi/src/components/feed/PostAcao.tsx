import { rotuloCategoria } from '../../types/categoria';
import { tempoRelativo } from '../../utils/tempo';
import AvatarUsuario from '../perfil/AvatarUsuario';
import ZefiAvatar from '../zefi/ZefiAvatar';
import type { AcaoSustentavel } from '../../types/acao';
import type { Usuario } from '../../types/usuario';

interface PostAcaoProps {
  acao: AcaoSustentavel;
  usuario: Usuario;
  foto: string | null;
  comentarioZefi?: string;
}

export default function PostAcao({ acao, usuario, foto, comentarioZefi }: PostAcaoProps) {
  const quando = tempoRelativo(acao.dataRegistro);

  return (
    <li className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <AvatarUsuario nome={usuario.nome} foto={foto} tamanho="medio" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{usuario.nome}</p>
          {quando && <p className="text-xs text-gray-500">{quando}</p>}
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-extrabold text-green-800">
          +{acao.pontosAtribuidos} pts
        </span>
      </div>

      <p className="mt-3 whitespace-pre-line break-words text-gray-900">{acao.descricao}</p>

      {acao.categoriaDetectada && acao.categoriaDetectada !== 'geral' && (
        <p className="mt-2">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#168BC4]">
            #{rotuloCategoria(acao.categoriaDetectada)}
          </span>
        </p>
      )}

      {comentarioZefi && (
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50 p-3">
          <ZefiAvatar tamanho="pequeno" nivel="ALTO" />
          <p className="text-sm">
            <strong>Zefi:</strong> {comentarioZefi}
          </p>
        </div>
      )}
    </li>
  );
}
