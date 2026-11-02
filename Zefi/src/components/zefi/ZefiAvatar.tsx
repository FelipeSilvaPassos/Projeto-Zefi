
import type { NivelEngajamento } from '../../types/zefi';

interface ZefiAvatarProps {
  nivel?: NivelEngajamento;
  tamanho?: 'pequeno' | 'medio' | 'grande';
}

const TAMANHOS = {
  pequeno: 'h-12 w-12',
  medio: 'h-24 w-24',
  grande: 'h-40 w-40 md:h-56 md:w-56',
};

const CORES: Record<NivelEngajamento, string> = {
  BAIXO: 'bg-white opacity-100',
  MEDIO: 'bg-white',
  ALTO: 'bg-white ring-4 ring-energia',
};

export default function ZefiAvatar({
  nivel = 'MEDIO',
  tamanho = 'medio',
}: ZefiAvatarProps) {
  return (
    <div
      role="img"
      aria-label={`Zefi, nível de engajamento ${nivel.toLowerCase()}`}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border-[-1px] border-black ${TAMANHOS[tamanho]} ${CORES[nivel]}`}
    >
      <img
        src="/imgs-zefi/icone_piscando.png"
        alt=""
        className="h-full w-full object-contain p-2"
      />
    </div>
  );
}
