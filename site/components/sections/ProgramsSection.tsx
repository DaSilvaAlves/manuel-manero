import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../ui/ScrollReveal';
import { PROGRAMS } from '../../constants';

const ProgramsSection: React.FC = () => (
  <section id="programas" className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <SectionTitle
          title="O Ecossistema"
          subtitle="Níveis de evolução para cada fase da sua jornada de crescimento."
        />
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PROGRAMS.map((prog, i) => (
          <ScrollReveal key={prog.id} delay={i * 0.1}>
            <div
              className={`glass-card p-8 rounded-3xl flex flex-col h-full hover:translate-y-[-8px] transition-transform duration-300 ${
                prog.highlight
                  ? 'border border-amber-500/50 ring-1 ring-amber-500/20'
                  : 'border border-slate-800'
              }`}
            >
              {prog.highlight && (
                <div className="text-center mb-4">
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                {prog.level}
              </span>
              <h3 className="text-xl font-bold mb-3 font-display">{prog.title}</h3>
              <p className="text-slate-400 text-sm mb-2 text-amber-400/70 italic">{prog.tagline}</p>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{prog.description}</p>
              <div className="space-y-2 mb-8">
                {prog.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-amber-500">✓</span> {f}
                  </div>
                ))}
              </div>
              <a
                href={prog.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-xl text-center font-bold text-sm transition-all ${
                  prog.highlight
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-600'
                    : 'bg-slate-900 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-slate-950'
                }`}
              >
                {prog.cta}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramsSection;
