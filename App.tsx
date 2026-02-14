import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Competencies from './components/Competencies';
import ServiceRecord from './components/ServiceRecord';
import Honours from './components/Honours';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import CVDownloadModal from './components/CVDownloadModal';
import FooterReveal from './components/FooterReveal';

const App: React.FC = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const handleOpenCV = () => setIsCVModalOpen(true);
  const handleCloseCV = () => setIsCVModalOpen(false);

  return (
    <>
      <BackgroundEffects />
      <Header onDownloadCV={handleOpenCV} />
      <main className="flex-grow z-10 relative">
        <Hero onDownloadCV={handleOpenCV} />
        <Competencies />
        <ServiceRecord />
        <Honours />

        {/* Footer area — sticky footer sits behind scrolling Contact */}
        <FooterReveal>
          <Contact />
          <Footer onDownloadCV={handleOpenCV} />
        </FooterReveal>
      </main>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={handleCloseCV} />
    </>
  );
};

export default App;