'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Início', path: '/' as const },
    { name: 'Sobre', path: '/sobre' as const },
    { name: 'Programas', path: '/programas' as const },
    { name: 'Comunidade', path: '/comunidade' as const },
    { name: 'Escola', path: '/escola' as const },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          MANUEL<span className="text-amber-500">MANERO</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path as any}
              className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                pathname === link.path ? 'text-amber-500' : 'text-slate-300'
              }`}
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
  )
}

const Footer: React.FC = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
      <div>
        <h3 className="text-amber-500 font-bold mb-4">Sobre</h3>
        <p className="text-slate-400 text-sm">Marcas pessoais milionárias através de estratégia e IA.</p>
      </div>
      <div>
        <h3 className="text-amber-500 font-bold mb-4">Programas</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li>PRIME</li>
          <li>MASTERY</li>
          <li>Mentorías</li>
        </ul>
      </div>
      <div>
        <h3 className="text-amber-500 font-bold mb-4">Comunidade</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li>Discord</li>
          <li>LinkedIn</li>
          <li>Instagram</li>
        </ul>
      </div>
      <div>
        <h3 className="text-amber-500 font-bold mb-4">Legal</h3>
        <ul className="text-slate-400 text-sm space-y-2">
          <li>Privacidade</li>
          <li>Termos</li>
          <li>Contato</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-slate-900 pt-8 text-center text-slate-500 text-sm">
      <p>&copy; 2026 Manuel Manero. Todos os direitos reservados.</p>
    </div>
  </footer>
)

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  )
}
