import { useEffect, useMemo, useState } from 'react';
import { missaoService } from '../services/missaoService';
import type { Missao } from '../types/missao';
import type { Categoria } from '../types/categoria';

import CardMissao from '../components/missoes/CardMissao';
import FiltroMissoes from '../components/missoes/FiltroMissoes';
import '../style/pages/Missoes.css';

export default function Missoes() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [categoria, setCategoria] = useState<Categoria | ''>('');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarMissoes() {
      setCarregando(true);
      setErro('');

      try {
        const dados = await missaoService.listar(
          categoria === '' ? undefined : categoria
        );

        setMissoes(dados);
      } catch (error) {
        console.error('Erro ao carregar missões:', error);
        setErro('Não foi possível carregar as missões.');
      } finally {
        setCarregando(false);
      }
    }

    carregarMissoes();
  }, [categoria]);

  const missoesFiltradas = useMemo(() => {
    return missoes.filter((missao) =>
      missao.nome.toLowerCase().includes(busca.trim().toLowerCase())
    );
  }, [missoes, busca]);

  return (
    <section className="pagina-missoes">
      <header className="pagina-missoes-cabecalho">
        <span className="pagina-missoes-selo">Missões</span>
        <h1 className="pagina-missoes-titulo">
          Missões do <span className="pagina-missoes-destaque">Zefi</span>
        </h1>
        <p className="pagina-missoes-subtitulo">
          Escolha uma missão, cuide do planeta e ganhe Ecoa.
        </p>
      </header>

      <FiltroMissoes
        categoriaSelecionada={categoria}
        onCategoriaChange={setCategoria}
        busca={busca}
        onBuscaChange={setBusca}
      />

      {carregando && (
        <p className="pagina-missoes-status">Carregando missões...</p>
      )}

      {erro && (
        <p className="pagina-missoes-status pagina-missoes-status--erro">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        missoesFiltradas.length === 0 ? (
          <p className="pagina-missoes-status">Nenhuma missão encontrada.</p>
        ) : (
          <div className="lista-missoes">
            {missoesFiltradas.map((missao) => (
              <CardMissao key={missao.id} missao={missao} />
            ))}
          </div>
        )
      )}
    </section>
  );
}
