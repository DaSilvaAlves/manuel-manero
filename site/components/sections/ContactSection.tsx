import React from 'react';
import { Mail, Phone } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../ui/ScrollReveal';
import { SOCIAL_LINKS } from '../../constants';

const ContactSection: React.FC = () => (
  <section className="py-24 bg-slate-950" id="contactos">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <SectionTitle
          title="Vamos Trabalhar Juntos?"
          subtitle="Pronto para transformar a sua marca pessoal? Entre em contacto."
          gold="Trabalhar Juntos?"
        />
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact info */}
        <ScrollReveal direction="left">
          <div className="glass-card p-8 rounded-2xl border border-slate-800">
            <h3 className="font-display font-bold text-xl mb-6">Contacto Direto</h3>

            <div className="space-y-5">
              <a
                href="mailto:geral@manuelmanero.pt"
                className="flex items-center gap-4 text-slate-300 hover:text-amber-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Mail size={18} className="text-amber-500" />
                </div>
                <span>geral@manuelmanero.pt</span>
              </a>

              <a
                href="https://wa.me/351000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-slate-300 hover:text-amber-500 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Phone size={18} className="text-amber-500" />
                </div>
                <span>WhatsApp Business</span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm mb-4">Redes Sociais</p>
              <div className="flex gap-3 flex-wrap">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Google Forms embed */}
        <ScrollReveal direction="right">
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfj1XjCiUVEbeWBhnM3FhQdE9kCoZT7TptOYfjwiJ3gWW1BKA/viewform?embedded=true"
              className="w-full h-[600px]"
              title="Formulário de Contacto Manuel Manero"
              frameBorder={0}
            >
              A carregar formulário…
            </iframe>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default ContactSection;
