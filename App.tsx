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
        <div className="relative">
          {/* 1. Footer Background Layer (Sticky) */}
          <FooterReveal>
            <div className="flex items-center justify-center py-8 md:min-h-screen md:py-0">
              <Contact />
            </div>
            <Footer onDownloadCV={handleOpenCV} />
          </FooterReveal>

          {/* 2. Foreground Content (Opaque) */}
          <section className="relative z-20 bg-off-white">
            <Honours />
          </section>

          {/* 3. Reveal Spacer - Creates the window for the footer to show */}
          <div className="h-[100dvh] w-full pointer-events-none" />
        </div>
      </main >
      <CVDownloadModal isOpen={isCVModalOpen} onClose={handleCloseCV} />
    </>
  );
};

export default App;