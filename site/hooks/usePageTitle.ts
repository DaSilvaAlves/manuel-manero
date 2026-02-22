import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/':            'Manuel Manero | Marca Pessoal Milionária',
  '/sobre':       'Sobre Manuel Manero | A História',
  '/programas':   'Programas | Ecossistema Manuel Manero',
  '/comunidade':  'Comunidade Milionária | Manuel Manero',
  '/escola':      'Escola de Empreendedorismo | Manuel Manero',
  '/livros':      'Os Meus Livros | Manuel Manero',
  '/testemunhos': 'Testemunhos | Resultados Reais',
  '/contactos':   'Contactos | Manuel Manero',
};

const usePageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pageTitles[pathname] || 'Manuel Manero | Marca Pessoal Milionária';
  }, [pathname]);
};

export default usePageTitle;
