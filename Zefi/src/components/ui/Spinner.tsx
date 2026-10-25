// Indicador de carregamento (anel girando) nas cores do Zefi
type Tamanho = 'pequeno' | 'medio' | 'grande';
type Velocidade = 'lenta' | 'normal' | 'rapida';

interface SpinnerProps {
  tamanho?: Tamanho;
  velocidade?: Velocidade;
  className?: string;
}

const TAMANHOS: Record<Tamanho, string> = {
  pequeno: 'h-4 w-4 border-2',
  medio: 'h-6 w-6 border-4',
  grande: 'h-10 w-10 border-4',
};

const VELOCIDADES: Record<Velocidade, string> = {
  lenta: '[animation-duration:1.8s]',
  normal: '[animation-duration:1s]',
  rapida: '[animation-duration:0.5s]',
};

export default function Spinner({ tamanho = 'medio', velocidade = 'normal', className = '' }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block animate-spin rounded-full border-brisa border-t-transparent motion-reduce:animate-none ${TAMANHOS[tamanho]} ${VELOCIDADES[velocidade]} ${className}`}
    />
  );
}
