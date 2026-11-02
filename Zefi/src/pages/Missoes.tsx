
import { useEffect, useState } from 'react';
import { missaoService } from '../services/missaoService';
import type { Missao } from '../types/missao';

export default function Missoes() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarMissoes() {
      try {
        const dados = await missaoService.listar();
        setMissoes(dados);
      } catch (error) {
        console.error('Erro ao carregar missões:', error);
        setErro('Não foi possível carregar as missões.');
      } finally {
        setCarregando(false);
      }
    }

    carregarMissoes();
  }, []);

  if (carregando) {
    return <p>Carregando missões...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <main>
      <h1>Missões do Zefi</h1>

      {missoes.length === 0 ? (
        <p>Nenhuma missão encontrada.</p>
      ) : (
        <div>
          {missoes.map((missao) => (
            <article key={missao.id}>
              <h2>{missao.nome}</h2>
              <p>Categoria: {missao.categoria}</p>
              <p>Pontos: {missao.pontosRecompensa} Ecoa</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
