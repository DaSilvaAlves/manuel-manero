import React from 'react';
import GlassCard from '../ui/GlassCard';
import ScrollReveal from '../ui/ScrollReveal';

const pillars = [
  { title: 'Presença',      icon: '💎', desc: 'Posicionamento magnético que atrai os clientes certos.' },
  { title: 'Comunicação',   icon: '📢', desc: 'Narrativas poderosas que convertem audiência em fãs.' },
  { title: 'Escala',        icon: '📈', desc: 'Modelos de negócio preparados para o crescimento global.' },
  { title: 'Abundância',    icon: '🌍', desc: 'Mindset focado em legado, propósito e liberdade real.' },
];

const PillarsSection: React.FC = () => (
  <section className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={pillar.title} delay={i * 0.1}>
            <GlassCard className="p-8 group h-full" hover>
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{pillar.icon}</div>
              <h3 className="text-xl font-bold mb-2 font-display">{pillar.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default PillarsSection;
