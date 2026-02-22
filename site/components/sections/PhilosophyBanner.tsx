import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

const PhilosophyBanner: React.FC = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Gold glow background */}
    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5" />
    <div className="absolute inset-0 border-y border-amber-500/10" />

    <div className="container mx-auto px-6 text-center relative z-10">
      <ScrollReveal>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-500 mb-6">Filosofia de Marca</p>
        <blockquote className="text-3xl md:text-5xl font-display font-bold leading-tight max-w-4xl mx-auto mb-8">
          "A abundância não é um destino.{' '}
          <span className="gold-gradient">É uma decisão.</span>"
        </blockquote>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
          Construa a marca que representa quem você realmente é — e os resultados seguirão.
        </p>
        <Link
          to="/sobre"
          className="inline-block text-amber-500 border-b border-amber-500/50 hover:border-amber-500 pb-1 font-semibold transition-colors"
        >
          Conhecer a filosofia →
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

export default PhilosophyBanner;
