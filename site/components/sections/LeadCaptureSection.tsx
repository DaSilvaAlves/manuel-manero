import React, { useState } from 'react';

const LeadCaptureSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus('loading');
    try {
      // Placeholder — connect to /api/leads when backend is ready
      await new Promise(resolve => setTimeout(resolve, 800));
      setStatus('success');
    } catch {
      setErrorMsg('Erro ao enviar. Tente novamente.');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Pronto para Transformar a sua <span className="text-amber-500">Marca</span>?
        </h2>
        <p className="text-slate-400 mb-12">
          Deixe o seu contacto e receba conteúdos exclusivos sobre marca pessoal e posicionamento de elite.
        </p>

        {status === 'success' ? (
          <div className="glass-card rounded-2xl p-10 border border-amber-500/30">
            <p className="text-2xl font-display font-bold gold-gradient mb-2">Obrigado!</p>
            <p className="text-slate-400">Verifique o seu email para continuar.</p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-6">Envie o seu Email</h3>

            {status === 'error' && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="O seu nome"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="O seu melhor email"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-6 py-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 hover:opacity-90 disabled:opacity-50"
              >
                {status === 'loading' ? 'A enviar...' : 'Enviar'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default LeadCaptureSection;
