import type { ReactNode } from 'react';
import ZefiAvatar from '../zefi/ZefiAvatar';

/** Mostrado enquanto os dados da API carregam */
export function Carregando({ texto = 'Carregando...' }: { texto?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-12 text-tinta/80">
      <span className="h-6 w-6 animate-spin rounded-full border-4 border-brisa border-t-transparent motion-reduce:animate-none" />
      {texto}
    </div>
  );
}

interface MensagemErroProps {
  mensagem: string;
  aoTentarNovamente?: () => void;
}

/** Mostrado quando a API falha */
export function MensagemErro({ mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
      <p className="font-semibold">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-3 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

/** Mostrado quando a lista vem vazia */
export function EstadoVazio({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-brisa bg-white p-8 text-center">
      <ZefiAvatar tamanho="medio" nivel="BAIXO" />
      <p className="text-lg font-bold">{titulo}</p>
      {children}
    </div>
  );
}
