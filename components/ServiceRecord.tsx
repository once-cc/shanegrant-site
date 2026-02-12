import React, { useState, useEffect } from 'react';
import { SERVICE_RECORD } from '../constants';
import { ServiceRole } from '../types';
import FadeIn from './FadeIn';

const ServiceRecord: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<ServiceRole | null>(null);

  const openModal = (role: ServiceRole) => {
    setSelectedRole(role);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedRole(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className="py-24 bg-off-white relative overflow-hidden" id="experience">
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute right-0 top-20 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <FadeIn className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-border-neutral flex-1"></div>
            <span className="text-battleship-gray font-body font-bold tracking-widest text-xs uppercase">Service History</span>
            <div className="h-px bg-border-neutral w-16"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6 tracking-tight">
            Defence Record
          </h2>
          <p className="text-lg text-charcoal-light max-w-2xl font-body leading-relaxed">
            Operational timeline and deployments across New Zealand Defence Force units.
          </p>
        </FadeIn>

        {/* Timeline Structure */}
        <div className="space-y-12 relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-[140px] top-4 bottom-4 w-px bg-border-neutral md:block hidden"></div>

          {SERVICE_RECORD.map((record, index) => (
            <FadeIn key={record.id} delay={(index * 100 % 400) as any} className="relative md:pl-[180px] group">
              {/* Date (Left Side) - Desktop */}
              <div className="hidden md:flex absolute left-0 top-0 w-[140px] justify-end pr-8 pt-6">
                <span className={`font-mono text-sm tracking-wide font-bold ${index === 0 ? 'text-charcoal' : 'text-battleship-gray'} transition-colors duration-300`}>
                  {record.years}
                </span>
              </div>

              {/* Timeline Node */}
              <div className={`hidden md:block absolute left-[136px] top-8 w-2 h-2 rounded-full z-10 transition-all duration-300 ${index === 0 ? 'bg-charcoal ring-4 ring-off-white' : 'bg-gray-300 group-hover:bg-charcoal'}`}></div>

              {/* Mobile Date */}
              <div className="md:hidden flex items-center gap-4 mb-4 ml-4">
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal"></div>
                <span className="font-mono text-sm font-bold text-charcoal">{record.years}</span>
              </div>

              {/* Service Card - Document Style */}
              <div
                onClick={() => openModal(record)}
                className="glass-panel p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white cursor-pointer relative overflow-hidden group rounded-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal tracking-tight group-hover:text-charcoal-light transition-colors">{record.role}</h3>
                    <p className="text-sm font-medium text-battleship-gray uppercase tracking-wider mt-1 mb-2">{record.translation}</p>
                    {record.location && (
                      <p className="text-xs text-battleship-gray font-body flex items-center gap-1 font-medium mt-2">
                        <span className="material-icons text-[14px] text-battleship-gray">place</span>
                        {record.location}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-xs font-bold text-charcoal uppercase tracking-wider border-b border-charcoal pb-0.5 hover:text-charcoal-light transition-colors">
                      View Details
                    </span>
                  </div>
                </div>

                <p className="text-charcoal-light text-sm leading-relaxed mt-4 line-clamp-2 border-l-2 border-border-neutral pl-4">
                  {record.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {record.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold text-battleship-gray bg-off-white px-2 py-1 rounded-sm border border-border-neutral">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Detail Modal - Clean Institutional */}
      {selectedRole && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-28 pb-8 px-4 sm:px-6 animate-fade-in" onClick={closeModal}>
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"></div>
          <div
            className="bg-white w-full max-w-2xl max-h-full overflow-y-auto relative z-10 shadow-2xl rounded-sm flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-charcoal p-8 border-b border-white/10 sticky top-0 z-20 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white text-charcoal text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                    Record Extract
                  </span>
                  <span className="text-white/60 text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedRole.years}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white">{selectedRole.role}</h3>
                <p className="text-sm font-medium text-white/60 uppercase tracking-wide mt-1">{selectedRole.translation}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white transition-colors p-2"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-off-white/30">
              <div className="bg-white p-6 border border-border-neutral rounded-sm mb-8 shadow-sm">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 border-b border-border-neutral pb-2">Operational Summary</h4>
                <p className="text-charcoal text-sm leading-relaxed font-body">
                  {selectedRole.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-battleship-gray uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-icons text-sm">assignment</span>
                  Key Competencies & Duties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-2 px-3 py-2 bg-white border border-border-neutral rounded-sm shadow-sm text-sm font-medium text-charcoal">
                      <span className="w-1 h-1 bg-charcoal rounded-full"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRole.location && (
                <div className="mt-8 pt-6 border-t border-border-neutral flex items-center justify-between text-xs text-battleship-gray uppercase tracking-wide">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="material-icons text-sm">place</span>
                    Posted: {selectedRole.location}
                  </div>
                  <div className="font-bold text-charcoal">
                    Official Record
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceRecord;