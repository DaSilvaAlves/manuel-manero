import React from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 shadow-xl shadow-amber-500/20',
  outline: 'border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-slate-950',
  ghost:   'border border-slate-700 text-slate-300 hover:bg-slate-900',
};

const sizeClasses: Record<Size, string> = {
  sm:  'px-6 py-2 text-sm rounded-full',
  md:  'px-8 py-3 text-sm rounded-full',
  lg:  'px-10 py-4 text-base rounded-full',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center font-semibold transition-all transform hover:scale-105',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
