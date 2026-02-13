import React from 'react';
import { DIGITAL_CAMO_URI, ACCOLADES } from '../constants';
import { InfiniteSlider } from './AccoladeCarousel';

interface HeroProps {
  onDownloadCV?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDownloadCV }) => {
  return (
    <section className="relative min-h-screen bg-off-white text-charcoal border-b border-border-neutral overflow-hidden w-full">

      {/* Subtle Background Texture */}
      <div className="absolute inset-0 z-0 bg-off-white"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("${DIGITAL_CAMO_URI}")` }}></div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE (<768px): Two-zone layout
            Zone 1 (above fold): Headline + Image side-by-side
            Zone 2 (below fold): Status → Sub copy → Accolades → CTA
          DESKTOP (lg+): Original 60/40 split within 1280px rail
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen">

        {/* ════════════════════════════════════════════════════
            MOBILE HERO — Only visible below lg (< 1024px)
            Two-zone architecture for above/below fold separation
            ════════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col min-h-screen">

          {/* ── ZONE 1: ABOVE THE FOLD ──
               Full-bleed hero image with text overlay.
               Image spans viewport edge-to-edge — no clipping, no gutters.
               Text floats over the left portion with gradient protection. */}
          <div className="relative flex-shrink-0 min-h-[75svh] sm:min-h-[70svh]">

            {/* Hero Image — full viewport width, no gutters, no clipping */}
            <div className="absolute inset-0">
              <picture>
                <source media="(min-width: 768px)" srcSet="/hero-profile-laptop.webp" />
                <img
                  src="/hero-profile-laptop.webp"
                  alt="Shane Grant - Defence Security Professional"
                  className="w-full h-full object-cover object-[40%_top] sm:object-[50%_top]"
                />
              </picture>
              {/* Bottom gradient fade — full width */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-off-white to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Text overlay — positioned with padding, sits on top of gradient */}
            <div className="relative z-20 flex flex-col justify-center h-full min-h-[75svh] sm:min-h-[70svh] px-6 sm:px-8 pt-20 sm:pt-24 pb-[25svh]">
              <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl font-display font-bold text-charcoal leading-[0.88] tracking-tighter max-w-[45%] sm:max-w-[42%]">
                Security.<br />
                Procedure.<br />
                Trust.
              </h1>
            </div>

            {/* Personnel Profile Overlay — mobile */}
            <div className="absolute bottom-8 right-4 z-20 text-right">
              <div className="text-white backdrop-blur-md bg-white/5 border border-white/10 px-3 py-2.5 rounded-sm shadow-2xl">
                <p className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.15em] text-white/80 mb-0.5">Personnel Profile</p>
                <h3 className="text-base sm:text-lg font-display font-bold text-white mb-0">Shane Grant</h3>
                <p className="text-[10px] sm:text-xs font-medium text-white/70">Defence Security Professional</p>
              </div>
            </div>
          </div>

          {/* ── ZONE 2: BELOW THE FOLD ──
               Supporting content stacked vertically.
               Separated from Zone 1 to prevent viewport crowding. */}
          <div className="flex-1 flex flex-col px-6 sm:px-8 pt-8 sm:pt-10 pb-12">

            {/* Operational Status Pill */}
            <div className="inline-flex items-center space-x-3 mb-6 pl-1 pr-4 py-1.5 bg-white border border-border-neutral rounded-full shadow-sm w-fit">
              <span className="w-2.5 h-2.5 bg-army-green rounded-full animate-pulse"></span>
              <span className="text-charcoal-light text-xs font-bold tracking-widest uppercase">Operational Status: Active</span>
            </div>

            {/* Sub Copy */}
            <div className="flex items-start space-x-4 mb-8">
              <div className="h-px w-10 bg-charcoal mt-3.5 flex-shrink-0"></div>
              <p className="text-lg sm:text-xl text-charcoal-light max-w-md leading-relaxed font-body font-light">
                <strong className="text-charcoal font-bold">30+ years</strong> of disciplined service operating within high-security NZDF environments.
              </p>
            </div>

            {/* Accolade Carousel */}
            <div className="relative w-full max-w-md mb-10">
              {/* Gradient Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-off-white to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-off-white to-transparent pointer-events-none"></div>

              <div className="opacity-80 mix-blend-multiply">
                <InfiniteSlider gap={28} duration={40} durationOnHover={100}>
                  {ACCOLADES.map((accolade) => (
                    <div key={accolade.id} className="relative group w-14 sm:w-16">
                      <img
                        src={accolade.src}
                        alt={accolade.title}
                        className="w-full h-auto grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </InfiniteSlider>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-wrap gap-5 items-center">
              <button
                onClick={onDownloadCV}
                className="group relative bg-charcoal text-white px-8 py-4 text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Download CV
                  <span className="material-icons text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-charcoal-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-battleship-gray uppercase tracking-widest opacity-70">
                <span className="material-icons text-sm">verified</span>
                <span>Identity Verified</span>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            DESKTOP HERO — Only visible at lg+ (≥ 1024px)
            Original 1280px centered rail with 60/40 split.
            Image breaks out to right-anchored full-bleed.
            ════════════════════════════════════════════════════ */}
        <div className="hidden lg:block min-h-screen">
          <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-8 min-h-screen">
            <div className="grid grid-cols-[1.2fr_0.8fr] min-h-screen">

              {/* ── TEXT CONTENT — Bounded by 1280px rail ── */}
              <div className="flex flex-col justify-center min-h-screen relative z-10 pr-12">
                <div className="w-full max-w-2xl">

                  {/* Status Pill */}
                  <div className="inline-flex items-center space-x-3 mb-8 pl-1 pr-4 py-1.5 bg-white border border-border-neutral rounded-full shadow-sm w-fit">
                    <span className="w-2.5 h-2.5 bg-army-green rounded-full animate-pulse"></span>
                    <span className="text-charcoal-light text-xs font-bold tracking-widest uppercase">Operational Status: Active</span>
                  </div>

                  <h1 className="text-[5.5rem] xl:text-[7rem] font-display font-bold text-charcoal mb-8 leading-[0.9] tracking-tighter -ml-1">
                    Security.<br />
                    Procedure.<br />
                    Trust.
                  </h1>

                  <div className="flex items-start space-x-5 mb-12">
                    <div className="h-px w-12 bg-charcoal mt-4"></div>
                    <p className="text-xl md:text-2xl text-charcoal-light max-w-lg leading-relaxed font-body font-light">
                      <strong className="text-charcoal font-bold">30+ years</strong> of disciplined service operating within high-security NZDF environments.
                    </p>
                  </div>

                  <div className="relative w-full max-w-lg mb-14 animate-fade-in-up delay-300">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-off-white to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-off-white to-transparent pointer-events-none"></div>

                    <div className="opacity-80 mix-blend-multiply">
                      <InfiniteSlider gap={32} duration={40} durationOnHover={100}>
                        {ACCOLADES.map((accolade) => (
                          <div key={accolade.id} className="relative group w-16 md:w-20">
                            <img
                              src={accolade.src}
                              alt={accolade.title}
                              className="w-full h-auto grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                        ))}
                      </InfiniteSlider>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 items-center">
                    <button
                      onClick={onDownloadCV}
                      className="group relative bg-charcoal text-white px-10 py-5 text-sm font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Download CV
                        <span className="material-icons text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                      <div className="absolute inset-0 bg-charcoal-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono text-battleship-gray uppercase tracking-widest opacity-70">
                      <span className="material-icons text-sm">verified</span>
                      <span>Identity Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Grid placeholder for desktop image column ── */}
              <div></div>
            </div>
          </div>

          {/* ── DESKTOP IMAGE — Absolutely positioned, right-anchored
               Occupies roughly the right 45% of the viewport, full height.
               Fully independent of the 1280px rail. ── */}
          <div className="absolute top-0 right-0 bottom-0 w-[45%] overflow-hidden">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/hero-profile-laptop.webp" />
              <img
                src="/hero-profile-laptop.webp"
                alt="Shane Grant - Defence Security Professional"
                className="h-full w-full object-cover object-center"
              />
            </picture>



            {/* Personnel Profile Overlay — desktop */}
            <div className="absolute bottom-12 right-12 z-20 text-right">
              <div className="text-white backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-sm shadow-2xl">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/80 mb-2">Personnel Profile</p>
                <h3 className="text-3xl font-display font-bold text-white mb-1">Shane Grant</h3>
                <p className="text-sm font-medium text-white/70">Defence Security Professional</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;