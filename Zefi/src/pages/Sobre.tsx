import { Link } from 'react-router-dom';
import { PASSOS_SOBRE, TECNOLOGIAS_SOBRE } from '../data/sobre';
import { estiloBotaoPrimario, estiloBotaoSecundario } from '../components/ui/estilos';

export default function Sobre() {
  return (
    <section className="bg-[#F7FBFE] px-4 py-12 text-black">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="flex flex-col items-center gap-4 text-center">
          <img src="/imgs-zefi/icone_feliz.png" alt="" aria-hidden="true" className="h-24 w-24 object-contain" />
          <h1 className="text-4xl font-extrabold tracking-tight">Sobre o Zefi</h1>
          <p className="max-w-2xl text-lg text-gray-700">
            O Zefi é o avatar inteligente do <strong>Soul Up</strong>. Ele transforma pequenas atitudes sustentáveis do
            dia a dia em pontos, missões e recompensas.
          </p>
        </header>

        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold">O problema que queremos resolver</h2>
          <p className="text-gray-700">
            Muita gente quer agir pelo planeta, mas não sabe por onde começar nem enxerga o resultado dos pequenos
            gestos. Sem acompanhamento e sem incentivo, o hábito se perde. O Zefi acompanha a jornada do usuário,
            reconhece cada ação e mostra a evolução, o que mantém a motivação viva.
          </p>
        </article>

        <section aria-labelledby="como-funciona">
          <h2 id="como-funciona" className="mb-4 text-2xl font-bold">
            Como funciona
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {PASSOS_SOBRE.map((passo, indice) => (
              <li key={passo.titulo} className="flex gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#55BDF0] font-extrabold"
                >
                  {indice + 1}
                </span>
                <div>
                  <h3 className="font-bold">{passo.titulo}</h3>
                  <p className="text-sm text-gray-700">{passo.descricao}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold">Tecnologias</h2>
          <p className="mb-4 text-gray-700">
            Front-end em React com TypeScript, conectado a uma API REST em Java com banco Oracle.
          </p>
          <ul className="flex flex-wrap gap-2">
            {TECNOLOGIAS_SOBRE.map((tecnologia) => (
              <li key={tecnologia} className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-[#168BC4]">
                {tecnologia}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold">Quem fez</h2>
          <p className="text-gray-700">
            Projeto desenvolvido por estudantes de Análise e Desenvolvimento de Sistemas da FIAP para o Challenge 2026,
            em parceria com o Soul Up.
          </p>
        </article>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/integrantes" className={estiloBotaoSecundario}>
            Conheça a equipe
          </Link>
          <Link to="/cadastro" className={estiloBotaoPrimario}>
            Começar agora
          </Link>
        </div>
      </div>
    </section>
  );
}
