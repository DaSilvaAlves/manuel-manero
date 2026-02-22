import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook, type LucideProps } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';

type IconComponent = React.FC<LucideProps>;

const socialIcons: Record<string, IconComponent> = {
  instagram: Instagram,
  youtube:   Youtube,
  linkedin:  Linkedin,
  facebook:  Facebook,
};

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
      {/* Brand column */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-display font-bold mb-6">
          MANUEL<span className="text-amber-500">MANERO</span>
        </h2>
        <p className="text-slate-400 max-w-md leading-relaxed mb-8">
          Transformando empreendedores em autoridades através de uma marca pessoal milionária.
          A abundância é o seu direito de nascimento.
        </p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map(s => {
            const Icon = socialIcons[s.icon];
            return Icon ? (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-500 transition-colors"
                aria-label={s.name}
              >
                <Icon size={20} />
              </a>
            ) : (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest"
              >
                {s.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Programas column */}
      <div>
        <h4 className="font-bold text-white mb-6">Programas</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/programas" className="hover:text-amber-500 transition-colors">Método PRIME</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500 transition-colors">Personal Branding MASTERY</Link></li>
          <li><Link to="/comunidade" className="hover:text-amber-500 transition-colors">Comunidade Milionária</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500 transition-colors">Mentoria Privada</Link></li>
        </ul>
      </div>

      {/* Explorar column */}
      <div>
        <h4 className="font-bold text-white mb-6">Explorar</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/sobre"       className="hover:text-amber-500 transition-colors">A Minha História</Link></li>
          <li><Link to="/livros"      className="hover:text-amber-500 transition-colors">Os Meus Livros</Link></li>
          <li><Link to="/testemunhos" className="hover:text-amber-500 transition-colors">Testemunhos</Link></li>
          <li><Link to="/escola"      className="hover:text-amber-500 transition-colors">Escola</Link></li>
          <li><Link to="/contactos"   className="hover:text-amber-500 transition-colors">Contactos</Link></li>
        </ul>
      </div>
    </div>

    <div className="container mx-auto px-6 pt-10 border-t border-slate-900 text-center text-slate-600 text-xs">
      &copy; 2026 Manuel Manero. Todos os direitos reservados. Design de Elite.
    </div>
  </footer>
);

export default Footer;
