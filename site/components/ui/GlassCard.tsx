import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = false }) => (
  <div
    className={`glass-card rounded-2xl border border-slate-800 ${
      hover ? 'hover:border-amber-500/30 hover:translate-y-[-8px] transition-all duration-300' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export default GlassCard;
