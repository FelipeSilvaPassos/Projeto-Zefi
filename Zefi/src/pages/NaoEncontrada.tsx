import { Link } from 'react-router-dom';
import { estiloBotaoPrimario } from '../components/ui/estilos';

export default function NaoEncontrada() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#F7FBFE] px-4 py-12 text-black">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <img
          src="/imgs-zefi/icone_triste.png"
          alt=""
          className="h-28 w-28 object-contain"
        />

        <p className="text-6xl font-extrabold text-[#168BC4]">404</p>

        <h1 className="text-2xl font-extrabold tracking-tight">
          Ops! Essa página saiu ventando por aí
        </h1>

        <p className="text-gray-600">
          Não encontrei o endereço que você procurou. Que tal voltar para o início e continuar sua jornada sustentável?
        </p>

        <Link to="/" className={estiloBotaoPrimario}>
          Voltar para a Home
        </Link>
      </div>
    </section>
  );
}
