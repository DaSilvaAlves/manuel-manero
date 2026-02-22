import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/50 to-slate-950 z-10" />
      <img
        src="/hero-bg.png"
        className="w-full h-full object-cover opacity-60 scale-110"
        alt="Manuel Manero"
      />
    </div>

    <div className="container mx-auto px-6 relative z-20 text-center pt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Badge className="mb-6">Posicionamento de Elite</Badge>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-8xl font-display font-bold leading-[1.1] mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Construa uma Marca <br />
        <span className="gold-gradient">Pessoal Milionária.</span>
      </motion.h1>

      <motion.p
        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Comunicação estratégica, método comprovado e um ecossistema exclusivo para escalar
        a sua presença, influência e resultados financeiros.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Button
          as="a"
          href="https://sites.google.com/view/programadementoriapremium"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          variant="primary"
        >
          Começar Agora
        </Button>
        <Link to="/programas">
          <Button size="lg" variant="ghost">
            Ver Programas
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
