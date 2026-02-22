import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  bannerVisible?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, bannerVisible = true }) => (
  <div className={`min-h-screen flex flex-col ${bannerVisible ? 'pt-10' : ''}`}>
    <Navbar bannerVisible={bannerVisible} />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export { Layout };
export default Layout;
