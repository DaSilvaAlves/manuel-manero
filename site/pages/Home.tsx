
import React from 'react';
import AIQuiz from '../components/AIQuiz';
import { PROGRAMS, TESTIMONIALS } from '../constants';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-30 scale-110"
            alt="Business Context"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center pt-20">
          <div className="inline-block px-4 py-1 mb-6 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-500 text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
            Posicionamento de Elite
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] mb-8 animate-slide-up">
            Construa uma Marca <br />
            <span className="gold-gradient">Pessoal Milionária.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Comunicação estratégica, método comprovado e um ecossistema exclusivo para escalar a sua presença, influência e resultados financeiros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-amber-500 text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-xl shadow-amber-500/20">
              Começar Agora
            </button>
            <button className="px-10 py-4 rounded-full border border-slate-700 font-bold text-lg hover:bg-slate-900 transition-all">
              Ver Programas
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Presença', icon: '💎', desc: 'Posicionamento magnético que atrai os clientes certos.' },
              { title: 'Comunicação', icon: '📢', desc: 'Narrativas poderosas que convertem audiência em fãs.' },
              { title: 'Escala', icon: '📈', desc: 'Modelos de negócio preparados para o crescimento global.' },
              { title: 'Abundância', icon: '🌍', desc: 'Mindset focado em legado, propósito e liberdade real.' },
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl border border-slate-900 hover:border-amber-500/30 transition-all group">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-display">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Diagnosis Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Descubra o Seu <span className="text-amber-500">Potencial de Marca</span></h2>
            <p className="text-slate-400">Responda a 3 perguntas e receba um diagnóstico personalizado pela nossa IA.</p>
          </div>
          <AIQuiz />
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold">O Ecossistema</h2>
              <p className="text-slate-500 mt-2">Níveis de evolução para cada fase da sua jornada.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROGRAMS.map((prog) => (
              <div key={prog.id} className="glass-card p-8 rounded-3xl border border-slate-900 flex flex-col h-full hover:translate-y-[-8px] transition-transform">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">{prog.level}</span>
                <h3 className="text-2xl font-bold mb-4 font-display">{prog.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{prog.description}</p>
                <div className="space-y-3 mb-8">
                  {prog.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-amber-500">✓</span> {f}
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-500 font-bold hover:bg-amber-500 hover:text-slate-950 transition-all">
                  {prog.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-amber-500/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Impacto Real</h2>
            <div className="flex justify-center gap-12 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold font-display gold-gradient">10k+</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">Impactados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-display gold-gradient">5k+</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">Comunidade</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-display gold-gradient">15+</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">Anos Exp.</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-8 bg-slate-950 border border-slate-900 rounded-2xl flex gap-6">
                <img src={t.avatar} className="w-16 h-16 rounded-full border-2 border-amber-500" alt={t.name} />
                <div>
                  <p className="text-slate-300 italic mb-4 leading-relaxed">"{t.content}"</p>
                  <h5 className="font-bold">{t.name}</h5>
                  <span className="text-xs text-amber-500 uppercase font-medium">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
