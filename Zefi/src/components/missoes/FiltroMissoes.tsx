
import { CATEGORIAS, type Categoria } from '../../types/categoria';
import '../../style/components/FiltroMissoes.css';

interface FiltroMissoesProps {
  categoriaSelecionada: Categoria | '';
  onCategoriaChange: (categoria: Categoria | '') => void;
}

export default function FiltroMissoes({
  categoriaSelecionada,
  onCategoriaChange,
}: FiltroMissoesProps) {
  return (
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
  );
}
