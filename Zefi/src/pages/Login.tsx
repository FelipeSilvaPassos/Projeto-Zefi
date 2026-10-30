
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuarioService } from '../services/usuarioService';
import { useUsuario } from '../context/useUsuario';
import { MensagemErro } from '../components/ui/Estados';

export default function Login() {
  const navegar = useNavigate();
  const { entrar } = useUsuario();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro('');

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      setErro('Informe um CPF válido com 11 números.');
      return;
    }

    if (!senha.trim()) {
      setErro('Informe sua senha.');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await usuarioService.login(cpfLimpo, senha);

      entrar(resposta);
      navegar('/perfil');
    } catch (erroLogin) {
      setErro(
        erroLogin instanceof Error
          ? erroLogin.message
          : 'Não foi possível entrar. Tente novamente.',
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-12 text-black">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src="/imgs-zefi/icone_feliz.png"
            alt=""
            className="mx-auto mb-4 h-20 w-20 object-contain"
          />

          <h1 className="text-3xl font-extrabold tracking-tight">
            Que bom ter você de volta!
          </h1>

          <p className="mt-3 text-gray-600">
            Entre na sua conta e continue sua jornada sustentável com o Zefi.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#DCEAF2] bg-white p-6 shadow-sm sm:p-8"
        >
          {erro && <MensagemErro mensagem={erro} />}

          <div>
            <label htmlFor="cpf" className="block text-sm font-semibold">
              CPF
            </label>

            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              autoComplete="username"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(evento) => setCpf(evento.target.value)}
              maxLength={14}
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] bg-white px-4 py-3 text-black outline-none transition focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-semibold">
              Senha
            </label>

            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#DCEAF2] bg-white px-4 py-3 text-black outline-none transition focus:border-[#55BDF0] focus:ring-2 focus:ring-[#BFEAFF]"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-[#55BDF0] px-6 py-3 font-bold text-black transition hover:bg-[#BFEAFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#55BDF0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="font-bold text-[#168BC4] underline-offset-4 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
