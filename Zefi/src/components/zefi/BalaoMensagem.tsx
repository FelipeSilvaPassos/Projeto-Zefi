import ZefiAvatar from '../zefi/ZefiAvatar';
import { rotuloCategoria } from '../../types/categoria';
import type { MensagemChat } from '../../types/chat';

interface BalaoMensagemProps {
  mensagem: MensagemChat;
}

export default function BalaoMensagem({ mensagem }: BalaoMensagemProps) {
  const { autor, texto, pontos, categoria, progresso, erro } = mensagem;

  // Mensagem do usuário: alinhada à direita
  if (autor === 'usuario') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#55BDF0] px-4 py-3 text-sm leading-relaxed text-black shadow-sm md:max-w-[70%]">
          {texto}
        </p>
      </div>
    );
  }

  // Mensagem do Zefi: alinhada à esquerda, com avatar
  return (
    <div className="flex items-end gap-2">
      <ZefiAvatar tamanho="pequeno" />

      <div
        className={`max-w-[85%] rounded-2xl rounded-bl-sm border px-4 py-3 shadow-sm md:max-w-[70%] ${
          erro ? 'border-red-200 bg-red-50 text-red-800' : 'border-sky-100 bg-white text-gray-800'
        }`}
      >
        <p className="text-sm leading-relaxed">{texto}</p>

        {pontos !== undefined && categoria && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-800">
              +{pontos} pontos
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
              {rotuloCategoria(categoria)}
            </span>
          </div>
        )}

        {progresso && <p className="mt-2 text-xs text-gray-500">{progresso}</p>}
      </div>
    </div>
  );
}
