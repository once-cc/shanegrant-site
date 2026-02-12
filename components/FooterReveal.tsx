
import React from 'react';
import footerKapiti from '@/assets/footer-kapiti.webp';
import { DIGITAL_CAMO_URI } from '../constants';

interface FooterRevealProps {
    children: React.ReactNode;
}

const FooterReveal: React.FC<FooterRevealProps> = ({ children }) => {
    return (
        <div className="absolute inset-x-0 top-0 z-0">
            {/* Sticky Background */}
            <div className="sticky top-0 h-dvh w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${footerKapiti}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                {/* Background Texture */}
                <div
                    className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("${DIGITAL_CAMO_URI}")` }}
                ></div>
            </div>

            {/* Scroll Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default FooterReveal;
