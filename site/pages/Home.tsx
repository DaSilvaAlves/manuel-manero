import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import PillarsSection from '../components/sections/PillarsSection';
import AboutSection from '../components/sections/AboutSection';
import VideoSection from '../components/sections/VideoSection';
import ProgramsSection from '../components/sections/ProgramsSection';
import PhilosophyBanner from '../components/sections/PhilosophyBanner';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import StatsSection from '../components/sections/StatsSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import ContactSection from '../components/sections/ContactSection';
import AIQuiz from '../components/AIQuiz';

const Home: React.FC = () => (
  <div>
    <HeroSection />
    <PillarsSection />
    <AboutSection />
    <VideoSection />

    {/* AI Diagnosis */}
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Descubra o Seu <span className="text-amber-500">Potencial de Marca</span>
          </h2>
          <p className="text-slate-400">
            Responda a 3 perguntas e receba um diagnóstico personalizado pela nossa IA.
          </p>
        </div>
        <AIQuiz />
      </div>
    </section>

    <ProgramsSection />
    <PhilosophyBanner />
    <TestimonialsSection />
    <StatsSection />
    <NewsletterSection />
    <ContactSection />
  </div>
);

export default Home;
