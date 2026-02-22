import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ScrollReveal from '../ui/ScrollReveal';

const credentials = [
  '15+ Anos de Experiência',
  'Expert em Personal Branding',
  'Autor de 3 Livros',
  'Mentor de 10.000+ Empreendedores',
  'Speaker Internacional',
];

const AboutSection: React.FC = () => (
  <section className="py-24 bg-slate-900/20">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <ScrollReveal direction="left" className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 bg-gold-gradient opacity-10 rounded-3xl blur-2xl" />
          <img
            src="/manuel-manero.png"
            alt="Manuel Manero"
            className="relative rounded-3xl w-full object-cover aspect-[4/5] border border-slate-800"
          />
          {/* Stats overlay */}
          <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5 flex justify-around">
            {[
              { v: '10k+', l: 'Alunos' },
              { v: '15+',  l: 'Anos' },
              { v: '3',    l: 'Livros' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold font-display gold-gradient">{s.v}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal direction="right" className="order-1 lg:order-2">
          <Badge className="mb-6">Sobre Manuel Manero</Badge>
          <SectionTitle
            title="O Especialista em Marcas Pessoais Milionárias"
            gold="Marcas Pessoais Milionárias"
            center={false}
            className="mb-8"
          />

          <p className="text-slate-400 leading-relaxed mb-6">
            Com mais de 15 anos no mercado da comunicação e marketing digital, Manuel Manero
            tornou-se a referência em Personal Branding para o mercado lusófono.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            A sua missão é ajudar empreendedores a desbloquearem o seu verdadeiro potencial
            através de uma marca autêntica, forte e milionária que gera resultados reais.
          </p>

          {/* Credentials */}
          <ul className="space-y-3 mb-10">
            {credentials.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.08}>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-amber-500 font-bold">✓</span>
                  {c}
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <Link to="/sobre">
            <Button variant="outline" size="lg">
              Conhecer a Minha História
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
