import React from 'react';

interface HeaderProps {
  onDownloadCV?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDownloadCV }) => {
  return (
    <header className="sticky top-0 z-50 bg-off-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-off-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-charcoal flex items-center justify-center rounded-sm shadow-sm">
              <span className="material-icons text-off-white text-xl">shield</span>
            </div>
            <div>
              <h1 className="text-lg font-display font-bold uppercase tracking-tight text-charcoal leading-none">Shane Grant</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-battleship-gray font-bold uppercase tracking-widest">NZDF (RET)</span>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={onDownloadCV}
              className="text-charcoal px-3 py-2 text-xs font-bold font-body uppercase tracking-[0.2em] flex items-center gap-2 border border-charcoal/10 rounded-sm active:bg-charcoal/5"
            >
              <span className="material-icons text-base">download</span>
              <span>CV</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8 text-sm font-body uppercase tracking-wider text-battleship-gray font-medium">
              <a className="hover:text-charcoal transition-colors duration-200" href="#profile">Profile</a>
              <a className="hover:text-charcoal transition-colors duration-200" href="#experience">Service Record</a>
              <a className="hover:text-charcoal transition-colors duration-200" href="#skills">Commendations</a>
            </nav>

            <div className="h-4 w-px bg-border-neutral"></div>

            <button
              onClick={onDownloadCV}
              className="text-charcoal hover:text-charcoal-light px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-icons text-sm">download</span>
              CV
            </button>

            <a className="bg-charcoal text-white hover:bg-charcoal-light px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-sm rounded-sm flex items-center gap-2 group" href="#contact">
              <span className="material-icons text-sm">wifi_tethering</span>
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;