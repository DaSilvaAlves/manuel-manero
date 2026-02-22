import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  gold?: string;       // highlighted word(s) in gold
  center?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  gold,
  center = true,
  className = '',
}) => {
  const renderTitle = () => {
    if (!gold) return title;
    const parts = title.split(gold);
    return (
      <>
        {parts[0]}
        <span className="gold-gradient">{gold}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`mb-16 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
