import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';

const modules = [
  { title: 'Fundamentos do Personal Branding', desc: 'Posicionamento, proposta de valor e identidade de marca.', level: 'Básico' },
  { title: 'Comunicação Estratégica', desc: 'Como comunicar com impacto e atrair o público certo.', level: 'Básico' },
  { title: 'Criação de Conteúdo', desc: 'Frameworks para criar conteúdo que converte.', level: 'Intermédio' },
  { title: 'Monetização de Audiência', desc: 'Estratégias para transformar seguidores em clientes.', level: 'Intermédio' },
  { title: 'Vendas de Alto Ticket', desc: 'Como vender serviços e produtos premium com confiança.', level: 'Avançado' },
  { title: 'Escalabilidade e Sistemas', desc: 'Automatização e processos para crescer sem burnout.', level: 'Avançado' },
];

const Escola: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Formação</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Escola de <span className="gold-gradient">Empreendedorismo</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Formação completa em Personal Branding e empreendedorismo digital.
          Do básico ao avançado, com método comprovado.
        </p>
      </div>
    </section>

    {/* Modules */}
    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <SectionTitle title="Módulos" subtitle="Percurso de aprendizagem estruturado para cada nível." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map(m => (
            <div key={m.title} className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
              <span className={`text-xs font-bold uppercase tracking-widest mb-4 block ${
                m.level === 'Básico' ? 'text-emerald-400' :
                m.level === 'Intermédio' ? 'text-amber-500' : 'text-rose-400'
              }`}>
                {m.level}
              </span>
              <h3 className="text-lg font-bold font-display mb-3">{m.title}</h3>
              <p className="text-slate-400 text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Methodology */}
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <SectionTitle title="Metodologia" />
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            { step: '01', title: 'Aprender', desc: 'Vídeo-aulas e materiais estruturados' },
            { step: '02', title: 'Aplicar', desc: 'Exercícios práticos e templates' },
            { step: '03', title: 'Escalar', desc: 'Feedback e acompanhamento contínuo' },
          ].map(s => (
            <div key={s.step}>
              <div className="text-3xl font-display font-bold gold-gradient mb-3">{s.step}</div>
              <h4 className="font-bold text-white mb-2">{s.title}</h4>
              <p className="text-slate-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-amber-500/5 text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <SectionTitle
          title="Comece a sua formação hoje"
          subtitle="A melhor altura para investir na sua marca pessoal é agora."
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/programas">
            <Button variant="primary" size="lg">Ver Programas</Button>
          </Link>
          <Link to="/contactos">
            <Button variant="ghost" size="lg">Falar Connosco</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Escola;
