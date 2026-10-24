import { useState } from 'react';

export interface ItemAccordion {
  pergunta: string;
  resposta: string;
}

/** Lista de perguntas que abrem e fecham (uma aberta por vez) */
export default function Accordion({ itens }: { itens: ItemAccordion[] }) {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ceu overflow-hidden rounded-2xl bg-white shadow-sm">
      {itens.map((item, indice) => {
        const estaAberto = aberto === indice;
        return (
          <li key={item.pergunta}>
            <button
              type="button"
              onClick={() => setAberto(estaAberto ? null : indice)}
              aria-expanded={estaAberto}
              aria-controls={`resposta-${indice}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold transition-colors hover:bg-ceu/40"
            >
              {item.pergunta}
              <span aria-hidden="true" className={`text-xl transition-transform ${estaAberto ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {estaAberto && (
              <p id={`resposta-${indice}`} className="px-5 pb-5 text-tinta/80">
                {item.resposta}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
