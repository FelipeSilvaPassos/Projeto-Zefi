import { Link } from 'react-router-dom';
import ZefiAvatar from '../components/zefi/ZefiAvatar';
import BalaoFala from '../components/zefi/BalaoFala';

interface Passo {
  titulo: string;
  descricao: string;
}

const PASSOS: Passo[] = [
  { titulo: 'Conte seus interesses', descricao: 'O Zefi aprende do que você gosta: energia, reciclagem, moda, alimentação ou transporte.' },
  { titulo: 'Receba missões sob medida', descricao: 'Missões da sua categoria favorita valem 10% a mais de pontos.' },
  { titulo: 'Relate suas ações', descricao: 'Conte no chat o que fez de bom. O Zefi reconhece e te dá os pontos.' },
  { titulo: 'Troque por benefícios', descricao: 'Use os pontos para ter desconto na conta de luz e outras recompensas.' },
];

const CATEGORIAS: string[] = [
  '👕 Moda Sustentável',
  '⚡ Energia',
  '🥗 Alimentação Consciente',
  '♻️ Reciclagem',
  '🚲 Transporte Sustentável',
];

export default function Home() {
  return (
    <>
            {/* Apresentação */}
      <section className="bg-ceu/60">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-4 py-12 md:flex-row md:py-20">
          <div className="flex-1 text-center md:text-left">
            <p className="inline-block rounded-full bg-white px-4 py-1 text-sm font-bold text-folha-escuro">
              Uma evolução do Soul Up, da Prospera
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Pequenas atitudes fazem grandes ventos
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-tinta/80 md:mx-0">
              O Zefi é o novo avatar inteligente do Soul Up. Ele acompanha sua jornada no app,
              sugere missões do seu jeito e transforma suas ações sustentáveis em pontos
              para economizar na conta de luz.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                to="/cadastro"
                className="rounded-xl bg-folha-escuro px-6 py-3 font-bold text-white transition-colors hover:bg-tinta"
              >
                Começar agora
              </Link>
              <Link
                to="/sobre"
                className="rounded-xl border-2 border-tinta px-6 py-3 font-bold transition-colors hover:bg-white"
              >
                Conhecer o projeto
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <BalaoFala texto="Oi! Sou o Zefi, seu guia no Soul Up 🍃" />
            <ZefiAvatar tamanho="grande" nivel="ALTO" />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold">Como funciona</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((passo, indice) => (
            <li key={passo.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-energia font-extrabold">
                {indice + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{passo.titulo}</h3>
              <p className="mt-2 text-tinta/75">{passo.descricao}</p>
            </li>
          ))}
        </ol>
      </section>
            {/* Relação com o Soul Up */}
      <section className="bg-white/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold">O que já existe no Soul Up</h2>
            <p className="mt-4 text-tinta/80">
              O Soul Up é a rede social de recompensas sustentáveis da Prospera. Os usuários
              completam missões, participam de comunidades e interagem com marcas parceiras
              para acumular pontos, que viram desconto na conta de luz, cashback e compensação de carbono.
            </p>
          </div>
          <div className="rounded-2xl bg-ceu p-6 md:p-8">
            <h2 className="text-2xl font-extrabold">O que o Zefi acrescenta</h2>
            <ul className="mt-4 space-y-3 text-tinta/85">
              <li>🎯 Missões recomendadas de acordo com os seus interesses</li>
              <li>💬 Um chat para contar suas ações e ganhar pontos na hora</li>
              <li>🌬️ Um avatar que reage ao seu engajamento e te chama de volta quando você some</li>
              <li>⭐ Bônus de 10% nas missões da sua categoria favorita</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-extrabold">Escolha seu vento</h2>
          <p className="mt-2 text-tinta/75">Missões em cinco categorias de impacto.</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIAS.map((categoria) => (
              <li
                key={categoria}
                className="rounded-full border-2 border-folha px-5 py-2 font-semibold text-folha-escuro"
              >
                {categoria}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chamada final */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-tinta px-6 py-12 text-center text-white md:flex-row md:text-left">
          <ZefiAvatar tamanho="medio" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold md:text-3xl">Sua primeira missão já está esperando</h2>
            <p className="mt-2 text-white/80">Crie sua conta e o Zefi separa uma missão pra você hoje.</p>
          </div>
          <Link
            to="/cadastro"
            className="rounded-xl bg-energia px-6 py-3 font-bold text-tinta transition-transform hover:scale-105"
          >
            Criar conta
          </Link>
        </div>
      </section>
    </>
  );
}