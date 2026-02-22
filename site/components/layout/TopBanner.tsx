import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TopBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

const TopBanner: React.FC<TopBannerProps> = ({ onVisibilityChange }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 w-full z-50 bg-amber-500 text-slate-950 text-center py-2 px-4 text-sm font-semibold flex items-center justify-center gap-4">
      <span>
        🔥 Vagas limitadas — Programa de Mentoria PREMIUM 2026{' '}
        <a
          href="https://sites.google.com/view/programadementoriapremium"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 font-bold hover:opacity-80 transition-opacity ml-1"
        >
          Candidatar agora →
        </a>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 hover:opacity-70 transition-opacity"
        aria-label="Fechar banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBanner;
