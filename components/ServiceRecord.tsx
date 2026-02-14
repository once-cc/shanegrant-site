import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { SERVICE_RECORD } from '../constants';
import { ServiceRole } from '../types';
import FadeIn from './FadeIn';

import { cn } from '../lib/utils';

const ServiceRecord: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<ServiceRole | null>(null);
  const [expandedDuties, setExpandedDuties] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  // Breakpoint refs for identifying scroll position for each card
  const breakpointRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openModal = (role: ServiceRole) => {
    setSelectedRole(role);
    setExpandedDuties(false);
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

  // Container ref for scene-driven animation trigger
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for active card state via breakpoints
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // "When breakpoint enters activation zone → set activeCardIndex"
            const index = Number(entry.target.getAttribute('data-service-breakpoint'));
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
        root: null,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    breakpointRefs.current.forEach((bp) => {
      if (bp) observer.observe(bp);
    });

    return () => observer.disconnect();
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
        <div ref={containerRef} className="space-y-12 relative">
          {/* Timeline Line Base */}
          <div className="absolute left-4 md:left-[140px] top-4 bottom-4 w-px bg-border-neutral md:block hidden"></div>

          {/* Animated Timeline Line - Synced with Active Card */}
          <motion.div
            className="absolute left-4 md:left-[140px] top-4 bottom-4 w-px bg-charcoal origin-top md:block hidden z-10"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: activeIndex === null ? 0 : activeIndex === 0 ? 0.33 : activeIndex === 1 ? 0.66 : 1
            }}
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {/* Glowing Head */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-t from-charcoal to-transparent opacity-50 blur-sm"></div>
          </motion.div>

          {SERVICE_RECORD.map((record, index) => (
            <FadeIn key={record.id} delay={(index * 100 % 400)} className="relative md:pl-[180px] group">
              {/* Date (Left Side) - Desktop */}
              <div className="hidden md:flex absolute left-0 top-0 w-[140px] justify-end pr-8 pt-6">
                <span className={`font-mono text-sm tracking-wide font-bold ${index === 0 ? 'text-charcoal' : 'text-battleship-gray'} transition-colors duration-300`}>
                  {record.years}
                </span>
              </div>

              {/* Timeline Node - Animated */}
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-100px 0px -100px 0px" }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "hidden md:block absolute left-[136px] top-8 w-2 h-2 rounded-full z-20 ring-4 ring-off-white transition-colors duration-300",
                  activeIndex === index ? "bg-neutral-900" : "bg-neutral-400"
                )}
              ></motion.div>

              {/* Mobile Date */}
              <div className="md:hidden flex items-center gap-4 mb-4 ml-4">
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal"></div>
                <span className="font-mono text-sm font-bold text-charcoal">{record.years}</span>
              </div>

              {/* Breakpoint Marker */}
              <div
                ref={(el) => {
                  breakpointRefs.current[index] = el;
                }}
                data-service-breakpoint={index}
                className="h-px w-full relative pointer-events-none opacity-0"
              />

              {/* Service Card */}
              <div>
                <div
                  onClick={() => openModal(record)}
                  className={cn(
                    "glass-panel p-8 cursor-pointer relative overflow-hidden group rounded-sm",
                    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                    activeIndex === index && "scale-[1.02] shadow-[0_40px_120px_rgba(0,0,0,0.25)] z-10"
                  )}
                >


                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[26px] md:text-[28px] font-semibold text-charcoal tracking-[-0.01em] group-hover:text-charcoal-light transition-colors">
                        {record.role}
                      </h3>
                      <p className="text-[13px] font-medium text-neutral-500 uppercase tracking-[0.08em] mt-1 mb-2">
                        {record.translation}
                      </p>

                      {/* Meta Row (Years + Location) */}
                      <p className="text-[13px] text-neutral-500 font-body flex items-center gap-1 font-medium mt-1 leading-tight">
                        {record.years && `${record.years} • `}{record.location}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <span className="text-xs font-bold text-charcoal uppercase tracking-wider border-b border-charcoal pb-0.5 hover:text-charcoal-light transition-colors">
                        View Details
                      </span>
                    </div>
                  </div>

                  <p className="text-charcoal-light text-sm leading-relaxed mt-4 max-w-[640px] line-clamp-2 border-l-2 border-border-neutral pl-4">
                    {record.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {record.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] uppercase font-bold text-battleship-gray opacity-80 bg-off-white px-2.5 py-1 rounded-sm border border-border-neutral">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Detail Modal - Clean Institutional */}
      {selectedRole && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-[rgba(10,14,20,0.45)] backdrop-blur-[16px] animate-fade-in"></div>
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-hidden relative z-10 rounded-[20px] flex flex-col bg-[rgba(255,255,255,0.78)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.35)] shadow-[0_10px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] animate-fade-in origin-center"
            style={{
              animationDuration: '0.14s',
              animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
              animationName: 'scale-in'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-8 py-8 border-b border-[rgba(255,255,255,0.1)] flex justify-between items-start bg-gradient-to-b from-[rgba(15,20,28,0.75)] to-[rgba(15,20,28,0.55)] backdrop-blur-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white text-charcoal text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                    Record Extract
                  </span>
                  <span className="text-white/60 text-xs font-mono font-bold uppercase tracking-wider">
                    {selectedRole.years}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-[0.04em]">{selectedRole.role}</h3>
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
            <div className="p-8 bg-transparent overflow-y-auto modal-scroll">
              <div className="bg-white p-6 border border-border-neutral rounded-sm mb-8 shadow-sm transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 border-b border-border-neutral pb-2">Operational Summary</h4>
                <p className="text-charcoal text-sm leading-relaxed font-body">
                  {selectedRole.description}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.08em] font-bold text-battleship-gray uppercase mb-3 flex items-center gap-2 opacity-60">
                  Key Competencies & Duties
                </h4>
                <div className="h-px w-full bg-[rgba(0,0,0,0.08)] mb-4"></div>

                <div className="space-y-4">
                  {selectedRole.tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 group transition-all duration-300 ${expandedDuties
                        ? 'flex'
                        : idx < 3
                          ? 'flex'
                          : idx < 5
                            ? 'hidden md:flex'
                            : 'hidden'
                        }`}
                    >
                      <span className="font-mono text-[12px] font-semibold text-charcoal/60 min-w-[32px] pt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm font-medium text-charcoal leading-relaxed transition-colors duration-200 group-hover:text-charcoal-light">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedRole.tags.length > 3 && (
                  <button
                    onClick={() => setExpandedDuties(!expandedDuties)}
                    className="mt-6 text-[10px] font-bold uppercase tracking-[0.05em] text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-all pb-0.5"
                  >
                    {expandedDuties ? 'Collapse Duty Record' : 'View Full Operational Duty Record'}
                  </button>
                )}
              </div>

              {selectedRole.location && (
                <div className="mt-8 pt-6 border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between text-xs text-battleship-gray uppercase tracking-wide">
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
        </div>,
        document.body
      )}
    </section>
  );
};

export default ServiceRecord;