
 // Classes Tailwind reutilizadas nos formulários e botões
export const estiloCampo = (comErro: boolean): string =>
  `mt-1 w-full rounded-xl border-2 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-[#55BDF0] ${
    comErro ? 'border-red-400' : 'border-sky-200'
  }`;

export const estiloBotaoPrimario =
  'rounded-xl bg-[#55BDF0] px-6 py-3 font-bold text-black transition-colors hover:bg-[#BFEAFF] disabled:cursor-not-allowed disabled:opacity-60';

export const estiloBotaoSecundario =
  'rounded-xl border-2 border-[#55BDF0] bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-[#BFEAFF] disabled:opacity-60';
