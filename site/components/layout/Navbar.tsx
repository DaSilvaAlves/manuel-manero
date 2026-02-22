import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Início',      path: '/' },
  { name: 'Sobre',       path: '/sobre' },
  { name: 'Programas',   path: '/programas' },
  { name: 'Comunidade',  path: '/comunidade' },
  { name: 'Escola',      path: '/escola' },
  { name: 'Livros',      path: '/livros' },
  { name: 'Testemunhos', path: '/testemunhos' },
  { name: 'Contactos',   path: '/contactos' },
];

interface NavbarProps {
  bannerVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ bannerVisible = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          bannerVisible ? 'top-10' : 'top-0'
        } ${
          scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Manuel Manero Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold font-display tracking-tighter">
              MANUEL<span className="text-amber-500">MANERO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 7).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                  location.pathname === link.path ? 'text-amber-500' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contactos"
              className="bg-amber-500 text-slate-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-600 transition-all transform hover:scale-105"
            >
              Começar Agora
            </Link>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            className="lg:hidden text-slate-300 hover:text-amber-500 transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-md lg:hidden flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 text-slate-300 hover:text-amber-500 transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-2xl font-display font-bold hover:text-amber-500 transition-colors ${
                location.pathname === link.path ? 'text-amber-500' : 'text-slate-200'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/contactos"
            className="mt-4 bg-amber-500 text-slate-950 px-10 py-4 rounded-full text-lg font-bold hover:bg-amber-600 transition-all"
          >
            Começar Agora
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
