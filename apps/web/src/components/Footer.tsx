import React from 'react'
import Link from 'next/link'
import { Container } from './Container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Produto',
      items: [
        { label: 'Home', href: '/' },
        { label: 'Programas', href: '/programas' },
        { label: 'Comunidade', href: '/comunidade' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'Sobre', href: '/sobre' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contato', href: '/contato' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacidade', href: '/privacidade' },
        { label: 'Termos', href: '/termos' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'in',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: 'ig',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: 'yt',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'x',
    },
  ]

  return (
    <footer className="bg-secondary/5 border-t border-border pt-12 pb-8">
      <Container size="default">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Manuel Manero</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Marca Pessoal Milionária. Construa presença, impacto e resultados escaláveis.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="text-sm font-medium">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Manuel Manero. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Construído com ❤️ para empreendedores
          </p>
        </div>
      </Container>
    </footer>
  )
}
