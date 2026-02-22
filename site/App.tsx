import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import TopBanner from './components/layout/TopBanner';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Programas from './pages/Programas';
import Comunidade from './pages/Comunidade';
import Escola from './pages/Escola';
import Livros from './pages/Livros';
import Testemunhos from './pages/Testemunhos';
import Contactos from './pages/Contactos';
import usePageTitle from './hooks/usePageTitle';

const PageTitleUpdater: React.FC = () => { usePageTitle(); return null; };

// ─── Error Boundary ──────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px', color: '#fbbf24', background: '#0f172a', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>⚠ Erro de Renderização</h1>
          <pre style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', overflow: 'auto', color: '#f87171', fontSize: '14px' }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const handleBannerChange = useCallback((v: boolean) => setBannerVisible(v), []);

  return (
    <ErrorBoundary>
      <Router>
        <PageTitleUpdater />
        <TopBanner onVisibilityChange={handleBannerChange} />
        <Layout bannerVisible={bannerVisible}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/sobre"       element={<Sobre />} />
            <Route path="/programas"   element={<Programas />} />
            <Route path="/comunidade"  element={<Comunidade />} />
            <Route path="/escola"      element={<Escola />} />
            <Route path="/livros"      element={<Livros />} />
            <Route path="/testemunhos" element={<Testemunhos />} />
            <Route path="/contactos"   element={<Contactos />} />
            <Route path="*"            element={<Home />} />
          </Routes>
        </Layout>
        <AIChat />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
