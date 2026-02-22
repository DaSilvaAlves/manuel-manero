import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => (
  <span
    className={`inline-block px-4 py-1 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-500 text-xs font-bold uppercase tracking-[0.2em] ${className}`}
  >
    {children}
  </span>
);

export default Badge;
