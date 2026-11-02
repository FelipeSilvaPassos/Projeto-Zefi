import { Link } from 'react-router-dom';
import type { Missao } from '../../types/missao';
import { rotuloCategoria } from '../../types/categoria';
import '../../style/components/CardMissao.css';

interface CardMissaoProps {
  missao: Missao;
}

export default function CardMissao({ missao }: CardMissaoProps) {
  return (
    <article className="card-missao">
      <div className="card-missao-topo">
        <span className="card-missao-categoria">
          {rotuloCategoria(missao.categoria)}
        </span>

        <span className="card-missao-pontos">
          {missao.pontosRecompensa} Ecoa
        </span>
      </div>

      <h2 className="card-missao-titulo">{missao.nome}</h2>

      <p className="card-missao-descricao">
        Complete esta missão e contribua para um mundo mais sustentável.
      </p>

      <Link to={`/missoes/${missao.id}`} className="card-missao-link">
        Saber mais...
      </Link>
    </article>
  );
}