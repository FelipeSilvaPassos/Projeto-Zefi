
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';
import type { CadastroUsuario } from '../types/usuario';
import { CATEGORIAS } from '../types/categoria';
import { MensagemErro } from '../components/ui/Estados';

export default function Cadastro() {
  const navegar = useNavigate();

  const [dados, setDados] = useState<CadastroUsuario>({
    cpf: '',
    nome: '',
    email: '',
    cidade: '',
    categoriaInteresse: 'energia',
    senha: '',
  });

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function atualizarCampo(
    campo: keyof CadastroUsuario,
    valor: string,
  ) {
    setDados((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro('');

    const cpfLimpo = dados.cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      setErro('Informe um CPF com 11 números.');
      return;
    }

    if (dados.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      await usuarioService.cadastrar({
        ...dados,
        cpf: cpfLimpo,
      });

      navegar('/login', {
        state: {
          mensagem: 'Cadastro realizado! Agora você já pode entrar na sua conta.',
        },
      });
    } catch (erroCadastro) {
      setErro(
        erroCadastro instanceof Error
          ? erroCadastro.message
          : 'Não foi possível realizar o cadastro. Tente novamente.',
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-12 text-black">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8 text-center">
          <img
            src="/imgs-zefi/icone_feliz.png"
            alt=""
            className="mx-auto mb-4 h-20 w-20 object-contain"
          />

          <h1 className="text-3xl font-extrabold tracking-tight">
            Faça parte da Soul Up!
          </h1>

          <p className="mt-3 text-gray-600">
            Crie sua conta e comece sua jornada sustentável com o Zefi.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#DCEAF2] bg-white p-6 shadow-sm sm:p-8"
        >
          {erro && <MensagemErro mensagem={erro} />}

          <div>
            <label htmlFor="nome" className="block text-sm font-semibold">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              value={dados.nome}
              onChange={(e) => atualizarCampo('nome', e.target.value)}
              placeholder="Digite seu nome"
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-semibold">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="username"
              value={dados.cpf}
              onChange={(e) => atualizarCampo('cpf', e.target.value)}
              placeholder="Digite seu CPF"
              maxLength={14}
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={dados.email}
              onChange={(e) => atualizarCampo('email', e.target.value)}
              placeholder="exemplo@email.com"
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <div>
            <label htmlFor="cidade" className="block text-sm font-semibold">
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              autoComplete="address-level2"
              value={dados.cidade}
              onChange={(e) => atualizarCampo('cidade', e.target.value)}
              placeholder="Digite sua cidade"
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <div>
            <label
              htmlFor="categoriaInteresse"
              className="block text-sm font-semibold"
            >
              Categoria de interesse
            </label>
            <select
              id="categoriaInteresse"
              value={dados.categoriaInteresse}
              onChange={(e) =>
                atualizarCampo('categoriaInteresse', e.target.value)
              }
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] bg-white px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            >
              {CATEGORIAS.map((categoria) => (
                <option key={categoria.valor} value={categoria.valor}>
                  {categoria.rotulo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-semibold">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="new-password"
              value={dados.senha}
              onChange={(e) => atualizarCampo('senha', e.target.value)}
              placeholder="Crie uma senha"
              minLength={6}
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] px-4 py-3 outline-none focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
            <p className="mt-1 text-xs text-gray-500">
              A senha deve ter pelo menos 6 caracteres.
            </p>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-[#55BDF0] px-6 py-3 font-bold text-black transition hover:bg-[#BFEAFF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? 'Criando conta...' : 'Criar minha conta'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Já possui uma conta?{' '}
            <Link
              to="/login"
              className="font-bold text-[#168BC4] underline-offset-4 hover:underline"
            >
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
