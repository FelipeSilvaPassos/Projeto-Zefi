
import { useEffect, useState } from 'react';
import type { Missao } from '../../types/missao';
import { rotuloCategoria } from '../../types/categoria';
import { missaoService } from '../../services/missaoService';
import { descricaoDaMissao } from '../../data/descricoesMissoes';
import '../../style/components/ModalDetalhesMissao.css';

interface ModalDetalhesMissaoProps {
  missaoId: number;
  onFechar: () => void;
}

export default function ModalDetalhesMissao({
  missaoId,
  onFechar,
}: ModalDetalhesMissaoProps) {
  const [missao, setMissao] = useState<Missao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const dados = await missaoService.buscar(missaoId);
        setMissao(dados);
      } catch (error) {
        console.error('Erro ao buscar detalhes da missão:', error);
        setErro('Não foi possível carregar os detalhes da missão.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDetalhes();
  }, [missaoId]);

  useEffect(() => {
    function fecharComEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') onFechar();
    }

    document.addEventListener('keydown', fecharComEsc);
    return () => document.removeEventListener('keydown', fecharComEsc);
  }, [onFechar]);

  return (
    <div className="modal-missao-overlay" onClick={onFechar}>
      <section
        className="modal-missao"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-missao-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-missao-fechar"
          onClick={onFechar}
          aria-label="Fechar detalhes"
        >
          &times;
        </button>

        {carregando && (
          <p className="modal-missao-status">Carregando detalhes...</p>
        )}

        {erro && (
          <p className="modal-missao-status modal-missao-erro">{erro}</p>
        )}

        {missao && !carregando && !erro && (
          <>
            <span className="modal-missao-categoria">
              {rotuloCategoria(missao.categoria)}
            </span>

            <h2 id="modal-missao-titulo" className="modal-missao-titulo">
              {missao.nome}
            </h2>

            <p className="modal-missao-descricao">
              {descricaoDaMissao(missao).descricao}
            </p>

            <div className="modal-missao-secao">
              <h3 className="modal-missao-secao-titulo">Como fazer</h3>

              <ol className="modal-missao-passos">
                {descricaoDaMissao(missao).passos.map((passo) => (
                  <li key={passo}>{passo}</li>
                ))}
              </ol>
            </div>

            <div className="modal-missao-impacto">
              <h3 className="modal-missao-secao-titulo">Seu impacto</h3>
              <p>{descricaoDaMissao(missao).impacto}</p>
            </div>

            <div className="modal-missao-recompensa">
              <span>Recompensa</span>
              <strong>{missao.pontosRecompensa} Pontos Ecoa</strong>
            </div>

            <button
              type="button"
              className="modal-missao-botao"
              onClick={onFechar}
            >
              Fechar
            </button>
          </>
        )}
      </section>
    </div>
  );
}
