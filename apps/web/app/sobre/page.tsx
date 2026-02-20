import { Metadata } from 'next'
import { Card, CardContent, CardHeader, Container } from '@/components'
import { Timeline, type TimelineEvent } from '@/components/Timeline'

export const metadata: Metadata = {
  title: 'Sobre Manuel Manero | 15+ Anos de Expertise em Marca Pessoal',
  description: 'Conheça a história de Manuel Manero. 15+ anos em comunicação estratégica, criador do MASTERY e fundador da Comunidade Milionária.',
  keywords: 'manuel manero, sobre, história, experiência, personal branding',
  openGraph: {
    title: 'Sobre Manuel Manero | Marca Pessoal Milionária',
    description: 'Conheça a jornada de Manuel Manero em personal branding e comunicação estratégica.',
    type: 'website',
    url: 'https://manuelmanero.com/sobre',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630',
        width: 1200,
        height: 630,
        alt: 'Manuel Manero',
      },
    ],
  },
}

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  image?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '2008',
    year: '2008',
    title: 'Início da Jornada em Marketing Digital',
    description: 'Começou a explorar as possibilidades do marketing online e branding pessoal.',
    details: 'Percebeu que a maioria dos profissionais não tinha presença estratégica online e começou a estudar como mudar isso.',
    icon: '🌐',
  },
  {
    id: '2012',
    year: '2012',
    title: 'Primeiros Sucessos e Reconhecimento',
    description: 'Consolidou presença como especialista em comunicação estratégica e começou a ensinar outros.',
    details: 'Seus clientes começavam a ganhar visibilidade no mercado de forma acelerada. Decidiu documentar o método.',
    icon: '🚀',
  },
  {
    id: '2016',
    title: 'Criação do Programa MASTERY',
    year: '2016',
    description: 'Lançou o programa de aceleração em Personal Branding MASTERY com metodologia própria.',
    details: 'Desenvolveu um framework comprovado para escalação de marca pessoal. Primeiros 100 alunos tiveram resultados transformadores.',
    icon: '📚',
  },
  {
    id: '2019',
    year: '2019',
    title: 'Fundação da Comunidade Milionária',
    description: 'Criou uma comunidade exclusiva de empreendedores focados em crescimento exponencial.',
    details: 'A Comunidade Milionária cresceu para 5000+ membros ativos com networking, eventos e recursos premium.',
    icon: '👥',
  },
  {
    id: '2023',
    year: '2023',
    title: 'Lançamento do Programa PRIME',
    description: 'Criou PRIME como ponto de entrada para iniciantes em personal branding.',
    details: 'Estruturou um programa intensivo de 4 semanas para quem está começando sua jornada em marca pessoal.',
    icon: '⭐',
  },
  {
    id: '2024',
    year: '2024',
    title: 'Consolidação do Ecossistema Integrado',
    description: 'Unificou PRIME, MASTERY e Comunidade em um ecossistema completo.',
    details: '10,000+ pessoas impactadas com metodologia comprovada de personal branding e comunicação estratégica.',
    icon: '🎯',
  },
]

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Em 6 meses com o MASTERY, minha receita triplicou. A metodologia de Manuel é ouro puro para quem quer escalar.',
    author: 'Sofia Costa',
    role: 'Empreendedora Digital',
  },
  {
    id: 'testimonial-2',
    quote: 'A Comunidade Milionária mudou minha vida profissional. O networking e o suporte são incomparáveis.',
    author: 'João Silva',
    role: 'Consultor de Negócios',
  },
  {
    id: 'testimonial-3',
    quote: 'PRIME me deu as fundações que precisava. Agora tenho uma marca pessoal clara e impactante.',
    author: 'Maria Gonçalves',
    role: 'Coach Executiva',
  },
]

export default function AboutPage() {

  return (
    <main className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary/90 text-white pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight">
                Quem é <span className="text-accent">Manuel Manero</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                15+ anos construindo marcas pessoais poderosas, impactando 10,000+ pessoas e criando um ecossistema de crescimento exponencial.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO SECTION */}
      <section className="py-12">
        <Container size="lg">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">A História Começou com uma Observação</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Manuel percebeu que muitos profissionais talentosos permaneciam invisíveis no mercado. Eles tinham conhecimento,
                experiência e resultados, mas ninguém sabia disso. Decidiu mudar isso.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Em vez de apenas trabalhar com clientes, começou a documentar e ensinar o método que funcionava. Nasceu assim
                uma metodologia comprovada de personal branding e comunicação estratégica.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 py-8 border-y border-slate-200 dark:border-slate-700">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">15+</p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">Anos de Expertise</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">10k+</p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">Impactados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-accent">5k+</p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">Na Comunidade</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Container size="lg">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">A Jornada</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Como evoluiu de curiosidade em marketing digital para construir um ecossistema de crescimento exponencial
            </p>
          </div>

          <Timeline events={timelineEvents} defaultOpenId="2024" />
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20">
        <Container size="lg">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">O Que Dizem Sobre Manuel</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram suas marcas e vidas através do método
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <blockquote className="text-lg italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CALENDLY SECTION */}
      <section className="py-20 bg-gradient-to-br from-accent/10 to-accent/5">
        <Container size="lg">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Vamos Conversar?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Agende uma conversa gratuita e conheça como posso ajudar você a construir sua marca pessoal milionária
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg overflow-hidden border border-accent/20 bg-white dark:bg-slate-800 shadow-lg">
              <iframe
                src="https://calendly.com/manuelmanero/consult?hide_landing_page_details=1&hide_gdpr_banner=1"
                width="100%"
                height="700"
                frameBorder="0"
                title="Agende uma conversa com Manuel"
                className="border-none"
              />
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              Disponível para consultas às terças e quintas-feiras
            </p>
          </div>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Pronto para Transformar Sua Marca?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Escolha o programa certo para sua jornada e comece agora mesmo.
            </p>
            <a
              href="/programas"
              className="inline-flex items-center justify-center rounded-md text-lg font-semibold h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Explorar Programas
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
            '@type': 'Person',
            name: 'Manuel Manero',
            url: 'https://manuelmanero.com',
            sameAs: [
              'https://www.linkedin.com/in/manuelmanero',
              'https://www.instagram.com/manuelmanero',
            ],
            jobTitle: 'Especialista em Personal Branding e Comunicação Estratégica',
            worksFor: {
              '@type': 'Organization',
              name: 'Manuel Manero Ecossistema',
            },
            description: 'Especialista em personal branding com 15+ anos de experiência, criador do MASTERY e fundador da Comunidade Milionária.',
            image: 'https://via.placeholder.com/400x400',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Manuel Manero Ecossistema',
            url: 'https://manuelmanero.com',
            logo: 'https://manuelmanero.com/logo.png',
            description: 'Ecossistema de programas de personal branding e comunicação estratégica',
            founder: 'Manuel Manero',
            foundingDate: '2008',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              availableLanguageID: 'pt-PT',
            },
          }),
        }}
      />
    </main>
  )
}
