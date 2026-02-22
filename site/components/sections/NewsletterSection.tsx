import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../ui/ScrollReveal';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <ScrollReveal>
          <SectionTitle
            title="Receba Insights Exclusivos"
            subtitle="Estratégias de Personal Branding e mindset de abundância diretamente no seu email."
            gold="Insights Exclusivos"
          />

          {submitted ? (
            <div className="glass-card rounded-2xl p-10 border border-amber-500/30">
              <p className="text-2xl font-display font-bold gold-gradient mb-2">Subscrito com sucesso!</p>
              <p className="text-slate-400">Bem-vindo à comunidade. Verifique o seu email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="O seu melhor email"
                required
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-6 py-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-amber-600 transition-all transform hover:scale-105 whitespace-nowrap"
              >
                Subscrever Grátis
              </button>
            </form>
          )}

          <p className="text-slate-600 text-xs mt-4">
            Sem spam. Cancelar quando quiser.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSection;
