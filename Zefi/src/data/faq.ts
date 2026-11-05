import type { ItemAccordion } from '../components/ui/Accordion';

export const PERGUNTAS_FAQ: ItemAccordion[] = [
  {
    pergunta: 'O que é o Zefi?',
    resposta:
      'É o avatar inteligente do Soul Up. Ele reconhece as suas ações sustentáveis, dá pontos, sugere missões e acompanha a sua evolução.',
  },
  {
    pergunta: 'Como eu ganho pontos?',
    resposta:
      'De duas formas: relatando uma ação no feed ou no chat com o Zefi, ou aceitando uma missão sugerida. O Zefi identifica a categoria da ação e calcula os pontos.',
  },
  {
    pergunta: 'O que são as missões?',
    resposta:
      'São desafios sustentáveis das categorias energia, moda, alimentação, reciclagem e transporte. Cada missão mostra como fazer, o impacto e quantos pontos Ecoa ela vale.',
  },
  {
    pergunta: 'Para que servem os pontos?',
    resposta:
      'Os pontos podem ser trocados por recompensas na página Recompensas, como cashback via Pix, desconto na conta de luz e compensação de carbono.',
  },
  {
    pergunta: 'Preciso de uma conta para usar?',
    resposta:
      'Para ver a página inicial, as missões e as informações do projeto, não. Para registrar ações, usar o chat, acompanhar o perfil e resgatar recompensas, sim: o cadastro é rápido e pede CPF, e-mail, cidade, categoria de interesse e senha com no mínimo 8 caracteres.',
  },
  {
    pergunta: 'Para que o site pede o meu CPF?',
    resposta:
      'O CPF identifica a sua conta. No perfil ele aparece mascarado e a senha é guardada de forma criptografada (BCrypt), nunca em texto puro.',
  },
  {
    pergunta: 'Minha foto e minha bio ficam salvas onde?',
    resposta:
      'Ficam salvas no seu navegador, neste aparelho. Nome, cidade e categoria de interesse são salvos na conta, na API.',
  },
  {
    pergunta: 'Por que o site demorou na primeira vez?',
    resposta:
      'A nossa API está em uma hospedagem gratuita que "dorme" quando fica sem uso. A primeira requisição pode levar até cerca de 50 segundos para acordá-la. Depois disso, ela responde normalmente.',
  },
];
