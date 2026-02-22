import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../ui/ScrollReveal';
import { TESTIMONIALS } from '../../constants';

const TestimonialsSection: React.FC = () => (
  <section className="py-24 bg-amber-500/5">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <SectionTitle
          title="Resultados Reais"
          subtitle="Histórias de transformação de quem já passou pelo ecossistema Manuel Manero."
          gold="Resultados Reais"
        />
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 0.1}>
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl flex gap-6 hover:border-amber-500/30 transition-all">
              <img
                src={t.avatar}
                className="w-16 h-16 rounded-full border-2 border-amber-500 flex-shrink-0 object-cover"
                alt={t.name}
              />
              <div>
                {t.program && (
                  <span className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-2 block">
                    {t.program}
                  </span>
                )}
                <p className="text-slate-300 italic mb-4 leading-relaxed">"{t.content}"</p>
                <h5 className="font-bold text-white">{t.name}</h5>
                <span className="text-xs text-slate-500">{t.role}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center">
          <Link
            to="/testemunhos"
            className="text-amber-500 border border-amber-500/30 px-8 py-3 rounded-full text-sm font-bold hover:bg-amber-500 hover:text-slate-950 transition-all"
          >
            Ver Todos os Testemunhos →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default TestimonialsSection;
