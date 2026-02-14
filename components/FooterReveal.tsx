
import React from 'react';
import footerKapiti from '@/assets/footer-kapiti.webp';
import { DIGITAL_CAMO_URI } from '../constants';

interface FooterRevealProps {
    children: React.ReactNode;
}

/**
 * FooterReveal — Pure document-flow wrapper.
 * 
 * No internal scroll contexts. No transforms. No will-change.
 * Just a relative container with decorative background layers.
 * 
 * The sticky footer effect is achieved by the Footer component itself
 * using `lg:sticky lg:bottom-0` — DESKTOP ONLY (≥1024px).
 * Mobile (< 1024px) uses natural document scroll.
 */
const FooterReveal: React.FC<FooterRevealProps> = ({ children }) => {
    return (
        <div className="relative">
            {/* Background Image Layer — purely decorative, no structural effect */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${footerKapiti}")`,
                }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("${DIGITAL_CAMO_URI}")` }}
            />

            {/* Content — normal document flow, no scroll container */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default FooterReveal;
