import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';

const benefits = [
  { title: 'Mentoria Mensal ao Vivo', desc: 'Sessões em grupo com Manuel Manero para resolver desafios reais do seu negócio.' },
  { title: 'Networking de Elite', desc: 'Acesso a uma rede exclusiva de empreendedores focados em resultados extraordinários.' },
  { title: 'Desafios de Escala', desc: 'Desafios mensais práticos para acelerar o crescimento da sua marca pessoal.' },
  { title: 'Conteúdo Exclusivo', desc: 'Materiais, frameworks e templates que não estão disponíveis em mais lado nenhum.' },
  { title: 'Acesso Prioritário', desc: 'Prioridade em eventos, lançamentos e oportunidades de parceria.' },
  { title: 'Suporte da Comunidade', desc: 'Um grupo activo que se apoia mutuamente — juntos vamos mais longe.' },
];

const forWhom = [
  'Empreendedores que querem posicionar-se como autoridades',
  'Profissionais liberais que querem atrair clientes premium',
  'Coaches e consultores que querem escalar o negócio',
  'Criadores de conteúdo que querem monetizar a audiência',
];

const notForWhom = [
  'Quem procura resultados sem trabalho',
  'Quem não está disposto a investir em si próprio',
  'Quem espera fórmulas mágicas instantâneas',
];

const Comunidade: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Comunidade</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Comunidade <span className="gold-gradient">Milionária</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          A maior rede de empreendedores focada em abundância e resultados exponenciais.
          Onde os tubarões se encontram.
        </p>
        <a href="https://comunidademilionaria.pt" target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="lg">Entrar na Comunidade</Button>
        </a>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <SectionTitle title="O que vai encontrar" subtitle="Tudo o que precisa para acelerar o crescimento da sua marca." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(b => (
            <div key={b.title} className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
              <h3 className="text-lg font-bold mb-3">{b.title}</h3>
              <p className="text-slate-400 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* For Whom */}
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-display font-bold mb-8 text-amber-500">Para quem é</h2>
            <ul className="space-y-4">
              {forWhom.map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <span className="text-amber-500 font-bold mt-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-8 text-slate-500">Para quem NÃO é</h2>
            <ul className="space-y-4">
              {notForWhom.map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-500">
                  <span className="text-slate-600 font-bold mt-1">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-amber-500/5 text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <SectionTitle title="Pronto para entrar?" subtitle="Junte-se a milhares de empreendedores que estão a transformar as suas marcas pessoais." />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://comunidademilionaria.pt" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg">Entrar na Comunidade</Button>
          </a>
          <Link to="/testemunhos">
            <Button variant="ghost" size="lg">Ver Testemunhos</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Comunidade;
