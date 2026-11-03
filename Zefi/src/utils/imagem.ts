const TIPOS_ACEITOS = ['image/jpeg', 'image/png', 'image/webp'];
const TAMANHO_MAXIMO_BYTES = 5 * 1024 * 1024;

/** Lê o arquivo, recorta no centro em quadrado e reduz para caber no armazenamento do navegador */
export function prepararFoto(arquivo: File, lado = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
      reject(new Error('Use uma imagem JPG, PNG ou WebP.'));
      return;
    }
    if (arquivo.size > TAMANHO_MAXIMO_BYTES) {
      reject(new Error('A imagem deve ter no máximo 5 MB.'));
      return;
    }

    const url = URL.createObjectURL(arquivo);
    const imagem = new Image();

    imagem.onload = () => {
      URL.revokeObjectURL(url);

      const menorLado = Math.min(imagem.width, imagem.height);
      const origemX = (imagem.width - menorLado) / 2;
      const origemY = (imagem.height - menorLado) / 2;

      const canvas = document.createElement('canvas');
      canvas.width = lado;
      canvas.height = lado;

      const contexto = canvas.getContext('2d');
      if (!contexto) {
        reject(new Error('Não foi possível processar a imagem.'));
        return;
      }

      contexto.drawImage(imagem, origemX, origemY, menorLado, menorLado, 0, 0, lado, lado);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };

    imagem.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível ler essa imagem.'));
    };

    imagem.src = url;
  });
}
