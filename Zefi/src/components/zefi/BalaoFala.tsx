
interface BalaoFalaProps {
  texto: string;
}

export default function BalaoFala({ texto }: BalaoFalaProps) {
  return (
    <div
      role="status"
      className="relative w-fit max-w-sm rounded-2xl border border-sky-100 bg-white p-4 shadow-lg shadow-sky-100/70"
    >
      <div className="flex items-center gap-3">
        <img
          src="/imgs-zefi/icone_feliz.png"
          alt="Zefi feliz"
          className="h-12 w-12 shrink-0 object-contain"
        />

        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-bold text-black">Zefi</span>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
              Agora
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-700">
            {texto}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 border-b border-r border-sky-100 bg-white"
      />
    </div>
  );
}
