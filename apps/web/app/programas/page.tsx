import { Metadata } from 'next'
import { Card, CardContent, CardHeader, Container } from '@/components'
import { TestimonialCarousel, type Testimonial } from '@/components/TestimonialCarousel'

export const metadata: Metadata = {
  title: 'Programas | Manuel Manero | PRIME, MASTERY, Mentorias',
  description: 'Descubra os três programas de personal branding: PRIME para iniciantes, MASTERY avançado, e Mentorias 1:1 personalizadas.',
  keywords: 'programas, PRIME, MASTERY, mentorias, personal branding, coaching',
  openGraph: {
    title: 'Programas | Manuel Manero',
    description: 'PRIME, MASTERY e Mentorias - programas de personal branding comprovados.',
    type: 'website',
    url: 'https://manuelmanero.com/programas',
  },
}

interface Benefit {
  icon: string
  text: string
}

interface Program {
  id: string
  title: string
  subtitle: string
  badge: string
  price?: string
  duration: string
  description: string

  problem: string
  promise: string
  method: string
  methodDetails: string[]

  benefits: Benefit[]

  forWhom: {
    is: string[]
    isNot: string[]
  }

  testimonials: Testimonial[]

  ctaText: string
  ctaColor: 'primary' | 'accent'
}

const primeTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Em 4 semanas, minha presença online transformou completamente. Agora as pessoas me procuram, não preciso procurá-las.',
    author: 'Carlos Mendes',
    role: 'Consultor Freelancer',
    rating: 5,
  },
  {
    id: '2',
    quote: 'PRIME deu-me a clareza que precisava sobre minha marca. Saí com um posicionamento claro e pronto para aplicar.',
    author: 'Ana Silva',
    role: 'Executiva de RH',
    rating: 5,
  },
  {
    id: '3',
    quote: 'O método é direto e prático. Não é teórico demais, é ação real desde o dia 1.',
    author: 'Roberto Costa',
    role: 'Empreendedor Tech',
    rating: 5,
  },
]

const masteryTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'MASTERY foi um game-changer. Em 6 meses, minha receita triplicou e agora sou referência no meu mercado.',
    author: 'Sofia Gonçalves',
    role: 'Coach de Vida',
    rating: 5,
  },
  {
    id: '2',
    quote: 'A comunidade em MASTERY vale ouro. O networking e suporte diário acelerou meu crescimento exponencialmente.',
    author: 'Miguel Ferreira',
    role: 'Especialista em Marketing',
    rating: 5,
  },
  {
    id: '3',
    quote: 'Mentoria 1:1 com Manuel foi transformadora. Ele vê oportunidades que eu não conseguia enxergar.',
    author: 'Joana Lima',
    role: 'Consultora Estratégica',
    rating: 5,
  },
]

const mentoriasTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Mentorias personalizadas = transformação acelerada. Manuel me ajudou a desenhar minha estratégia de 5 anos.',
    author: 'Pedro Alves',
    role: 'CEO de Startup',
    rating: 5,
  },
  {
    id: '2',
    quote: 'Acesso direto a Manuel para resolver meus maiores desafios. Isso vale muito mais que o investimento.',
    author: 'Mariana Teixeira',
    role: 'Fundadora de Agência',
    rating: 5,
  },
]

const programs: Program[] = [
  {
    id: 'prime',
    title: 'PRIME',
    subtitle: 'Fundamentos de Personal Branding',
    badge: 'Iniciante',
    duration: '4 semanas intensas',
    description: 'O programa de entrada para quem quer construir uma marca pessoal forte desde zero.',

    problem:
      'Você tem conhecimento e experiência, mas ninguém sabe disso. Fica invisível no mercado enquanto concorrentes menos qualificados ganham destaque.',
    promise:
      'Em 4 semanas, você terá uma marca pessoal clara, impactante e pronta para gerar resultados.',
    method: 'Metodologia comprovada em 4 módulos:',
    methodDetails: [
      'Módulo 1: Descoberta - Identifique seu diferencial único',
      'Módulo 2: Posicionamento - Defina exatamente como você quer ser percebido',
      'Módulo 3: Comunicação - Comunique com impacto e autenticidade',
      'Módulo 4: Execução - Implemente sua estratégia em tempo real',
    ],

    benefits: [
      { icon: '🎯', text: 'Clareza sobre seu posicionamento' },
      { icon: '📱', text: 'Presença online estruturada' },
      { icon: '💬', text: 'Comunicação impactante' },
      { icon: '🚀', text: 'Primeiros seguidores e oportunidades' },
      { icon: '📚', text: 'Acesso ao material de referência' },
      { icon: '👥', text: 'Comunidade PRIME supportiva' },
    ],

    forWhom: {
      is: [
        'Profissionais que querem começar sua marca pessoal',
        'Empreendedores em estágio inicial',
        'Consultores e freelancers',
        'Pessoas que querem visibilidade no mercado',
      ],
      isNot: [
        'Pessoas que já têm marca pessoal estabelecida (use MASTERY)',
        'Quem não está disposto a tomar ação',
        'Quem procura solução passiva',
      ],
    },

    testimonials: primeTestimonials,
    ctaText: 'Começar com PRIME',
    ctaColor: 'primary',
  },

  {
    id: 'mastery',
    title: 'MASTERY',
    subtitle: 'Escalação de Marca Pessoal',
    badge: 'Avançado',
    price: 'Investimento premium',
    duration: '16 semanas + acesso vitalício',
    description: 'Para quem já tem marca e quer escalar para se tornar referência e gerar vendas em escala.',

    problem:
      'Você tem presença, mas não gera receita consistente. Seu conhecimento não se converte em negócios escaláveis. Você quer crescimento acelerado.',
    promise:
      'Torne-se referência absoluta no seu nicho, gere fluxo contínuo de clientes e viva com liberdade financeira e geográfica.',
    method: 'Programa intensivo de 16 semanas com 4 pilares:',
    methodDetails: [
      'Pilar 1: Monetização - Estruture seus fluxos de receita',
      'Pilar 2: Autoridade - Torne-se incontestável no seu nicho',
      'Pilar 3: Comunidade - Construa seu ecossistema de clientes',
      'Pilar 4: Máquina de Crescimento - Automatize sua visibilidade',
    ],

    benefits: [
      { icon: '💰', text: 'Modelo de monetização claro' },
      { icon: '👑', text: 'Posição de autoridade e referência' },
      { icon: '🌐', text: 'Presença em múltiplos canais' },
      { icon: '🤝', text: 'Comunidade exclusiva de 500+ membros' },
      { icon: '1️⃣', text: 'Mentoria 1:1 personalizada' },
      { icon: '♾️', text: 'Acesso vitalício' },
      { icon: '📈', text: 'Estratégia de crescimento anual' },
      { icon: '🎓', text: 'Certificação de Especialista' },
    ],

    forWhom: {
      is: [
        'Consultores com presença estabelecida',
        'Coaches que querem escalar negócios',
        'Empreendedores em crescimento',
        'Profissionais buscando independência financeira',
        'Quem já fez PRIME e quer evoluir',
      ],
      isNot: [
        'Iniciantes completos (comece com PRIME)',
        'Quem não pode investir significativamente',
        'Pessoas passivas em implementação',
      ],
    },

    testimonials: masteryTestimonials,
    ctaText: 'Explorar MASTERY',
    ctaColor: 'accent',
  },

  {
    id: 'mentorias',
    title: 'Mentorias',
    subtitle: '1:1 e Mastermind Premium',
    badge: 'VIP',
    duration: 'Customizado (3-12 meses)',
    description: 'Acesso direto a Manuel para estratégia e mentoria personalizada. Para quem quer transformação acelerada.',

    problem:
      'Você sabe que precisa de ajuda personalizada, mas programas genéricos não resolvem seus desafios únicos. Você quer alguém no seu canto.',
    promise:
      'Tenha um mentor dedicado que entende seus desafios específicos, desenha estratégia customizada e o acompanha até resultados transformadores.',
    method: 'Acompanhamento personalizado com foco em:',
    methodDetails: [
      'Diagnóstico profundo da sua situação atual',
      'Estratégia customizada para seus objetivos',
      'Sessões de mentoria 1:1 intensivas',
      'Suporte contínuo entre sessões',
      'Accountability pessoal para resultados',
      'Acesso a rede VIP de empreendedores',
    ],

    benefits: [
      { icon: '🎯', text: 'Estratégia 100% personalizada' },
      { icon: '👤', text: 'Acesso direto a Manuel' },
      { icon: '📞', text: 'Sessões 1:1 semanais ou quinzenais' },
      { icon: '💼', text: 'Suporte para implementação' },
      { icon: '🤝', text: 'Rede VIP de empreendedores' },
      { icon: '📊', text: 'Análise profunda de negócio' },
      { icon: '🚀', text: 'Aceleração de resultados' },
      { icon: '∞', text: 'Suporte vitalício' },
    ],

    forWhom: {
      is: [
        'Empreendedores com negócio significativo',
        'CEOs buscando crescimento acelerado',
        'Profissionais de alto valor',
        'Fundadores de startups',
        'Quem quer transformação acelerada',
      ],
      isNot: [
        'Orçamento limitado',
        'Quem quer solução genérica',
        'Pessoas sem comprometimento',
      ],
    },

    testimonials: mentoriasTestimonials,
    ctaText: 'Solicitar Consulta',
    ctaColor: 'primary',
  },
]

export default function ProgramsPage() {
  return (
    <main className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary/90 text-white pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
                Escolha Seu <span className="text-accent">Caminho</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                Três programas progressivos para levar você de invisível a referência no seu mercado.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-12">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((program) => (
              <div key={program.id} className="flex flex-col">
                {/* Program Card Header */}
                <Card className="flex-1 flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">
                          {program.badge}
                        </p>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                          {program.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      {program.subtitle}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                      📅 {program.duration}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-8">
                    {/* Description */}
                    <div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Problem Section */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                        O Problema
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {program.problem}
                      </p>
                    </div>

                    {/* Promise Section */}
                    <div className="space-y-2 p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                        A Promessa
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                        {program.promise}
                      </p>
                    </div>

                    {/* Method Section */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                        O Método
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {program.method}
                      </p>
                      <ul className="space-y-2">
                        {program.methodDetails.map((detail, idx) => (
                          <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300">
                            <span className="text-accent font-bold flex-shrink-0">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        O Que Inclui
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {program.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <span className="text-xl flex-shrink-0">{benefit.icon}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              {benefit.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Proof - Testimonials */}
                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        O Que Dizem
                      </h3>
                      <TestimonialCarousel testimonials={program.testimonials} />
                    </div>

                    {/* For Whom */}
                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-3">
                        Para Quem É / Não É
                      </h3>

                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                          <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
                            ✓ Para Quem É:
                          </p>
                          <ul className="space-y-1">
                            {program.forWhom.is.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-green-800 dark:text-green-200"
                              >
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
                            ✗ Para Quem Não É:
                          </p>
                          <ul className="space-y-1">
                            {program.forWhom.isNot.map((item, idx) => (
                              <li key={idx} className="text-sm text-red-800 dark:text-red-200">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <a
                        href={`#contato-${program.id}`}
                        className={`block w-full text-center font-semibold py-3 px-4 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          program.ctaColor === 'primary'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-accent text-accent-foreground hover:bg-accent/90'
                        }`}
                      >
                        {program.ctaText}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Container size="lg">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">Comparação</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Qual programa é melhor para você?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b-2 border-slate-300 dark:border-slate-600">
                  <th className="text-left py-3 px-4 font-bold">Feature</th>
                  <th className="text-center py-3 px-4 font-bold">PRIME</th>
                  <th className="text-center py-3 px-4 font-bold">MASTERY</th>
                  <th className="text-center py-3 px-4 font-bold">Mentorias</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">Duração</td>
                  <td className="text-center py-3 px-4">4 semanas</td>
                  <td className="text-center py-3 px-4">16 semanas</td>
                  <td className="text-center py-3 px-4">Customizado</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">Mentoria 1:1</td>
                  <td className="text-center py-3 px-4">Grupo</td>
                  <td className="text-center py-3 px-4">✓ Mensal</td>
                  <td className="text-center py-3 px-4">✓ Semanal</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">Comunidade</td>
                  <td className="text-center py-3 px-4">✓ PRIME</td>
                  <td className="text-center py-3 px-4">✓ 500+ VIP</td>
                  <td className="text-center py-3 px-4">✓ Elite</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-3 px-4">Suporte</td>
                  <td className="text-center py-3 px-4">4 semanas</td>
                  <td className="text-center py-3 px-4">Vitalício</td>
                  <td className="text-center py-3 px-4">Vitalício</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Ideal Para</td>
                  <td className="text-center py-3 px-4">Iniciantes</td>
                  <td className="text-center py-3 px-4">Crescimento</td>
                  <td className="text-center py-3 px-4">Aceleração</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Qual É o Seu Próximo Passo?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Escolha o programa que melhor se alinha com onde você está agora e onde quer chegar.
            </p>
            <a
              href="#home"
              className="inline-flex items-center justify-center rounded-md text-lg font-semibold h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Voltar ao Início
            </a>
          </div>
        </Container>
      </section>

      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Manuel Manero - Programas de Personal Branding',
            description: 'Três programas de personal branding: PRIME, MASTERY e Mentorias',
            provider: {
              '@type': 'Organization',
              name: 'Manuel Manero Ecossistema',
              url: 'https://manuelmanero.com',
            },
            hasCourseInstance: [
              {
                '@type': 'CourseInstance',
                name: 'PRIME',
                description: 'Programa de 4 semanas para iniciantes em personal branding',
                courseMode: 'OnlineCoursePlatform',
              },
              {
                '@type': 'CourseInstance',
                name: 'MASTERY',
                description: 'Programa de 16 semanas para escalação de marca pessoal',
                courseMode: 'OnlineCoursePlatform',
              },
              {
                '@type': 'CourseInstance',
                name: 'Mentorias',
                description: 'Mentoria 1:1 e Mastermind personalizado',
                courseMode: 'OnlineCoursePlatform',
              },
            ],
          }),
        }}
      />
    </main>
  )
}
