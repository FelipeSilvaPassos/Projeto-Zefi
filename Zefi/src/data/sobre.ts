export interface PassoSobre {
  titulo: string;
  descricao: string;
}

export const PASSOS_SOBRE: PassoSobre[] = [
  { titulo: 'Conte o que você fez', descricao: 'No feed ou no chat, você relata uma ação sustentável do seu dia.' },
  { titulo: 'O Zefi avalia', descricao: 'A API identifica a categoria da ação e calcula os pontos que ela vale.' },
  { titulo: 'Aceite missões sob medida', descricao: 'O Zefi sugere missões da sua categoria favorita, que valem 10% a mais.' },
  { titulo: 'Troque por recompensas', descricao: 'Os pontos viram benefícios, como cashback e desconto na conta de luz.' },
];

export const TECNOLOGIAS_SOBRE: string[] = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'React Router',
  'Java 21 + Spring Boot',
  'Oracle Database',
  'Vercel e Render',
];
