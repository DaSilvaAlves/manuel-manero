
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import AIChat from './components/AIChat';
import Home from './pages/Home';

const AboutPage = () => (
  <div className="py-40 container mx-auto px-6 text-center">
    <h1 className="text-5xl font-display font-bold gold-gradient mb-8">Sobre Manuel Manero</h1>
    <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-lg">
      Com mais de 15 anos no mercado da comunicação e marketing digital, Manuel Manero tornou-se a referência
      em Personal Branding para o mercado lusófono. A sua missão é ajudar empreendedores a desbloquearem
      o seu verdadeiro potencial através de uma marca autêntica, forte e milionária.
    </p>
  </div>
);

const ProgramsPage = () => (
  <div className="py-40 container mx-auto px-6 text-center">
    <h1 className="text-5xl font-display font-bold gold-gradient mb-8">Nossos Programas</h1>
    <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
      Soluções para todos os estágios do seu crescimento empresarial.
    </p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
      {/* Content already showcased in Home, but expanded here */}
      <div className="glass-card p-10 rounded-3xl border border-amber-500/20">
        <h2 className="text-3xl font-display font-bold mb-4">Mentorias Individuais</h2>
        <p className="text-slate-500 mb-6">Acompanhamento 1:1 direto com Manuel para aceleração radical.</p>
        <ul className="space-y-3 mb-8 text-slate-400">
          <li>• Auditoria Completa de Marca</li>
          <li>• Plano de Escala Customizado</li>
          <li>• Acesso Direto via WhatsApp</li>
        </ul>
        <button className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-xl">Candidatar Agora</button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/programas" element={<ProgramsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
      <AIChat />
    </Router>
  );
};

export default App;
