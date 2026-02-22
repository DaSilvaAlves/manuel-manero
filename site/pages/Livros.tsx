import React from 'react';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { BOOKS } from '../constants';

const Livros: React.FC = () => (
  <div>
    <section className="pt-40 pb-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6">Biblioteca</Badge>
        <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] mb-6">
          Os Meus <span className="gold-gradient">Livros</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Três livros que destilam anos de experiência em estratégias práticas para
          empreendedores que querem construir marcas de elite.
        </p>
      </div>
    </section>

    <section className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {BOOKS.map(book => (
            <div key={book.id} className="glass-card rounded-3xl border border-slate-800 overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold font-display mb-3">{book.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold gold-gradient">{book.price}</span>
                  <a href={book.buyLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Comprar</Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-slate-950 text-center">
      <div className="container mx-auto px-6 max-w-2xl">
        <SectionTitle
          title="Quer um exemplar autografado?"
          subtitle="Entre em contacto para encomendar directamente com dedicatória personalizada."
        />
        <a href="mailto:geral@manuelmanero.pt">
          <Button variant="primary" size="lg">Contactar para Encomenda</Button>
        </a>
      </div>
    </section>
  </div>
);

export default Livros;
