// Fundo do site: gradiente animado nas cores do Zefi, sempre atrás do conteúdo.
// A animação (animate-gradiente) é definida no index.css e para quando o usuário
// pede menos movimento no sistema (motion-reduce).
export default function FundoAnimado() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 animate-gradiente bg-linear-to-br from-ceu via-white to-folha/50 bg-size-[300%_300%] motion-reduce:animate-none"
    />
  );
}
