type Tamanho = 'pequeno' | 'medio' | 'grande';

interface AvatarUsuarioProps {
  nome: string;
  foto: string | null;
  tamanho?: Tamanho;
}

const TAMANHOS: Record<Tamanho, string> = {
  pequeno: 'h-10 w-10 text-sm',
  medio: 'h-14 w-14 text-lg',
  grande: 'h-28 w-28 text-4xl',
};

/** Foto do usuário ou, se não houver, as iniciais do nome */
export default function AvatarUsuario({ nome, foto, tamanho = 'medio' }: AvatarUsuarioProps) {
  const iniciais = nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

  return foto ? (
    <img
      src={foto}
      alt={`Foto de ${nome}`}
      className={`shrink-0 rounded-full border-2 border-white object-cover shadow ${TAMANHOS[tamanho]}`}
    />
  ) : (
    <span
      role="img"
      aria-label={`Avatar de ${nome}`}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#55BDF0] font-extrabold text-black ${TAMANHOS[tamanho]}`}
    >
      {iniciais}
    </span>
  );
}
