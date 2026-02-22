import React from 'react';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { PROGRAMS } from '../constants';

const Programas: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Ecossistema</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Nossos <span className="gold-gradient">Programas</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Níveis de evolução para cada fase da sua jornada de crescimento.
          Escolha o programa que se adapta ao seu momento.
        </p>
      </div>
    </section>

    {/* Programs Detail */}
    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6 space-y-24">
        {PROGRAMS.map((prog, i) => (
          <div
            key={prog.id}
            className={`grid lg:grid-cols-2 gap-16 items-center ${
              i % 2 === 1 ? 'lg:direction-rtl' : ''
            }`}
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4 block">
                {prog.level}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{prog.title}</h2>
              <p className="text-amber-400/70 italic mb-4">{prog.tagline}</p>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">{prog.description}</p>

              <div className="space-y-3 mb-10">
                {prog.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-slate-300">
                    <span className="text-amber-500 font-bold text-lg">✓</span> {f}
                  </div>
                ))}
              </div>

              <a href={prog.ctaLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={prog.highlight ? 'primary' : 'outline'}
                  size="lg"
                >
                  {prog.cta}
                </Button>
              </a>
            </div>

            <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className={`glass-card p-10 rounded-3xl border ${
                prog.highlight ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-slate-800'
              }`}>
                {prog.highlight && (
                  <div className="text-center mb-6">
                    <span className="bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold font-display text-center mb-6">{prog.title}</h3>
                <div className="space-y-4">
                  {prog.features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-500 text-xs">✓</span>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <a href={prog.ctaLink} target="_blank" rel="noopener noreferrer">
                    <Button variant={prog.highlight ? 'primary' : 'outline'} className="w-full">
                      {prog.cta}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Final */}
    <section className="py-24 bg-slate-950 text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <SectionTitle
          title="Não sabe qual escolher?"
          subtitle="Faça o diagnóstico AI gratuito na nossa página inicial e descubra o programa ideal para si."
        />
        <a href="/#">
          <Button variant="primary" size="lg">Fazer Diagnóstico AI</Button>
        </a>
      </div>
    </section>
  </div>
);

export default Programas;
