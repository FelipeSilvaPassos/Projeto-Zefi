
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Missao } from '../../types/missao';
import { rotuloCategoria } from '../../types/categoria';
import ModalDetalhesMissao from './ModalDetalhesMissao';
import { descricaoDaMissao } from '../../data/descricoesMissoes';
import '../../style/components/CardMissao.css';

interface CardMissaoProps {
  missao: Missao;
}

export default function CardMissao({ missao }: CardMissaoProps) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
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
          {descricaoDaMissao(missao).resumo}
        </p>

        <button
          type="button"
          className="card-missao-link"
          onClick={() => setModalAberto(true)}
        >
          Saber mais...
        </button>

        <Link to={`/missoes/${missao.id}`} className="card-missao-link">
          Abrir página da missão
        </Link>
      </article>

      {modalAberto && (
        <ModalDetalhesMissao
          missaoId={missao.id}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </>
  );
}
