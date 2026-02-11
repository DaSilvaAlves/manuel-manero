import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Manuel Manero | Marca Pessoal Milionária',
  description: 'Construa uma Marca Pessoal Milionária e viva em Abundância. Método PRIME, Personal Branding MASTERY e Comunidade Milionária.',
}

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
                Construa uma Marca Pessoal <span className="text-yellow-400">Milionária</span>
              </h1>
              <p className="mt-6 text-xl text-slate-300">
                Comunicação estratégica, método comprovado e ecossistema certo para escalares a tua presença, a tua influência e os teus resultados.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="rounded-lg bg-yellow-400 px-8 py-3 font-semibold text-slate-900 hover:bg-yellow-300 transition">
                  Quero Começar Agora
                </button>
                <button className="rounded-lg border-2 border-yellow-400 px-8 py-3 font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 transition">
                  Ver Programas
                </button>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="aspect-square w-full max-w-md rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent p-1">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-800/50">
                  <span className="text-slate-400">Video Hero</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is Manuel Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="aspect-square w-full max-w-sm rounded-lg bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400">Foto Editorial</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold">Quem é o Manuel?</h2>
            <div className="mt-6 space-y-4 text-lg text-slate-600">
              <p>
                🎓 <strong>15+ anos</strong> em comunicação e marketing digital
              </p>
              <p>
                🚀 Criador do <strong>Personal Branding MASTERY</strong> - o maior programa de aceleração em comunicação estratégica
              </p>
              <p>
                👥 Fundador da <strong>Comunidade Milionária</strong> - maior rede de empreendedores focados em marcas pessoais
              </p>
              <p>
                🎓 Professor na Escola de Turismo de Portugal
              </p>
            </div>
            <button className="mt-8 w-fit rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition">
              Ver História Completa
            </button>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold mb-16">
            A Transformação que Entrego
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎯', title: 'Presença Forte', desc: 'No mercado e na mente do teu público' },
              { icon: '🎤', title: 'Comunicação', desc: 'Com impacto e autenticidade' },
              { icon: '📈', title: 'Resultados', desc: 'Em escala e sustentáveis' },
              { icon: '💎', title: 'Abundância', desc: 'Liberdade financeira e geográfica' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-lg bg-white p-8 shadow-lg hover:shadow-xl transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Pronto para começar?
        </h2>
        <p className="mb-8 text-xl text-slate-600">
          Entra no ecossistema e começa a construir a tua Marca Pessoal Milionária hoje.
        </p>
        <button className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-semibold text-slate-900 hover:bg-yellow-300 transition">
          Explorar Programas
        </button>
      </section>
    </div>
  )
}
