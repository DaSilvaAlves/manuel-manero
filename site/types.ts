export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado' | 'Mastermind';
  features: string[];
  cta: string;
  ctaLink: string;
  price?: string;
  highlight?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  program?: string;
  videoUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  price: string;
  description: string;
  cover: string;
  buyLink: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
}
