
import { useEffect, useState } from 'react';
import { missaoService } from '../services/missaoService';
import type { Missao } from '../types/missao';
import type { Categoria } from '../types/categoria';
import FiltroMissoes from '../components/missoes/FiltroMissoes';

export default function Missoes() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [categoria, setCategoria] = useState<Categoria | ''>('');
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

  return (
    <main>
      <h1>Missões do Zefi</h1>

      <FiltroMissoes
        categoriaSelecionada={categoria}
        onCategoriaChange={setCategoria}
      />

      {carregando && <p>Carregando missões...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && (
        missoes.length === 0 ? (
          <p>Nenhuma missão encontrada.</p>
        ) : (
          missoes.map((missao) => (
            <article key={missao.id}>
              <h2>{missao.nome}</h2>
              <p>Categoria: {missao.categoria}</p>
              <p>Pontos: {missao.pontosRecompensa} Ecoa</p>
            </article>
          ))
        )
      )}
    </main>
  );
}
