
export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado' | 'Mastermind';
  features: string[];
  cta: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  videoUrl?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
}
