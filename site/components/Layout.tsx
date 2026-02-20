
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Programas', path: '/programas' },
    { name: 'Comunidade', path: '/comunidade' },
    { name: 'Escola', path: '/escola' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-display tracking-tighter">
          MANUEL<span className="text-amber-500">MANERO</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium hover:text-amber-500 transition-colors ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-amber-500 text-slate-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-600 transition-all transform hover:scale-105">
            Área de Membros
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
      <div className="col-span-2">
        <h2 className="text-3xl font-display font-bold mb-6">MANUEL MANERO</h2>
        <p className="text-slate-400 max-w-md leading-relaxed mb-8">
          Transformando empreendedores em autoridades através de uma marca pessoal milionária.
          A abundância é o seu direito de nascimento.
        </p>
        <div className="flex gap-4">
          {['Instagram', 'YouTube', 'LinkedIn', 'Spotify'].map(s => (
            <a key={s} href="#" className="text-slate-500 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">{s}</a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Programas</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/programas" className="hover:text-amber-500">Método PRIME</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500">Personal Branding MASTERY</Link></li>
          <li><Link to="/comunidade" className="hover:text-amber-500">Comunidade Milionária</Link></li>
          <li><Link to="/programas" className="hover:text-amber-500">Mentorias Individuais</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Explorar</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li><Link to="/sobre" className="hover:text-amber-500">Minha História</Link></li>
          <li><Link to="/blog" className="hover:text-amber-500">Blog / Podcast</Link></li>
          <li><Link to="/escola" className="hover:text-amber-500">Manuais Gratuitos</Link></li>
          <li><Link to="/contacto" className="hover:text-amber-500">Contactos</Link></li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-6 pt-10 border-t border-slate-900 text-center text-slate-600 text-xs">
      &copy; 2026 Manuel Manero. Todos os direitos reservados. Design de Elite.
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);
