import React from 'react';
import { CITATIONS, PERSONAL_ATTRIBUTES, ACCOLADES } from '../constants';
import FadeIn from './FadeIn';

const Honours: React.FC = () => {
  return (
    <section className="py-16 bg-off-white border-t border-border-neutral relative z-10 isolate" id="commendations">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-4">
            <div className="h-px bg-border-neutral flex-1"></div>
            <span className="text-battleship-gray font-body font-bold tracking-widest text-xs uppercase">Commendations</span>
            <div className="h-px bg-border-neutral w-16"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Qualifications Column */}
          <FadeIn>
            <div className="mb-5">
              <span className="text-battleship-gray font-body font-bold tracking-widest text-xs uppercase mb-1 block">Validation</span>
              <h3 className="text-2xl font-display font-bold text-charcoal tracking-tight">Qualifications & Certifications</h3>
            </div>

            <div className="space-y-2.5">
              {CITATIONS.map((award, index) => (
                <FadeIn key={award.id} delay={(index * 100 % 400) as any}>
                  <div className="relative overflow-hidden group flex items-center gap-3 px-4 py-3 bg-white/90 border border-border-neutral hover:shadow-md rounded-sm">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-off-white rounded-sm group-hover:bg-charcoal group-hover:text-white transition-colors duration-300">
                        <award.icon className="w-4 h-4 text-battleship-gray group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-display font-bold text-charcoal text-sm tracking-tight">{award.title}</h4>
                        <span className="text-[10px] font-mono text-battleship-gray bg-off-white px-1.5 py-0.5 rounded-sm ml-2 flex-shrink-0">{award.year}</span>
                      </div>
                      <p className="text-xs text-charcoal-light leading-snug mt-0.5">{award.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Personal Attributes Column - Clean Document Style */}
          <FadeIn delay={200} className="h-full">
            <div className="relative overflow-hidden group bg-charcoal/85 text-white p-6 h-full rounded-sm shadow-xl">
              {/* Floating Service Commendations (Accolades) - Cross Bounds Effect */}
              <div className="absolute -top-5 -right-2 flex items-center z-20 pointer-events-auto">
                {ACCOLADES.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative transform transition-all duration-300 hover:scale-110 hover:z-50 ${index % 2 === 0 ? 'translate-y-1' : '-translate-y-1'}`}
                    style={{ marginLeft: index === 0 ? 0 : '-12px' }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-14 w-auto object-contain drop-shadow-md"
                    />
                  </div>
                ))}
              </div>

              {/* Subtle texture or gradient */}
              <div className="relative z-10">
                <span className="text-white/40 font-body font-bold text-xs tracking-widest uppercase mb-2 block">Personnel Profile</span>
                <h3 className="text-2xl font-display font-bold mb-3 tracking-tight pr-28">Personal Attributes</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 font-body">
                  A defence-trained professional embodying <strong className="text-white">calm discipline</strong> and <strong className="text-white">procedural precision</strong>. Accustomed to high-trust environments and independent decision making.
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-5">
                  {PERSONAL_ATTRIBUTES.map((attr) => (
                    <div key={attr.title}>
                      <span className="block text-white font-bold text-sm tracking-wide mb-1">{attr.title}</span>
                      <span className="block text-xs text-white/50 font-mono uppercase tracking-wider">{attr.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Honours;