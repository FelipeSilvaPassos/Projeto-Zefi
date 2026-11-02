import type { Categoria } from '../types/categoria';
import type { Missao } from '../types/missao';

export interface DescricaoMissao {
  resumo: string;
  descricao: string;
  passos: string[];
  impacto: string;
}

// A API ainda não envia descrição, então os textos ficam no front, indexados pelo nome da missão
const DESCRICOES: Record<string, DescricaoMissao> = {
  'apagar as luzes dos cômodos vazios': {
    resumo: 'Um gesto simples que reduz o consumo de energia todos os dias.',
    descricao:
      'Luzes acesas em cômodos vazios são um dos desperdícios mais comuns dentro de casa. ' +
      'Criar o hábito de apagar a luz ao sair de um ambiente diminui a conta de energia ' +
      'e a demanda sobre usinas que, em horários de pico, costumam ser termelétricas e mais poluentes.',
    passos: [
      'Antes de sair de um cômodo, confira se a luz ficou acesa.',
      'Aproveite a luz natural durante o dia abrindo cortinas e janelas.',
      'Combine com quem mora com você para todos adotarem o hábito.',
    ],
    impacto:
      'Uma lâmpada esquecida acesa 5 horas por dia pode somar dezenas de kWh desperdiçados por ano.',
  },
  'trocar uma lâmpada por led': {
    resumo: 'Troque uma lâmpada antiga por LED e gaste até 80% menos energia.',
    descricao:
      'Lâmpadas LED consomem muito menos energia que as incandescentes e fluorescentes, ' +
      'duram até 25 mil horas e não contêm mercúrio. É uma troca única que gera economia ' +
      'por anos e reduz o lixo de lâmpadas descartadas.',
    passos: [
      'Escolha a lâmpada mais usada da casa para começar a troca.',
      'Confira a potência e o encaixe (soquete) antes de comprar a LED.',
      'Descarte a lâmpada antiga em um ponto de coleta, principalmente se for fluorescente.',
    ],
    impacto:
      'Uma LED de 9 W ilumina como uma incandescente de 60 W, usando cerca de 85% menos energia.',
  },
  'comprar uma peça em brechó': {
    resumo: 'Dê uma nova vida a uma roupa e evite a produção de uma peça nova.',
    descricao:
      'A indústria da moda é uma das que mais consome água e gera resíduos no mundo. ' +
      'Comprar em brechó prolonga a vida útil das roupas, evita que elas virem lixo ' +
      'e ainda permite encontrar peças únicas por um preço menor.',
    passos: [
      'Procure um brechó físico perto de você ou um brechó online confiável.',
      'Pense no que você realmente precisa antes de comprar.',
      'Verifique costuras, zíperes e manchas antes de levar a peça.',
    ],
    impacto:
      'Produzir uma única camiseta de algodão pode consumir cerca de 2.700 litros de água.',
  },
  'reaproveitar uma roupa antiga': {
    resumo: 'Transforme uma peça parada no armário em algo útil de novo.',
    descricao:
      'Muitas roupas são descartadas por pequenos defeitos ou porque saíram de uso. ' +
      'Reformar, customizar ou dar outra função a uma peça antiga evita o descarte ' +
      'e reduz a necessidade de comprar algo novo.',
    passos: [
      'Escolha uma peça que você não usa há muito tempo.',
      'Conserte, customize ou transforme em outra coisa, como bolsa, pano ou almofada.',
      'Se não for usar, doe para alguém que vá aproveitar.',
    ],
    impacto:
      'Estender a vida de uma roupa em 9 meses reduz em cerca de 20% a 30% sua pegada de carbono, água e resíduos.',
  },
  'começar uma pequena horta': {
    resumo: 'Cultive temperos ou hortaliças em casa, mesmo em pouco espaço.',
    descricao:
      'Uma horta caseira aproxima você da origem do alimento, reduz embalagens e o ' +
      'transporte de produtos até o mercado e garante comida fresca e sem agrotóxicos. ' +
      'Dá para começar com vasos na janela ou na varanda.',
    passos: [
      'Escolha um local que receba pelo menos 4 horas de sol por dia.',
      'Comece com plantas fáceis, como cebolinha, salsinha, manjericão ou alface.',
      'Use vasos com furos para drenagem e regue sem encharcar a terra.',
    ],
    impacto:
      'Cada tempero colhido em casa é uma embalagem plástica e um transporte a menos.',
  },
  'fazer compostagem em casa': {
    resumo: 'Transforme restos de comida em adubo em vez de mandá-los para o lixo.',
    descricao:
      'Cerca de metade do lixo doméstico no Brasil é orgânico. Quando vai para o aterro, ' +
      'ele se decompõe sem oxigênio e libera metano, um gás de efeito estufa muito potente. ' +
      'A compostagem transforma esses restos em adubo para plantas e hortas.',
    passos: [
      'Separe cascas de frutas, legumes, borra de café e restos vegetais.',
      'Monte uma composteira com baldes empilhados ou use um minhocário.',
      'Alterne camadas de resíduos com material seco, como folhas ou serragem.',
    ],
    impacto:
      'Uma família pode desviar mais de 100 kg de resíduos orgânicos do aterro por ano.',
  },
  'separar o lixo reciclável': {
    resumo: 'Separe plástico, papel, vidro e metal para que possam ser reciclados.',
    descricao:
      'Materiais recicláveis misturados com lixo orgânico ficam sujos e acabam perdidos. ' +
      'Separar corretamente em casa facilita o trabalho das cooperativas de reciclagem, ' +
      'gera renda para catadores e reduz a extração de novas matérias-primas.',
    passos: [
      'Tenha um recipiente só para recicláveis, separado do lixo orgânico.',
      'Enxágue rapidamente embalagens com restos de comida.',
      'Verifique os dias da coleta seletiva no seu bairro ou leve a um ecoponto.',
    ],
    impacto:
      'Reciclar uma tonelada de papel evita o corte de cerca de 20 árvores.',
  },
  'levar o lixo eletrônico a um ponto de coleta': {
    resumo: 'Descarte pilhas, cabos e aparelhos velhos do jeito certo.',
    descricao:
      'Eletrônicos contêm metais pesados, como chumbo e mercúrio, que contaminam o solo ' +
      'e a água quando vão para o lixo comum. Em pontos de coleta, eles são desmontados ' +
      'e materiais valiosos, como cobre e ouro, são recuperados.',
    passos: [
      'Junte pilhas, baterias, cabos, carregadores e aparelhos sem uso.',
      'Apague seus dados pessoais de celulares e computadores.',
      'Procure um ponto de coleta em supermercados, lojas de eletrônicos ou ecopontos.',
    ],
    impacto:
      'O Brasil é um dos maiores geradores de lixo eletrônico do mundo, e menos de 3% é reciclado corretamente.',
  },
  'ir ao trabalho de bicicleta ou a pé': {
    resumo: 'Troque o carro pela bicicleta ou pela caminhada no seu trajeto.',
    descricao:
      'O transporte é uma das maiores fontes de emissão de CO₂ nas cidades. ' +
      'Ir de bicicleta ou a pé zera as emissões do trajeto, diminui o trânsito ' +
      'e ainda faz bem para a saúde física e mental.',
    passos: [
      'Planeje uma rota segura, de preferência com ciclovias ou calçadas largas.',
      'Comece fazendo o trajeto uma ou duas vezes por semana.',
      'Use equipamentos de segurança, como capacete e luzes, se for de bicicleta.',
    ],
    impacto:
      'Trocar 10 km de carro por bicicleta evita cerca de 2 kg de CO₂ por dia.',
  },
  'dar carona ou usar transporte público': {
    resumo: 'Divida o trajeto com outras pessoas e tire carros da rua.',
    descricao:
      'Um ônibus cheio substitui dezenas de carros, e uma carona divide as emissões ' +
      'de uma viagem entre várias pessoas. Compartilhar o transporte reduz poluição, ' +
      'congestionamentos e o gasto de cada um com combustível.',
    passos: [
      'Verifique linhas de ônibus, metrô ou trem que atendem seu trajeto.',
      'Combine caronas com colegas de trabalho, escola ou vizinhos.',
      'Use aplicativos de carona compartilhada quando não houver transporte público.',
    ],
    impacto:
      'Por passageiro, o transporte público emite até 4 vezes menos CO₂ que o carro individual.',
  },
};

// Usado quando surgir uma missão nova na API que ainda não tem texto próprio
const DESCRICOES_POR_CATEGORIA: Record<Categoria, DescricaoMissao> = {
  energia: {
    resumo: 'Economize energia e reduza sua pegada de carbono.',
    descricao:
      'Pequenas mudanças no uso de energia em casa somam uma grande diferença ' +
      'na conta de luz e nas emissões de gases de efeito estufa.',
    passos: [
      'Identifique onde a energia está sendo desperdiçada.',
      'Coloque a missão em prática no seu dia a dia.',
      'Acompanhe a diferença na sua conta de luz.',
    ],
    impacto: 'Menos energia consumida significa menos pressão sobre usinas poluentes.',
  },
  moda: {
    resumo: 'Consuma moda de forma mais consciente.',
    descricao:
      'A moda sustentável valoriza a durabilidade das peças, o reaproveitamento ' +
      'e o consumo consciente, reduzindo o desperdício de água e de tecidos.',
    passos: [
      'Avalie o que você já tem antes de comprar algo novo.',
      'Coloque a missão em prática.',
      'Compartilhe a ideia com amigos e familiares.',
    ],
    impacto: 'Cada peça que dura mais é uma peça nova a menos sendo produzida.',
  },
  alimentação: {
    resumo: 'Tenha uma relação mais consciente com a comida.',
    descricao:
      'Escolhas na alimentação influenciam o uso de terra, água e energia, ' +
      'além da quantidade de resíduos que geramos em casa.',
    passos: [
      'Planeje suas refeições e compras.',
      'Coloque a missão em prática.',
      'Aproveite ao máximo os alimentos e evite o desperdício.',
    ],
    impacto: 'Reduzir o desperdício de comida é uma das ações climáticas mais eficazes.',
  },
  reciclagem: {
    resumo: 'Dê o destino certo aos seus resíduos.',
    descricao:
      'O descarte correto permite que materiais voltem para a cadeia produtiva ' +
      'e evita a contaminação do solo e da água.',
    passos: [
      'Separe os materiais por tipo.',
      'Coloque a missão em prática.',
      'Leve os resíduos ao ponto de coleta adequado.',
    ],
    impacto: 'Reciclar reduz a extração de matéria-prima e o volume dos aterros.',
  },
  transporte: {
    resumo: 'Desloque-se de forma mais limpa.',
    descricao:
      'Escolher meios de transporte com menos emissões melhora a qualidade do ar ' +
      'e diminui o trânsito nas cidades.',
    passos: [
      'Planeje seu trajeto com antecedência.',
      'Coloque a missão em prática.',
      'Tente repetir a escolha ao longo da semana.',
    ],
    impacto: 'Cada viagem de carro evitada é menos CO₂ lançado na atmosfera.',
  },
};

export function descricaoDaMissao(missao: Missao): DescricaoMissao {
  return (
    DESCRICOES[missao.nome.trim().toLowerCase()] ??
    DESCRICOES_POR_CATEGORIA[missao.categoria] ??
    DESCRICOES_POR_CATEGORIA.reciclagem
  );
}
