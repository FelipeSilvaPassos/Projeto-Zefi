// Classes Tailwind reutilizadas nos formularios e botoes
export const estiloCampo = (comErro: boolean): string =>
  `mt-1 w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition-colors focus:border-brisa ${
    comErro ? 'border-red-400' : 'border-ceu'
  }`;

export const estiloBotaoPrimario =
  'rounded-xl bg-folha-escuro px-6 py-3 font-bold text-white transition-colors hover:bg-tinta disabled:cursor-not-allowed disabled:opacity-60';

export const estiloBotaoSecundario =
  'rounded-xl border-2 border-tinta px-6 py-3 font-bold transition-colors hover:bg-ceu disabled:opacity-60';
