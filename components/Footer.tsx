import React from 'react';
import { Mail, Phone } from 'lucide-react';
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
    <section className={cn("sticky bottom-0 w-full mt-0 z-0")}>
      <footer className="border-t border-white/30 bg-white/20 backdrop-blur-md mt-0 relative">
        <div className="max-w-7xl flex flex-col justify-start items-center mx-auto min-h-[22rem] sm:min-h-[30rem] md:min-h-[35rem] relative p-4 py-6 md:py-8 pb-32 md:pb-48">
          <div className="flex flex-col w-full items-center">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-3xl font-bold font-display">
                    SHANE GRANT
                  </span>
                </div>
                <p className="text-white/50 font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0">
                  Security Consultant — NZDF Veteran — Tactical Operations Specialist
                </p>
              </div>

              {/* Social Links */}
              <div className="flex mb-8 mt-3 gap-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <div className="w-6 h-6 hover:scale-110 duration-300">
                      {link.icon}
                    </div>
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Navigation Links with CV Download */}
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-white/50 max-w-full px-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    className="text-white/50 hover:text-white duration-300 hover:font-semibold cursor-pointer"
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
                    className="h-11 w-11 md:h-12 md:w-12 opacity-90 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2 items-center justify-center mt-8 relative z-20">
                <p className="text-white/50 font-semibold text-center text-sm">
                  ©{new Date().getFullYear()} Shane Grant. All rights reserved.
                </p>
                <nav className="flex gap-4">
                  <Link
                    href="https://cleland.studio"
                    target="_blank"
                    className="text-white/50 font-semibold hover:text-white transition-colors duration-300 text-sm"
                  >
                    Crafted by Cleland Studios
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Large background text - Emerging from bottom */}
        <div
          className="text-white/5 leading-none absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-0 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 w-full whitespace-nowrap z-0"
          style={{
            fontSize: 'clamp(3rem, 15vw, 13rem)',
            maxWidth: '100vw'
          }}
        >
          TALK SOON
        </div>

        {/* Bottom logo - Optimized */}
        <div className="absolute hover:border-army-green duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)] bottom-8 md:bottom-12 backdrop-blur-sm rounded-3xl bg-white/60 left-1/2 border-2 border-border-neutral items-center justify-center p-3 -translate-x-1/2 z-10 hidden md:flex w-auto h-auto">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg relative">
            <img
              src="/footer-profile1.webp"
              alt="Shane Grant"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="auto"
              width="96"
              height="96"
            />
          </div>
        </div>

        {/* Controlled Dark Grounding Gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/50 to-black/80" />
      </footer>
    </section>
  );
};

export default Footer;