import React from 'react';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';

const credentials = [
  '15+ Anos de Experiência',
  'Expert em Personal Branding',
  'Autor de 3 Livros',
  'Mentor de 10.000+ Empreendedores',
  'Speaker Internacional',
];

const timeline = [
  { year: '2011', title: 'Início na Comunicação Digital', desc: 'Primeiros passos no marketing digital e comunicação estratégica em Portugal.' },
  { year: '2016', title: 'Foco em Personal Branding', desc: 'Especialização no posicionamento de marcas pessoais para o mercado lusófono.' },
  { year: '2019', title: 'Lançamento do Método PRIME', desc: 'Criação do método proprietário para construção de marcas pessoais milionárias.' },
  { year: '2022', title: 'Comunidade Milionária', desc: 'Fundação da maior rede de empreendedores focada em abundância e resultados exponenciais.' },
  { year: '2025', title: 'Ecossistema Completo', desc: '10.000+ empreendedores impactados, 3 livros publicados, expansão internacional.' },
];

const valores = [
  { icon: '🎯', title: 'Autenticidade', desc: 'Construímos marcas que reflectem quem realmente somos, não personagens fabricadas.' },
  { icon: '⭐', title: 'Excelência', desc: 'Cada detalhe importa. A qualidade do posicionamento define os resultados.' },
  { icon: '💰', title: 'Abundância', desc: 'A mentalidade de abundância é o motor que impulsiona resultados extraordinários.' },
];

const Sobre: React.FC = () => (
  <div>
    {/* Hero */}
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-6">Sobre Manuel Manero</Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-8">
              O Especialista em <span className="gold-gradient">Marcas Pessoais Milionárias</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Com mais de 15 anos no mercado da comunicação e marketing digital, Manuel Manero
              tornou-se a referência em Personal Branding para o mercado lusófono.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              A sua missão é ajudar empreendedores a desbloquearem o seu verdadeiro potencial
              através de uma marca autêntica, forte e milionária que gera resultados reais.
            </p>
            <ul className="space-y-3">
              {credentials.map(c => (
                <li key={c} className="flex items-center gap-3 text-slate-300">
                  <span className="text-amber-500 font-bold">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gold-gradient opacity-10 rounded-3xl blur-2xl" />
            <img
              src="/manuel-manero.png"
              alt="Manuel Manero"
              className="relative rounded-3xl w-full object-cover aspect-[4/5] border border-slate-800"
            />
          </div>
        </div>
      </div>
    </section>

    {/* A Missão */}
    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <SectionTitle title="A Missão" gold="Missão" />
        <p className="text-slate-400 text-lg leading-relaxed mb-6">
          Acredito que todos os empreendedores merecem ser reconhecidos pelo seu verdadeiro valor.
          O problema não é a falta de talento — é a falta de posicionamento estratégico.
        </p>
        <p className="text-slate-400 text-lg leading-relaxed mb-6">
          Através dos meus programas, mentorias e da Comunidade Milionária, ajudo profissionais
          a construir uma presença digital autêntica que atrai oportunidades e gera receita de forma consistente.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed font-medium">
          O meu objectivo é simples: transformar empreendedores em autoridades reconhecidas nos seus mercados.
        </p>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle title="A Jornada" subtitle="Mais de uma década a construir marcas de elite." />
        <div className="space-y-12">
          {timeline.map((item, i) => (
            <div key={item.year} className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-20 text-right">
                <span className="text-2xl font-display font-bold gold-gradient">{item.year}</span>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] top-2 w-3 h-3 rounded-full bg-amber-500" />
                {i < timeline.length - 1 && (
                  <div className="absolute -left-[20px] top-5 w-[2px] h-full bg-slate-800" />
                )}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Valores */}
    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <SectionTitle title="Valores Fundamentais" subtitle="Os princípios que guiam tudo o que fazemos." />
        <div className="grid md:grid-cols-3 gap-8">
          {valores.map(v => (
            <div key={v.title} className="glass-card p-8 rounded-2xl border border-slate-800 text-center">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold font-display mb-3">{v.title}</h3>
              <p className="text-slate-400 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Sobre;
