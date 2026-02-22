import React from 'react';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import { SOCIAL_LINKS } from '../constants';

const Contactos: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Contactos</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Vamos Trabalhar <span className="gold-gradient">Juntos?</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Entre em contacto para saber mais sobre os programas, parcerias ou simplesmente dizer olá.
        </p>
      </div>
    </section>

    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <SectionTitle title="Informações de Contacto" center={false} className="mb-8" />

            <div className="space-y-8">
              <div>
                <h4 className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-2">Email</h4>
                <a href="mailto:geral@manuelmanero.pt" className="text-slate-300 hover:text-amber-500 transition-colors text-lg">
                  geral@manuelmanero.pt
                </a>
              </div>

              <div>
                <h4 className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-2">WhatsApp Business</h4>
                <a
                  href="https://wa.me/351968032398"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-amber-500 transition-colors text-lg"
                >
                  +351 968 032 398
                </a>
              </div>

              <div>
                <h4 className="text-amber-500 text-xs uppercase tracking-widest font-bold mb-2">Redes Sociais</h4>
                <div className="flex flex-wrap gap-4">
                  {SOCIAL_LINKS.map(s => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-amber-500 transition-colors border border-slate-800 px-4 py-2 rounded-full text-sm hover:border-amber-500/30"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-slate-800">
                <h4 className="text-white font-bold mb-2">Parcerias & Media</h4>
                <p className="text-slate-400 text-sm">
                  Para pedidos de palestra, entrevistas ou parcerias comerciais,
                  envie um email para <span className="text-amber-500">geral@manuelmanero.pt</span> com
                  o assunto "Parceria".
                </p>
              </div>
            </div>
          </div>

          {/* Google Forms */}
          <div>
            <SectionTitle title="Envie uma Mensagem" center={false} className="mb-8" />
            <div className="rounded-2xl overflow-hidden border border-slate-800">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfj1XjCiUVEbeWBhnM3FhQdE9kCoZT7TptOYfjwiJ3gWW1BKA/viewform?embedded=true"
                className="w-full h-[600px] bg-slate-900"
                title="Formulário de Contacto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contactos;
