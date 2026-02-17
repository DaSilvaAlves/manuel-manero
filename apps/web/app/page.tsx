import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Container, Badge } from '@/components'

export const metadata: Metadata = {
  title: 'Manuel Manero | Marca Pessoal Milionária',
  description: 'Construa uma Marca Pessoal Milionária com comunicação estratégica. PRIME para iniciantes, MASTERY avançado, Comunidade exclusiva.',
  keywords: 'marca pessoal, coaching, personal branding, empreendedorismo',
  openGraph: {
    title: 'Manuel Manero | Marca Pessoal Milionária',
    description: 'Construa uma Marca Pessoal Milionária com o método PRIME, MASTERY e Comunidade Milionária.',
    type: 'website',
    url: 'https://manuelmanero.com',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630',
        width: 1200,
        height: 630,
        alt: 'Manuel Manero - Marca Pessoal Milionária',
      },
    ],
  },
}

interface TransformationBlock {
  icon: string
  title: string
  subtitle: string
  description: string
}

interface EcosystemCard {
  id: string
  title: string
  badge: string
  description: string
  benefits: string[]
  cta: string
}

const transformationBlocks: TransformationBlock[] = [
  {
    icon: '🎯',
    title: 'Presença Forte',
    subtitle: 'No mercado',
    description: 'Apareça como referência na tua indústria e domina a mente do teu público',
  },
  {
    icon: '🎤',
    title: 'Comunicação',
    subtitle: 'Com impacto',
    description: 'Comunica com autenticidade e persuade sem parecer que estás a vender',
  },
  {
    icon: '📈',
    title: 'Escala',
    subtitle: 'Em resultados',
    description: 'Multiplica teus leads, clientes e receita de forma sustentável',
  },
  {
    icon: '💎',
    title: 'Abundância',
    subtitle: 'Liberdade total',
    description: 'Liberdade financeira, geográfica e de tempo para viver como desejas',
  },
]

const ecosystemCards: EcosystemCard[] = [
  {
    id: 'prime',
    title: 'PRIME',
    badge: 'Iniciante',
    description: 'Fundamentos de personal branding. Perfecto para quem está começando a construir a sua marca.',
    benefits: ['Comunicação estratégica', 'Posicionamento claro', 'Primeiros seguidores', '4 semanas intensas'],
    cta: 'Começar com PRIME',
  },
  {
    id: 'mastery',
    title: 'MASTERY',
    badge: 'Avançado',
    description: 'Escalação e domínio. Para quem quer ser referência e gerar vendas em escala.',
    benefits: ['Monetização', 'Comunidade exclusiva', 'Mentoria 1:1', 'Acesso vitalício'],
    cta: 'Explorar MASTERY',
  },
  {
    id: 'community',
    title: 'Comunidade Milionária',
    badge: 'Conexão',
    description: 'Rede de empreendedores focados em crescimento. Networking, eventos e suporte constante.',
    benefits: ['Networking premium', 'Lives semanais', 'Recursos IA', 'Ambiente colaborativo'],
    cta: 'Entrar na Comunidade',
  },
]

export default function Home() {

  return (
    <main className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary/90 text-white pt-32 pb-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <Container size="lg" className="relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Construa uma Marca Pessoal <span className="text-accent">Milionária</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-xl">
                  Comunicação estratégica, método comprovado e ecossistema certo para escalares a tua presença, influência e resultados.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Comece Agora
                </a>
                <a
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore Programas
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex items-center justify-center h-full min-h-[400px] lg:min-h-[500px]">
              <div className="relative w-full max-w-md">
                {/* Hero Image Placeholder with gradient border */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 p-1 shadow-2xl">
                  <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🎬</div>
                      <p className="text-slate-400 font-medium">Hero Video</p>
                      <p className="text-slate-500 text-sm">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRANSFORMAÇÃO ENTREGUE SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Container size="lg">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              A Transformação que Entrego
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Quatro pilares fundamentais que te levam de invisível a referência no teu mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationBlocks.map((block, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-5xl mb-3">{block.icon}</div>
                  <CardTitle className="text-2xl">{block.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-accent">
                    {block.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {block.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ECOSYSTEM PREVIEW SECTION */}
      <section className="py-20">
        <Container size="lg">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              O Ecossistema Manuel Manero
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Três programas complementares para levar-te do iniciante à referência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {ecosystemCards.map((card) => (
              <Card key={card.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl">{card.title}</CardTitle>
                    <Badge variant="secondary">{card.badge}</Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                      Inclui:
                    </p>
                    <ul className="space-y-2">
                      {card.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-accent font-bold mt-1">✓</span>
                          <span className="text-slate-600 dark:text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/programas"
                    className={`inline-flex w-full justify-center items-center rounded-md text-sm font-semibold h-11 px-4 mt-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      card.id === 'mastery'
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {card.cta}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ecosystem Note */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">💡 Dica:</span> A maioria dos membros começa com PRIME, evolui para MASTERY e permanece na Comunidade para crescimento contínuo.
            </p>
          </div>
        </Container>
      </section>

      {/* SOCIAL PROOF / STATS SECTION */}
      <section className="py-20 bg-primary text-white">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold">10k+</p>
              <p className="text-slate-300 text-lg">Impactados</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold">5k+</p>
              <p className="text-slate-300 text-lg">Na Comunidade</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold">15+</p>
              <p className="text-slate-300 text-lg">Anos de Expertise</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20">
        <Container size="sm">
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Pronto para Transformar a Tua Marca?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Junte-se a milhares de empreendedores que já estão construindo marcas pessoais milionárias.
            </p>
            <a
              href="/programas"
              className="inline-flex items-center justify-center rounded-md text-lg font-semibold h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Junte-se ao Ecossistema
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
