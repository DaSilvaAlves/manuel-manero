// Smart AI responses — local, sem API key, funciona sempre

const QUOTES = [
  'A abundância começa quando decides que mereces mais. — Manuel Manero',
  'O teu legado é a marca que deixas no mundo. — Manuel Manero',
  'Quem domina a sua marca, domina o seu destino. — Manuel Manero',
  'Não esperes pelo momento perfeito. Cria-o. — Manuel Manero',
  'A tua marca pessoal é o ativo mais valioso que tens. — Manuel Manero',
  'Escala não é trabalhar mais, é posicionar-se melhor. — Manuel Manero',
];

const randomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];

// ── Chat AI ──────────────────────────────────────────────

interface ChatPattern {
  keywords: string[];
  response: string;
}

const CHAT_PATTERNS: ChatPattern[] = [
  {
    keywords: ['começar', 'inicio', 'início', 'zero', 'primeiro passo', 'como começo', 'iniciar', 'principiante'],
    response: 'Para quem está a começar, o Método PRIME é o caminho ideal. É o alicerce da sua marca pessoal — aprende estratégia de conteúdo, bio magnética e psicologia do branding. Muitos dos nossos alunos saíram de zero para resultados consistentes em semanas.',
  },
  {
    keywords: ['prime', 'método prime', 'metodo prime'],
    response: 'O Método PRIME é o programa de entrada para quem quer construir uma marca pessoal sólida. Inclui Estratégia de Conteúdo, Bio Magnética e Psicologia do Branding. É perfeito para quem quer transformar conhecimento em autoridade digital.',
  },
  {
    keywords: ['mastery', 'escalar', 'escala', 'avançado', 'high ticket', 'faturamento', 'crescer'],
    response: 'O Personal Branding MASTERY é o maior programa de aceleração de marcas pessoais em língua portuguesa. Foco em vendas de alto ticket, escala de infoprodutos e network exclusivo. É para quem já tem resultados e quer triplicar.',
  },
  {
    keywords: ['comunidade', 'milionária', 'milionaria', 'networking', 'rede', 'grupo'],
    response: 'A Comunidade Milionária é onde os tubarões se encontram. Mentoria mensal, networking de elite e desafios de escala. É a maior rede de empreendedores focada em abundância e resultados exponenciais.',
  },
  {
    keywords: ['mentoria', 'privada', '1:1', 'individual', 'personalizado', 'exclusivo'],
    response: 'A Mentoria Privada é acompanhamento 1:1 direto com o Manuel. Plano totalmente personalizado para o seu negócio, acesso direto via WhatsApp e auditoria completa de marca. Para quem quer resultados rápidos e exclusivos.',
  },
  {
    keywords: ['preço', 'preco', 'custo', 'valor', 'investimento', 'quanto custa', 'pagar'],
    response: 'O investimento varia conforme o programa escolhido. O melhor é preencher o formulário de contacto ou enviar mensagem pelo WhatsApp para receber uma proposta personalizada. O importante é: o retorno supera sempre o investimento.',
  },
  {
    keywords: ['livro', 'livros', 'ler', 'leitura', 'milionário', 'nómada', 'caixa'],
    response: 'O Manuel tem 3 livros publicados: "O Livro do Milionário", "Empreender Como Um Nómada Digital" e "Pensar e Agir Fora da Caixa". Cada um custa €16 e pode encomendar na secção Livros do site ou contactar via WhatsApp.',
  },
  {
    keywords: ['contacto', 'contato', 'falar', 'whatsapp', 'email', 'telefone'],
    response: 'Pode contactar-nos pelo WhatsApp (+351 968 032 398), email (geral@manuelmanero.pt) ou preencher o formulário na página de Contactos. Respondemos em menos de 24 horas!',
  },
  {
    keywords: ['quem é', 'quem e', 'manuel', 'manero', 'sobre', 'história', 'experiência'],
    response: 'Manuel Manero é especialista em Marca Pessoal com mais de 15 anos de experiência. Já impactou mais de 10.000 pessoas, construiu uma comunidade de 5.000+ membros e é autor de 3 livros. A sua missão é ajudar empreendedores a construir marcas de elite.',
  },
  {
    keywords: ['resultado', 'resultados', 'testemunho', 'prova', 'funciona'],
    response: 'Os resultados falam por si: alunos que saíram de 2k para 15k mensais em 3 meses, outros que triplicaram o faturamento em 6 meses. Visite a página de Testemunhos para ver histórias reais de transformação.',
  },
  {
    keywords: ['olá', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hello'],
    response: 'Olá! Bem-vindo ao universo Manuel Manero. Estou aqui para o ajudar a descobrir o caminho ideal para escalar a sua marca pessoal. O que gostaria de saber?',
  },
  {
    keywords: ['obrigado', 'obrigada', 'valeu', 'thanks'],
    response: 'De nada! Estou sempre aqui para ajudar. Se precisar de mais informações ou quiser dar o próximo passo, não hesite em perguntar.',
  },
];

const DEFAULT_RESPONSES = [
  'Boa pergunta! Para uma resposta mais detalhada, recomendo entrar em contacto direto pelo WhatsApp (+351 968 032 398) ou preencher o formulário de contacto. Enquanto isso, já conhece o Método PRIME? É o ponto de partida ideal.',
  'Interessante! O melhor caminho para ter uma resposta personalizada é agendar uma conversa. Pode contactar-nos pelo WhatsApp ou pelo formulário na página de Contactos.',
  'Para o ajudar da melhor forma, sugiro explorar os nossos programas: Método PRIME para começar, MASTERY para escalar, ou Comunidade Milionária para networking de elite. Qual lhe desperta mais interesse?',
];

export const getAIResponse = async (
  userMessage: string,
  _history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const msg = userMessage.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  for (const pattern of CHAT_PATTERNS) {
    if (pattern.keywords.some(kw => msg.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
      return `${pattern.response}\n\n✨ ${randomQuote()}`;
    }
  }

  const fallback = DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
  return `${fallback}\n\n✨ ${randomQuote()}`;
};

// ── Quiz Diagnóstico ─────────────────────────────────────

interface DiagnosisProfile {
  level: 'iniciante' | 'intermedio' | 'avancado' | 'expert';
  program: string;
  programLink: string;
  diagnosis: string;
}

const getDiagnosisProfile = (answers: string[]): DiagnosisProfile => {
  const [objetivo, faturamento, comunicacao] = answers;

  // Scoring: higher = more advanced
  let score = 0;

  // Objetivo
  if (objetivo === 'Começar do zero') score += 0;
  else if (objetivo === 'Aumentar autoridade') score += 1;
  else if (objetivo === 'Escalar faturamento') score += 2;
  else if (objetivo === 'Liberdade geográfica') score += 1;

  // Faturamento
  if (faturamento === 'Até 1k€') score += 0;
  else if (faturamento === '1k€ a 5k€') score += 1;
  else if (faturamento === '5k€ a 20k€') score += 2;
  else if (faturamento === 'Mais de 20k€') score += 3;

  // Comunicação
  if (comunicacao === 'Inexistente') score += 0;
  else if (comunicacao === 'Inconsistente') score += 1;
  else if (comunicacao === 'Frequente mas sem vendas') score += 2;
  else if (comunicacao === 'Estratégica') score += 3;

  if (score <= 2) {
    return {
      level: 'iniciante',
      program: 'Método PRIME',
      programLink: 'https://sites.google.com/view/programadementoriapremium',
      diagnosis: `O seu perfil revela um enorme potencial por explorar. Tem a ambição certa, mas precisa de uma base sólida de posicionamento e comunicação estratégica.\n\nO Método PRIME foi desenhado exactamente para si — vai transformar o seu conhecimento em autoridade digital, criar uma bio magnética que atrai clientes e dominar a psicologia do branding.\n\nEste é o momento de construir os alicerces da sua marca milionária. O primeiro passo é sempre o mais importante.`,
    };
  } else if (score <= 4) {
    return {
      level: 'intermedio',
      program: 'Comunidade Milionária',
      programLink: 'https://comunidademilionaria.pt',
      diagnosis: `Já deu os primeiros passos e tem resultados — mas sabe que pode ir muito mais longe. O seu maior acelerador agora é rodear-se das pessoas certas.\n\nA Comunidade Milionária vai dar-lhe acesso a mentoria mensal, networking de elite e desafios que vão empurrar o seu negócio para o próximo nível.\n\nA abundância multiplica-se quando se junta a quem já está no caminho. O seu lugar é entre os melhores.`,
    };
  } else if (score <= 6) {
    return {
      level: 'avancado',
      program: 'Personal Branding MASTERY',
      programLink: 'https://personalbrandingmastery.pt',
      diagnosis: `O seu perfil mostra alguém com experiência e resultados consistentes. Está pronto para a escala máxima — vendas de alto ticket, infoprodutos e influência global.\n\nO Personal Branding MASTERY é o maior programa de aceleração de marcas pessoais em língua portuguesa. É aqui que marcas se tornam referências absolutas no seu mercado.\n\nO seu próximo nível não é crescer — é dominar.`,
    };
  } else {
    return {
      level: 'expert',
      program: 'Mentoria Privada',
      programLink: 'https://subscribepage.io/mentoriaprivada',
      diagnosis: `O seu perfil é excepcional — já tem comunicação estratégica, faturamento elevado e visão clara. O que precisa agora é de um plano cirúrgico e acompanhamento 1:1.\n\nA Mentoria Privada com o Manuel Manero oferece acesso direto, auditoria completa de marca e uma estratégia personalizada para escalar sem limites.\n\nQuem já está no topo, precisa de quem já lá esteve. Este é o convite.`,
    };
  }
};

export const getAssessmentDiagnosis = async (answers: string[]): Promise<string> => {
  // Small delay to feel more "AI-like"
  await new Promise(resolve => setTimeout(resolve, 1500));

  const profile = getDiagnosisProfile(answers);
  return `${profile.diagnosis}\n\n🎯 Programa recomendado: ${profile.program}`;
};
