import { CATEGORIAS, type Categoria } from '../../types/categoria';
import '../../style/components/FiltroMissoes.css';

interface FiltroMissoesProps {
  categoriaSelecionada: Categoria | '';
  onCategoriaChange: (categoria: Categoria | '') => void;
  busca: string;
  onBuscaChange: (busca: string) => void;
}

export default function FiltroMissoes({
  categoriaSelecionada,
  onCategoriaChange,
  busca,
  onBuscaChange,
}: FiltroMissoesProps) {
  return (
    <div className="filtros-missoes">

      <div className="filtro-missoes">
        <label htmlFor="busca-missao" className="filtro-missoes-label">
          Pesquisar missão
        </label>

        <input
          id="busca-missao"
          className="filtro-missoes-input"
          type="text"
          placeholder="Digite o nome da missão..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
      </div>

      <div className="filtro-missoes">
        <label htmlFor="filtro-categoria" className="filtro-missoes-label">
          Filtrar por categoria
        </label>

        <select
          id="filtro-categoria"
          className="filtro-missoes-select"
          value={categoriaSelecionada}
          onChange={(e) =>
            onCategoriaChange(e.target.value as Categoria | '')
          }
        >
          <option value="">Todas as categorias</option>

          {CATEGORIAS.map((categoria) => (
            <option key={categoria.valor} value={categoria.valor}>
              {categoria.rotulo}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}