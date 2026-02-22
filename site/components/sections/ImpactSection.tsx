import React from 'react';

const stats = [
  { value: '10k+', label: 'Impactados' },
  { value: '5k+',  label: 'Comunidade' },
  { value: '15+',  label: 'Anos Exp.' },
];

const testimonials = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Mentora de Negócios',
    initials: 'AS',
    content: 'O Manuel mudou completamente a forma como me posiciono. Saí de 2k para 15k mensais em 3 meses.',
  },
  {
    id: '2',
    name: 'João Pereira',
    role: 'Consultor Financeiro',
    initials: 'JP',
    content: 'A Comunidade Milionária é o melhor investimento que fiz na minha carreira. O networking é inestimável.',
  },
];

const ImpactSection: React.FC = () => (
  <section className="py-24 bg-amber-500/5">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">
        Impacto <span className="text-amber-500">Real</span>
      </h2>

      {/* Stats */}
      <div className="flex justify-center gap-12 mb-16">
        {stats.map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-bold font-display gold-gradient">{stat.value}</div>
            <div className="text-slate-500 text-xs uppercase tracking-widest mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map(t => (
          <div key={t.id} className="p-8 bg-slate-950 border border-slate-800 rounded-2xl flex gap-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
              {t.initials}
            </div>
            <div>
              <span className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-2 block">
                {t.role}
              </span>
              <p className="text-slate-300 italic mb-4 leading-relaxed">"{t.content}"</p>
              <h5 className="font-bold text-white">{t.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
