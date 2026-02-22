import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { TESTIMONIALS } from '../constants';

const Testemunhos: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Provas Sociais</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Resultados <span className="gold-gradient">Reais</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Histórias de transformação de quem já passou pelo ecossistema Manuel Manero.
        </p>
      </div>
    </section>

    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="p-8 glass-card border border-slate-800 rounded-2xl hover:border-amber-500/30 transition-all">
              <div className="flex gap-6">
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
                  <p className="text-slate-300 italic mb-4 leading-relaxed text-lg">"{t.content}"</p>
                  <h5 className="font-bold text-white">{t.name}</h5>
                  <span className="text-sm text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Quer ser o próximo caso de sucesso?</p>
          <Link to="/programas">
            <Button variant="primary" size="lg">Ver Programas</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Testemunhos;
