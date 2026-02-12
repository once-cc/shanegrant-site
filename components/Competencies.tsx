import React from 'react';
import { COMPETENCIES } from '../constants';
import CompetencyCarousel from './ui/CompetencyCarousel';
import FadeIn from './FadeIn';
import { Shield, Eye, Brain, ShieldCheck, Lock, Scale } from 'lucide-react';

// Map competency IDs to semantically aligned lucide-react icons
const ICON_MAP: Record<string, React.ReactNode> = {
  '1': <Shield className="w-6 h-6 text-charcoal" />,
  '2': <Eye className="w-6 h-6 text-charcoal" />,
  '3': <Brain className="w-6 h-6 text-charcoal" />,
  '4': <ShieldCheck className="w-6 h-6 text-charcoal" />,
  '5': <Lock className="w-6 h-6 text-charcoal" />,
  '6': <Scale className="w-6 h-6 text-charcoal" />,
};

const competencySlides = COMPETENCIES.map((item) => ({
  icon: ICON_MAP[item.id] || <Shield className="w-6 h-6 text-charcoal" />,
  title: item.title,
  description: item.description,
}));

const Competencies: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="competencies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-battleship-gray font-body font-bold tracking-widest text-xs uppercase">Core Capabilities</span>
              <div className="h-px bg-border-neutral w-full max-w-[100px]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal tracking-tight mb-6">
              Operational Competencies
            </h2>
            <p className="text-lg text-charcoal-light max-w-2xl font-body leading-relaxed">
              Specialized skill set developed through decades of service in high-security defence environments.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <CompetencyCarousel slides={competencySlides} />
        </FadeIn>
      </div>
    </section>
  );
};

export default Competencies;