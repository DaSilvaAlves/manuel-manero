import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../ui/ScrollReveal';

const VideoSection: React.FC = () => (
  <section className="py-24 bg-slate-950">
    <div className="container mx-auto px-6 max-w-4xl">
      <ScrollReveal>
        <SectionTitle
          title="Bem-vindo ao Meu Mundo"
          subtitle="Descubra como transformar a sua marca pessoal numa máquina de resultados."
          gold="Meu Mundo"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-video">
          <iframe
            src="https://www.youtube.com/embed/OE2tqsNOX1s?si=l_zlMlpwWvapEhwG"
            title="YouTube video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder={0}
          />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default VideoSection;
