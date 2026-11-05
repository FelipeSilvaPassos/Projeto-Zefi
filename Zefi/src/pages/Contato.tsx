import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CANAIS_CONTATO, EMAIL_CONTATO } from '../data/contato';
import { estiloBotaoPrimario, estiloCampo } from '../components/ui/estilos';

interface DadosContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DadosContato>();

  function aoEnviar(dados: DadosContato) {
    // Não há endpoint de contato na API: abrimos o app de e-mail do usuário com a mensagem pronta
    const corpo = `Nome: ${dados.nome}\nE-mail: ${dados.email}\n\n${dados.mensagem}`;
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(dados.assunto)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
    reset();
  }

  return (
    <section className="bg-[#F7FBFE] px-4 py-12 text-black">
      <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_320px]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Contato</h1>
          <p className="mb-6 mt-2 text-gray-700">Tem uma dúvida, sugestão ou elogio? Escreva para a equipe do Zefi.</p>

          {enviado && (
            <p role="status" className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-800">
              Abrimos o seu aplicativo de e-mail com a mensagem pronta. É só confirmar o envio por lá.
            </p>
          )}

          <form
            onSubmit={handleSubmit(aoEnviar)}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
          >
            <label className="block text-sm font-bold">
              Nome
              <input
                {...register('nome', {
                  required: 'Informe o seu nome.',
                  minLength: { value: 3, message: 'O nome precisa ter pelo menos 3 caracteres.' },
                })}
                className={estiloCampo(!!errors.nome)}
                autoComplete="name"
              />
              {errors.nome && <span role="alert" className="text-xs font-medium text-red-700">{errors.nome.message}</span>}
            </label>

            <label className="block text-sm font-bold">
              E-mail
              <input
                type="email"
                {...register('email', {
                  required: 'Informe o seu e-mail.',
                  pattern: { value: REGEX_EMAIL, message: 'E-mail inválido.' },
                })}
                className={estiloCampo(!!errors.email)}
                autoComplete="email"
              />
              {errors.email && <span role="alert" className="text-xs font-medium text-red-700">{errors.email.message}</span>}
            </label>

            <label className="block text-sm font-bold">
              Assunto
              <select
                {...register('assunto', { required: 'Escolha um assunto.' })}
                defaultValue=""
                className={estiloCampo(!!errors.assunto)}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="Dúvida">Dúvida</option>
                <option value="Sugestão">Sugestão</option>
                <option value="Problema no site">Problema no site</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.assunto && <span role="alert" className="text-xs font-medium text-red-700">{errors.assunto.message}</span>}
            </label>

            <label className="block text-sm font-bold">
              Mensagem
              <textarea
                rows={5}
                {...register('mensagem', {
                  required: 'Escreva a sua mensagem.',
                  minLength: { value: 10, message: 'A mensagem precisa ter pelo menos 10 caracteres.' },
                })}
                className={estiloCampo(!!errors.mensagem)}
              />
              {errors.mensagem && <span role="alert" className="text-xs font-medium text-red-700">{errors.mensagem.message}</span>}
            </label>

            <button type="submit" className={estiloBotaoPrimario}>
              Enviar mensagem
            </button>
          </form>
        </div>

        <aside className="flex flex-col gap-4 self-start rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Outros canais</h2>
          <p className="text-sm text-gray-700">
            E-mail:{' '}
            <a href={`mailto:${EMAIL_CONTATO}`} className="font-bold text-[#168BC4] underline">
              {EMAIL_CONTATO}
            </a>
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {CANAIS_CONTATO.map((canal) => (
              <li key={canal.url}>
                <a href={canal.url} target="_blank" rel="noreferrer" className="font-semibold text-[#168BC4] underline">
                  {canal.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
