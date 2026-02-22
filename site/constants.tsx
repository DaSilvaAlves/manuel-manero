import { Program, Testimonial, QuizQuestion, Book, SocialLink, Stat } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'prime',
    title: 'Método PRIME',
    tagline: 'O alicerce da sua marca pessoal.',
    description: 'Transforme o seu conhecimento em autoridade digital através de um método estruturado de comunicação e posicionamento.',
    level: 'Iniciante',
    features: ['Estratégia de Conteúdo', 'Bio Magnética', 'Psicologia do Branding'],
    cta: 'Quero ser PRIME',
    ctaLink: 'https://sites.google.com/view/programadementoriapremium',
  },
  {
    id: 'mastery',
    title: 'Personal Branding MASTERY',
    tagline: 'Aceleração máxima e escala.',
    description: 'O maior programa de aceleração de marcas pessoais em língua portuguesa. Foco em vendas de alto ticket e influência global.',
    level: 'Avançado',
    features: ['Escala de Infoprodutos', 'Vendas High-Ticket', 'Network Exclusivo'],
    cta: 'Candidatar ao MASTERY',
    ctaLink: 'https://personalbrandingmastery.pt',
    highlight: true,
  },
  {
    id: 'comunidade',
    title: 'Comunidade Milionária',
    tagline: 'Onde os tubarões se encontram.',
    description: 'A maior rede de empreendedores focada em abundância e resultados exponenciais.',
    level: 'Intermédio',
    features: ['Mentoria Mensal', 'Networking de Elite', 'Desafios de Escala'],
    cta: 'Entrar na Comunidade',
    ctaLink: 'https://comunidademilionaria.pt',
  },
  {
    id: 'mentoria',
    title: 'Mentoria Privada',
    tagline: 'Acompanhamento 1:1 direto com Manuel.',
    description: 'Para quem quer resultados rápidos e acesso exclusivo. Plano totalmente personalizado para o seu negócio.',
    level: 'Mastermind',
    features: ['Plano Customizado', 'Acesso Direto via WhatsApp', 'Auditoria Completa de Marca'],
    cta: 'Candidatar à Mentoria',
    ctaLink: 'https://subscribepage.io/mentoriaprivada',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Mentora de Negócios',
    content: 'O Manuel mudou completamente a forma como me posiciono. Saí de 2k para 15k mensais em 3 meses.',
    avatar: 'https://picsum.photos/seed/ana/100/100',
    program: 'Método PRIME',
  },
  {
    id: '2',
    name: 'João Pereira',
    role: 'Consultor Financeiro',
    content: 'A Comunidade Milionária é o melhor investimento que fiz na minha carreira. O networking é inestimável.',
    avatar: 'https://picsum.photos/seed/joao/100/100',
    program: 'Comunidade Milionária',
  },
  {
    id: '3',
    name: 'Carla Rodrigues',
    role: 'Coach de Liderança',
    content: 'Em 6 meses de MASTERY tripliciei o meu faturamento e tornei-me uma referência no meu nicho.',
    avatar: 'https://picsum.photos/seed/carla/100/100',
    program: 'Personal Branding MASTERY',
  },
  {
    id: '4',
    name: 'Ricardo Santos',
    role: 'Empreendedor Digital',
    content: 'A mentoria privada foi transformadora. Manuel ajudou-me a estruturar o negócio e a escalar para 6 dígitos.',
    avatar: 'https://picsum.photos/seed/ricardo/100/100',
    program: 'Mentoria Privada',
  },
];

export const BOOKS: Book[] = [
  {
    id: 'milionario',
    title: 'O Livro do Milionário',
    price: '€16.00',
    description: 'Os princípios e mentalidade que constroem fortunas reais e duradouras.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=560&fit=crop',
    buyLink: 'https://www.manuelmanero.pt/livros',
  },
  {
    id: 'nomada',
    title: 'Empreender Como Um Nómada Digital',
    price: '€16.00',
    description: 'Como construir um negócio lucrativo com liberdade geográfica total.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=560&fit=crop',
    buyLink: 'https://www.manuelmanero.pt/livros',
  },
  {
    id: 'caixa',
    title: 'Pensar e Agir Fora da Caixa',
    price: '€16.00',
    description: 'Desenvolva o pensamento criativo e inovador que separa os líderes dos seguidores.',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=560&fit=crop',
    buyLink: 'https://www.manuelmanero.pt/livros',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/marca.manero/', icon: 'instagram' },
  { name: 'YouTube',   url: 'https://www.youtube.com/channel/UCxGFJ7O7qnA_FrfkKMIcGXA', icon: 'youtube' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/manuelmanero/', icon: 'linkedin' },
  { name: 'Facebook',  url: 'https://www.facebook.com/manuelmanero.pt/', icon: 'facebook' },
  { name: 'Spotify',   url: 'https://open.spotify.com/show/0wsqUcORPnELb6fVYFJ3JV', icon: 'spotify' },
];

export const STATS: Stat[] = [
  { value: '10k+', label: 'Impactados' },
  { value: '5k+',  label: 'Comunidade' },
  { value: '15+',  label: 'Anos Exp.' },
  { value: '3',    label: 'Livros' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Qual é o seu objetivo principal hoje?',
    options: ['Começar do zero', 'Aumentar autoridade', 'Escalar faturamento', 'Liberdade geográfica'],
  },
  {
    id: 2,
    text: 'Quanto fatura o seu negócio atual (mensal)?',
    options: ['Até 1k€', '1k€ a 5k€', '5k€ a 20k€', 'Mais de 20k€'],
  },
  {
    id: 3,
    text: 'Como descreveria a sua comunicação atual?',
    options: ['Inexistente', 'Inconsistente', 'Frequente mas sem vendas', 'Estratégica'],
  },
];
