// Os 5 Perfis de Talentos HACK SCHOOL® — dados centrais do teste HackPerfil.
// Conteúdo alinhado ao usado nos livros HACK CLASS (Capítulo 4 dos 3 volumes
// do Aluno e Capítulo 3 do Livro do Professor).

export type PerfilKey = "CREATOR" | "BUILDER" | "CONNECTOR" | "TECH_MAKER" | "LEADER";

export interface PerfilInfo {
  key: PerfilKey;
  nome: string;
  emoji: string;
  tagline: string;
  cor: string; // cor de destaque (hex) usada na UI
  descricao: string;
  caracteristicas: string[];
  contribuicoes: string[];
}

export const PERFIS: Record<PerfilKey, PerfilInfo> = {
  CREATOR: {
    key: "CREATOR",
    nome: "Creator",
    emoji: "💡",
    tagline: "Transforma ideias em oportunidades",
    cor: "#8A5CF6",
    descricao:
      "O Creator é movido pela curiosidade e pela criatividade. Está sempre observando problemas, fazendo perguntas e imaginando novas possibilidades. É o perfil que inspira a equipe a pensar diferente e buscar soluções inovadoras.",
    caracteristicas: ["Criativo", "Curioso", "Visionário", "Observador", "Inovador", "Gosta de aprender"],
    contribuicoes: [
      "Gerar ideias inovadoras",
      "Identificar oportunidades",
      "Liderar momentos de brainstorming",
      "Desenvolver soluções criativas",
      "Estimular a inovação do grupo",
    ],
  },
  BUILDER: {
    key: "BUILDER",
    nome: "Builder",
    emoji: "🚀",
    tagline: "Faz as ideias acontecerem",
    cor: "#23A45C",
    descricao:
      "O Builder transforma planejamento em ação. É organizado, disciplinado e comprometido com os resultados. Enquanto alguns pensam, ele executa e garante que o projeto avance.",
    caracteristicas: ["Organizado", "Disciplinado", "Responsável", "Persistente", "Prático", "Focado em resultados"],
    contribuicoes: [
      "Organizar tarefas",
      "Planejar cronogramas",
      "Acompanhar prazos",
      "Garantir a execução das atividades",
      "Transformar ideias em projetos concretos",
    ],
  },
  CONNECTOR: {
    key: "CONNECTOR",
    nome: "Connector",
    emoji: "🎤",
    tagline: "Conecta pessoas, ideias e oportunidades",
    cor: "#3B82F6",
    descricao:
      "O Connector possui facilidade para se comunicar e construir relacionamentos. É quem representa a equipe, apresenta projetos, conversa com parceiros e fortalece o trabalho colaborativo.",
    caracteristicas: ["Comunicativo", "Carismático", "Colaborativo", "Influente", "Persuasivo", "Empático"],
    contribuicoes: [
      "Apresentar projetos",
      "Desenvolver o pitch",
      "Produzir conteúdos",
      "Relacionar-se com parceiros",
      "Fortalecer a comunicação da equipe",
    ],
  },
  TECH_MAKER: {
    key: "TECH_MAKER",
    nome: "Tech Maker",
    emoji: "🤖",
    tagline: "Usa a tecnologia para criar soluções",
    cor: "#E6483F",
    descricao:
      "O Tech Maker gosta de explorar ferramentas digitais, Inteligência Artificial, programação e novas tecnologias. É quem transforma ideias em soluções digitais e apoia tecnicamente os projetos.",
    caracteristicas: ["Tecnológico", "Analítico", "Investigador", "Curioso", "Inovador", "Gosta de novas ferramentas"],
    contribuicoes: [
      "Desenvolver protótipos",
      "Criar aplicativos, sites ou sistemas",
      "Utilizar Inteligência Artificial",
      "Pesquisar soluções tecnológicas",
      "Apoiar a inovação digital",
    ],
  },
  LEADER: {
    key: "LEADER",
    nome: "Leader",
    emoji: "🌍",
    tagline: "Inspira pessoas e conduz a equipe ao resultado",
    cor: "#F5820D",
    descricao:
      "O Leader é responsável por fortalecer o grupo, promover a colaboração e manter todos motivados. Sua principal característica é desenvolver pessoas, resolver conflitos e garantir que a equipe trabalhe unida em torno de um propósito comum.",
    caracteristicas: ["Líder", "Organizado", "Responsável", "Empático", "Proativo", "Colaborativo"],
    contribuicoes: [
      "Coordenar a equipe",
      "Delegar responsabilidades",
      "Resolver conflitos",
      "Motivar os integrantes",
      "Garantir o foco nos objetivos",
    ],
  },
};

export const PERFIL_ORDER: PerfilKey[] = ["CREATOR", "BUILDER", "CONNECTOR", "TECH_MAKER", "LEADER"];

export interface Pergunta {
  id: number;
  texto: string;
  opcoes: { texto: string; perfil: PerfilKey }[];
}

export const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    texto: "Sua equipe recebeu um problema real para resolver esta semana. Qual costuma ser sua primeira reação?",
    opcoes: [
      { texto: "Já começo a imaginar várias soluções diferentes e possibilidades novas.", perfil: "CREATOR" },
      { texto: "Penso em como organizar as etapas e prazos para não perder tempo.", perfil: "BUILDER" },
      { texto: "Penso em quem mais precisamos conversar para entender melhor o problema.", perfil: "CONNECTOR" },
      { texto: "Já penso em que ferramenta ou tecnologia pode ajudar a resolver isso.", perfil: "TECH_MAKER" },
      { texto: "Reúno o grupo para alinhar expectativas e definir como vamos trabalhar juntos.", perfil: "LEADER" },
    ],
  },
  {
    id: 2,
    texto: "Numa apresentação final de projeto, qual papel você prefere assumir?",
    opcoes: [
      { texto: "Criar a ideia central e a narrativa criativa da apresentação.", perfil: "CREATOR" },
      { texto: "Garantir que tudo esteja pronto e funcionando antes da hora.", perfil: "BUILDER" },
      { texto: "Apresentar o projeto para a banca e responder perguntas.", perfil: "CONNECTOR" },
      { texto: "Mostrar como o protótipo ou a tecnologia funciona na prática.", perfil: "TECH_MAKER" },
      { texto: "Coordenar quem fala em cada parte e garantir que o grupo esteja alinhado.", perfil: "LEADER" },
    ],
  },
  {
    id: 3,
    texto: "Um colega de equipe discorda da sua ideia. O que você faz?",
    opcoes: [
      { texto: "Fico curioso para entender o ponto de vista dele e talvez misturar as duas ideias.", perfil: "CREATOR" },
      { texto: "Prefiro decidir logo e seguir com o que for mais viável no prazo que temos.", perfil: "BUILDER" },
      { texto: "Converso bastante até encontrarmos um consenso que deixe todos confortáveis.", perfil: "CONNECTOR" },
      { texto: "Busco dados ou testes que ajudem a decidir com base em evidência, não opinião.", perfil: "TECH_MAKER" },
      { texto: "Escuto os dois lados e ajudo o grupo a decidir sem que ninguém fique de fora.", perfil: "LEADER" },
    ],
  },
  {
    id: 4,
    texto: "O que mais te frustra em um trabalho de grupo?",
    opcoes: [
      { texto: "Quando ninguém quer arriscar ideias diferentes.", perfil: "CREATOR" },
      { texto: "Quando as coisas ficam para a última hora, sem organização.", perfil: "BUILDER" },
      { texto: "Quando o grupo não se comunica ou não conversa com quem precisa.", perfil: "CONNECTOR" },
      { texto: "Quando ninguém quer testar ou aprender uma ferramenta nova.", perfil: "TECH_MAKER" },
      { texto: "Quando alguém do grupo fica de fora ou é ignorado.", perfil: "LEADER" },
    ],
  },
  {
    id: 5,
    texto: "Seu jeito favorito de aprender algo novo é...",
    opcoes: [
      { texto: "Explorando livremente, sem um roteiro fixo.", perfil: "CREATOR" },
      { texto: "Seguindo um passo a passo estruturado até dominar.", perfil: "BUILDER" },
      { texto: "Conversando e trocando ideias com outras pessoas.", perfil: "CONNECTOR" },
      { texto: "Testando na prática, mexendo e quebrando até entender.", perfil: "TECH_MAKER" },
      { texto: "Ensinando o que aprendi para outra pessoa.", perfil: "LEADER" },
    ],
  },
  {
    id: 6,
    texto: "Em um RACK (desafio do HACK SCHOOL), qual tarefa você pede para fazer primeiro?",
    opcoes: [
      { texto: "Gerar o máximo de ideias possíveis antes de escolher uma.", perfil: "CREATOR" },
      { texto: "Montar o cronograma de quem faz o quê e até quando.", perfil: "BUILDER" },
      { texto: "Marcar conversas com pessoas afetadas pelo problema.", perfil: "CONNECTOR" },
      { texto: "Pesquisar ferramentas ou tecnologias que a equipe pode usar.", perfil: "TECH_MAKER" },
      { texto: "Organizar uma reunião inicial para alinhar o time.", perfil: "LEADER" },
    ],
  },
  {
    id: 7,
    texto: "Como os amigos ou colegas te descreveriam?",
    opcoes: [
      { texto: "Cheio de ideias, sempre pensando fora da caixa.", perfil: "CREATOR" },
      { texto: "Confiável, cumpre o que promete.", perfil: "BUILDER" },
      { texto: "Fácil de conversar, sabe convencer as pessoas.", perfil: "CONNECTOR" },
      { texto: "Curioso por tecnologia, gosta de mexer em coisas novas.", perfil: "TECH_MAKER" },
      { texto: "Alguém que cuida do grupo e resolve os conflitos.", perfil: "LEADER" },
    ],
  },
  {
    id: 8,
    texto: "Quando o projeto trava, o que você faz?",
    opcoes: [
      { texto: "Proponho uma abordagem completamente diferente da que estávamos tentando.", perfil: "CREATOR" },
      { texto: "Reviso o plano, ajusto prazos e sigo em frente.", perfil: "BUILDER" },
      { texto: "Procuro alguém de fora que possa ajudar ou dar outro ponto de vista.", perfil: "CONNECTOR" },
      { texto: "Investigo tecnicamente onde está o erro ou a limitação.", perfil: "TECH_MAKER" },
      { texto: "Reúno o grupo para reavaliar juntos o que fazer a seguir.", perfil: "LEADER" },
    ],
  },
  {
    id: 9,
    texto: "O que mais te energiza em um projeto?",
    opcoes: [
      { texto: "O momento de ter uma ideia nova que ninguém tinha pensado.", perfil: "CREATOR" },
      { texto: "O momento de ver tudo funcionando e entregue.", perfil: "BUILDER" },
      { texto: "O momento de apresentar e ver a reação das pessoas.", perfil: "CONNECTOR" },
      { texto: "O momento de resolver um desafio técnico difícil.", perfil: "TECH_MAKER" },
      { texto: "O momento de ver a equipe toda unida e orgulhosa do resultado.", perfil: "LEADER" },
    ],
  },
  {
    id: 10,
    texto: "Se pudesse escolher, qual curso extra faria?",
    opcoes: [
      { texto: "Design ou criação de produtos.", perfil: "CREATOR" },
      { texto: "Gestão de projetos.", perfil: "BUILDER" },
      { texto: "Oratória ou comunicação.", perfil: "CONNECTOR" },
      { texto: "Programação ou inteligência artificial.", perfil: "TECH_MAKER" },
      { texto: "Liderança de equipes.", perfil: "LEADER" },
    ],
  },
  {
    id: 11,
    texto: "Numa crise de última hora antes da entrega, você...",
    opcoes: [
      { texto: "Sugere uma solução criativa e rápida que ninguém tinha pensado.", perfil: "CREATOR" },
      { texto: "Assume o controle prático: o que falta, quem faz, até quando.", perfil: "BUILDER" },
      { texto: "Acalma o grupo e negocia mais tempo ou ajuda externa se possível.", perfil: "CONNECTOR" },
      { texto: "Tenta um ajuste técnico rápido para contornar o problema.", perfil: "TECH_MAKER" },
      { texto: "Mantém todo mundo motivado e focado até o fim.", perfil: "LEADER" },
    ],
  },
  {
    id: 12,
    texto: "O que te faz sentir mais orgulho de um projeto?",
    opcoes: [
      { texto: "Ter criado algo original que não existia antes.", perfil: "CREATOR" },
      { texto: "Ter entregue tudo direitinho, dentro do prazo.", perfil: "BUILDER" },
      { texto: "Ter conseguido conectar o projeto com pessoas ou parceiros importantes.", perfil: "CONNECTOR" },
      { texto: "Ter resolvido um problema técnico complexo.", perfil: "TECH_MAKER" },
      { texto: "Ter ajudado o time inteiro a crescer com o projeto.", perfil: "LEADER" },
    ],
  },
];

export interface Scores {
  CREATOR: number;
  BUILDER: number;
  CONNECTOR: number;
  TECH_MAKER: number;
  LEADER: number;
}

export function calcularResultado(respostas: PerfilKey[]): { perfil: PerfilKey; scores: Scores } {
  const scores: Scores = { CREATOR: 0, BUILDER: 0, CONNECTOR: 0, TECH_MAKER: 0, LEADER: 0 };
  for (const r of respostas) {
    scores[r] += 1;
  }
  let melhor: PerfilKey = "CREATOR";
  let maior = -1;
  for (const key of PERFIL_ORDER) {
    if (scores[key] > maior) {
      maior = scores[key];
      melhor = key;
    }
  }
  return { perfil: melhor, scores };
}
