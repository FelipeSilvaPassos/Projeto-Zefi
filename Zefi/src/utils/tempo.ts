/** "há 5 min", "há 2 h", "ontem"... a partir da data devolvida pela API */
export function tempoRelativo(dataApi: string, agora: Date = new Date()): string {
  const data = new Date(dataApi.includes('T') ? dataApi : dataApi.replace(' ', 'T'));
  if (Number.isNaN(data.getTime())) return '';

  const minutos = Math.floor((agora.getTime() - data.getTime()) / 60000);

  if (minutos < 1) return 'agora mesmo';
  if (minutos < 60) return `há ${minutos} min`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;

  const dias = Math.floor(horas / 24);
  if (dias === 1) return 'ontem';
  if (dias < 7) return `há ${dias} dias`;

  return data.toLocaleDateString('pt-BR');
}
