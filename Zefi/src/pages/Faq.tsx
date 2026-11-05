import { Link } from 'react-router-dom';
import Accordion from '../components/ui/Accordion';
import { PERGUNTAS_FAQ } from '../data/faq';
import { estiloBotaoPrimario } from '../components/ui/estilos';

export default function Faq() {
  return (
    <section className="bg-[#F7FBFE] px-4 py-12 text-black">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Perguntas frequentes</h1>
          <p className="mt-2 text-gray-700">Tire as principais dúvidas sobre o Zefi e o Soul Up.</p>
        </header>

        <Accordion itens={PERGUNTAS_FAQ} />

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm">
          <p className="font-bold">Não encontrou a sua dúvida?</p>
          <Link to="/contato" className={estiloBotaoPrimario}>
            Fale com a gente
          </Link>
        </div>
      </div>
    </section>
  );
}
