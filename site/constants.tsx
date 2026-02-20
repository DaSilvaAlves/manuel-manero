
import React from 'react';
import { Program, Testimonial, QuizQuestion } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'prime',
    title: 'Método PRIME',
    tagline: 'O alicerce da sua marca pessoal.',
    description: 'Transforme o seu conhecimento em autoridade digital através de um método estruturado de comunicação e posicionamento.',
    level: 'Iniciante',
    features: ['Estratégia de Conteúdo', 'Bio Magnética', 'Psicologia do Branding'],
    cta: 'Quero ser PRIME'
  },
  {
    id: 'mastery',
    title: 'Personal Branding MASTERY',
    tagline: 'Aceleração máxima e escala.',
    description: 'O maior programa de aceleração de marcas pessoais em língua portuguesa. Foco em vendas de alto ticket e influência global.',
    level: 'Avançado',
    features: ['Escala de Infoprodutos', 'Vendas High-Ticket', 'Network Exclusivo'],
    cta: 'Candidatar ao MASTERY'
  },
  {
    id: 'comunidade',
    title: 'Comunidade Milionária',
    tagline: 'Onde os tubarões se encontram.',
    description: 'A maior rede de empreendedores focada em abundância e resultados exponenciais.',
    level: 'Intermédio',
    features: ['Mentoria Mensal', 'Networking de Elite', 'Desafios de Escala'],
    cta: 'Entrar na Comunidade'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Mentora de Negócios',
    content: 'O Manuel mudou completamente a forma como me posiciono. Saí de 2k para 15k mensais em 3 meses.',
    avatar: 'https://picsum.photos/seed/ana/100/100'
  },
  {
    id: '2',
    name: 'João Pereira',
    role: 'Consultor Financeiro',
    content: 'A Comunidade Milionária é o melhor investimento que fiz na minha carreira. O networking é inestimável.',
    avatar: 'https://picsum.photos/seed/joao/100/100'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Qual é o seu objetivo principal hoje?",
    options: ["Começar do zero", "Aumentar autoridade", "Escalar faturamento", "Liberdade geográfica"]
  },
  {
    id: 2,
    text: "Quanto fatura o seu negócio atual (mensal)?",
    options: ["Até 1k€", "1k€ a 5k€", "5k€ a 20k€", "Mais de 20k€"]
  },
  {
    id: 3,
    text: "Como descreveria a sua comunicação atual?",
    options: ["Inexistente", "Inconsistente", "Frequente mas sem vendas", "Estratégica"]
  }
];
