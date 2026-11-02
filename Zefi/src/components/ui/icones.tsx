
import type { SVGProps } from "react";

export type NomeIcone =
  | "folha"
  | "energia"
  | "reciclagem"
  | "agua"
  | "transporte"
  | "seta-direita"
  | "seta-esquerda"
  | "check"
  | "fechar"
  | "menu"
  | "localizacao"
  | "usuario"
  | "estrela";

type PropsIcone = SVGProps<SVGSVGElement> & {
  nome: NomeIcone;
  tamanho?: number;
};

const desenhos: Record<NomeIcone, React.ReactNode> = {
  folha: (
    <>
      <path d="M20 4C11 4 5 8 5 15a5 5 0 0 0 5 5c7 0 11-6 10-16Z" />
      <path d="M4 21c3-6 7-9 13-13" />
    </>
  ),
  energia: (
    <path d="M13 2 5 13h6l-1 9 9-12h-6l0-8Z" />
  ),
  reciclagem: (
    <>
      <path d="m9 5 3-3 3 3" />
      <path d="M12 2v6" />
      <path d="M15 5h2a3 3 0 0 1 2.6 1.5l1 1.7" />
      <path d="m20 5 1 3-3 1" />
      <path d="m19 15 1 4-4 1" />
      <path d="m20 19-5-3" />
      <path d="M15 20H7a3 3 0 0 1-2.6-1.5l-1-1.7" />
      <path d="m3 19-1-3 3-1" />
      <path d="m5 9-1-4 4-1" />
      <path d="m4 5 5 3" />
    </>
  ),
  agua: (
    <path d="M12 2.5S5 10 5 14a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5Z" />
  ),
  transporte: (
    <>
      <rect x="3" y="5" width="18" height="13" rx="3" />
      <path d="M7 18v2m10-2v2M3 12h18M7 9h.01M17 9h.01" />
    </>
  ),
  "seta-direita": <path d="M5 12h14m-6-6 6 6-6 6" />,
  "seta-esquerda": <path d="M19 12H5m6 6-6-6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  fechar: <path d="m18 6-12 12M6 6l12 12" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  localizacao: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  estrela: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
};

export function Icone({
  nome,
  tamanho = 20,
  ...props
}: PropsIcone) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {desenhos[nome]}
    </svg>
  );
}
