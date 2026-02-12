import React from 'react';
import { Shield, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACCOLADES, CONTACT_DETAILS } from '../constants';

interface FooterProps {
  onDownloadCV?: () => void;
}

// Helper Link component to replace next/link
const Link = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />;

const Footer: React.FC<FooterProps> = ({ onDownloadCV }) => {
  const socialLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      href: `mailto:${CONTACT_DETAILS.email}`,
      label: "Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      href: `tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`,
      label: "Phone",
    },
  ];

  const navLinks = [
    { label: "Download CV", href: "#", onClick: onDownloadCV },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className={cn("relative w-full mt-0 overflow-hidden")}>
      <footer className="border-t border-white/30 bg-white/20 backdrop-blur-md mt-0 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-3xl font-bold font-display">
                    SHANE GRANT
                  </span>
                </div>
                <p className="text-white font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  Security Consultant — NZDF Veteran — Tactical Operations Specialist
                </p>
              </div>

              {/* Social Links */}
              <div className="flex mb-8 mt-3 gap-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-white hover:text-white/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 h-6 hover:scale-110 duration-300">
                      {link.icon}
                    </div>
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Navigation Links with CV Download */}
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-charcoal-light max-w-full px-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    className="text-white hover:text-white/80 duration-300 hover:font-semibold cursor-pointer"
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Accolades Showcase */}
              <div className="flex items-center gap-6 mt-8 flex-wrap justify-center">
                {ACCOLADES.map((accolade) => (
                  <img
                    key={`footer-main-${accolade.id}`}
                    src={accolade.src}
                    alt={accolade.title}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 drop-shadow-md"
                    title={accolade.title}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 relative z-20">
            <p className="text-base text-charcoal text-center md:text-left">
              ©{new Date().getFullYear()} Shane Grant. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link
                href="https://cleland.studio"
                target="_blank"
                className="text-base text-charcoal hover:text-army-green transition-colors duration-300 hover:font-medium"
              >
                Crafted by Cleland Studios
              </Link>
            </nav>
          </div>
        </div>

        {/* Large background text */}
        <div
          className="bg-gradient-to-b from-white/40 via-white/20 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 w-full whitespace-nowrap"
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            maxWidth: '100vw'
          }}
        >
          TALK SOON
        </div>

        {/* Bottom logo */}
        <div className="absolute hover:border-army-green duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-white/60 left-1/2 border-2 border-border-neutral flex items-center justify-center p-3 -translate-x-1/2 z-10">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-2xl overflow-hidden shadow-lg relative">
            <img
              src="/footer-profile.webp"
              alt="Shane Grant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-border-neutral to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom gradient overlay - creates emerging effect for TALK SOON */}
        <div className="bg-gradient-to-t from-white via-white to-transparent absolute bottom-0 w-full h-64 pointer-events-none"></div>

        {/* Bottom solid base */}
        <div className="bg-white absolute bottom-0 w-full h-32"></div>
      </footer>
    </section>
  );
};

export default Footer;