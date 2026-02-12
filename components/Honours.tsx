import React from 'react';
import { CITATIONS, DIGITAL_CAMO_URI, PERSONAL_ATTRIBUTES, ACCOLADES } from '../constants';
import FadeIn from './FadeIn';

const Honours: React.FC = () => {
  return (
    <section className="py-24 bg-off-white border-t border-border-neutral relative z-10" id="awards">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Qualifications Column */}
          <FadeIn>
            <div className="mb-8">
              <span className="text-battleship-gray font-body font-bold tracking-widest text-xs uppercase mb-2 block">Validation</span>
              <h3 className="text-3xl font-display font-bold text-charcoal tracking-tight">Qualifications & Certifications</h3>
            </div>

            <div className="space-y-4">
              {CITATIONS.map((award, index) => (
                <FadeIn key={award.id} delay={(index * 100 % 400) as any}>
                  <div className="flex items-start p-6 bg-white border border-border-neutral rounded-sm hover:shadow-md transition-all duration-300 group">
                    <div className="flex-shrink-0 mr-5">
                      <div className="flex items-center justify-center w-10 h-10 bg-off-white rounded-sm group-hover:bg-charcoal group-hover:text-white transition-colors duration-300">
                        <award.icon className="w-5 h-5 text-battleship-gray group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-display font-bold text-charcoal text-base tracking-tight">{award.title}</h4>
                        <span className="text-xs font-mono text-battleship-gray bg-off-white px-2 py-0.5 rounded-sm">{award.year}</span>
                      </div>
                      <p className="text-sm text-charcoal-light leading-relaxed">{award.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Personal Attributes Column - Clean Document Style */}
          <FadeIn delay={200} className="h-full">
            <div className="bg-charcoal text-white p-8 h-full relative rounded-sm shadow-xl">
              {/* Floating Service Commendations (Accolades) - Cross Bounds Effect */}
              <div className="absolute -top-5 -right-2 flex items-center z-20 pointer-events-auto">
                {ACCOLADES.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative transform transition-all duration-300 hover:scale-110 hover:z-50 ${index % 2 === 0 ? 'translate-y-1' : '-translate-y-1'}`}
                    style={{ marginLeft: index === 0 ? 0 : '-12px' }}
                    title={item.title}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-14 w-auto object-contain drop-shadow-md"
                    />
                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none z-30">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtle texture or gradient */}
              <div className="relative z-10">
                <span className="text-white/40 font-body font-bold text-xs tracking-widest uppercase mb-3 block">Personnel Profile</span>
                <h3 className="text-3xl font-display font-bold mb-5 tracking-tight pr-32">Personal Attributes</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-body">
                  A defence-trained professional embodying <strong className="text-white">calm discipline</strong> and <strong className="text-white">procedural precision</strong>. Accustomed to high-trust environments and independent decision making.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-6">
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