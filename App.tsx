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
        {/* Layered Reveal Container */}
        <div className="relative min-h-[200vh]">
          {/* 1. Footer Background Layer (Sticky) */}
          <FooterReveal>
            <div className="min-h-screen flex items-center justify-center">
              <Contact />
            </div>
            <Footer onDownloadCV={handleOpenCV} />
          </FooterReveal>

          {/* 2. Foreground Content (Opaque) */}
          <section className="relative z-20 bg-off-white">
            <Honours />
          </section>
        </div>
      </main>
      <CVDownloadModal isOpen={isCVModalOpen} onClose={handleCloseCV} />
    </>
  );
};

export default App;