import React from 'react';

interface GoldTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const GoldText: React.FC<GoldTextProps> = ({ children, className = '', as: Tag = 'span' }) => (
  <Tag className={`gold-gradient ${className}`}>{children}</Tag>
);

export default GoldText;
