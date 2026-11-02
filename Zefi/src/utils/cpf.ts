/** Deixa so os numeros do CPF */
export function limparCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/** Aplica a mascara 000.000.000-00 enquanto o usuario digita */
export function formatarCpf(valor: string): string {
  const numeros = limparCpf(valor).slice(0, 11);
  return numeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/** Mesma validacao da API: 11 digitos, sem repeticao e digitos verificadores corretos */
export function cpfValido(valor: string): boolean {
  const cpf = limparCpf(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digito = (tamanho: number): number => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (tamanho + 1 - i);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}
