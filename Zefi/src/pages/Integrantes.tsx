interface Integrante {
  nome: string;
  rm: string;
  github: string;
  linkedin: string;
}

const INTEGRANTES: Integrante[] = [
  {
    nome: 'Felipe Passos',
    rm: 'RM569411',
    github: 'https://github.com/FelipeSilvaPassos',
    linkedin: 'https://www.linkedin.com/in/felipe-passos-110668397/',
  },
  {
    nome: 'Gabriel Canevari',
    rm: 'RM570730',
    github: 'https://github.com/Canevari2',
    linkedin: 'https://www.linkedin.com/in/gabriel-canevari-476825382/',
  },
];

/** Iniciais do nome para o "avatar" do card: Felipe Passos -> FP */
function iniciais(nome: string): string {
  return nome
    .split(' ')
    .map((parte) => parte[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const estiloLink =
  'rounded-xl border-2 border-[#55BDF0] bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#BFEAFF]';

export default function Integrantes() {
  return (
    <section className="bg-[#F7FBFE] px-4 py-12 text-black">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10 text-center">
          <img
            src="/imgs-zefi/icone_feliz.png"
            alt=""
            className="mx-auto mb-4 h-20 w-20 object-contain"
          />
          <h1 className="text-3xl font-extrabold tracking-tight">Quem faz o Zefi</h1>
          <p className="mt-2 text-gray-600">
            Conheça a equipe por trás do avatar inteligente do Soul Up.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2">
          {INTEGRANTES.map((integrante) => (
            <li
              key={integrante.rm}
              className="flex flex-col items-center gap-4 rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm"
            >
              <div
                aria-hidden="true"
                className="flex h-24 w-24 items-center justify-center rounded-full bg-[#BFEAFF] text-3xl font-extrabold text-[#168BC4]"
              >
                {iniciais(integrante.nome)}
              </div>

              <div>
                <h2 className="text-xl font-bold">{integrante.nome}</h2>
                <p className="text-sm font-medium text-gray-600">{integrante.rm}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub de ${integrante.nome}`}
                  className={estiloLink}
                >
                  GitHub
                </a>
                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${integrante.nome}`}
                  className={estiloLink}
                >
                  LinkedIn
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
