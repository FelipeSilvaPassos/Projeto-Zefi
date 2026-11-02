
import { CATEGORIAS, type Categoria } from '../../types/categoria';

interface FiltroMissoesProps {
  categoriaSelecionada: Categoria | '';
  onCategoriaChange: (categoria: Categoria | '') => void;
}

export default function FiltroMissoes({
  categoriaSelecionada,
  onCategoriaChange,
}: FiltroMissoesProps) {
  return (
    <div>
      <label htmlFor="filtro-categoria">Filtrar por categoria: </label>

      <select
        id="filtro-categoria"
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
