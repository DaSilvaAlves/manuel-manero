import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { STATS } from '../../constants';
import ScrollReveal from '../ui/ScrollReveal';

const AnimatedCounter: React.FC<{ target: string }> = ({ target }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const suffix = target.replace(/[\d]/g, '');
    const numericValue = parseInt(target.replace(/\D/g, ''), 10);

    if (isNaN(numericValue)) {
      setDisplayed(target);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += numericValue / steps;
      if (current >= numericValue) {
        setDisplayed(`${numericValue}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayed(`${Math.floor(current)}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      className="text-4xl md:text-5xl font-bold font-display gold-gradient"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {displayed}
    </motion.div>
  );
};

const StatsSection: React.FC = () => (
  <section className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="glass-card p-8 rounded-2xl border border-slate-800">
              <AnimatedCounter target={stat.value} />
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
