import React, { useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming utils exists for className merging, typical in shadcn

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const HolographicCard: React.FC<HolographicCardProps> = ({ children, className, ...props }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Intensity of rotation
        const rotateX = (y - centerY) / 60;
        const rotateY = (centerX - x) / 60;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        card.style.setProperty('--bg-x', '50%');
        card.style.setProperty('--bg-y', '50%');
    };

    return (
        <div
            className={cn(
                "relative transition-transform duration-200 ease-out transform-gpu",
                "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-sm overflow-hidden",
                "group", // Enable group-hover effects for children
                className
            )}
            ref={cardRef}
            onMouseMove={(e) => {
                handleMouseMove(e);
                props.onMouseMove?.(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave();
                props.onMouseLeave?.(e);
            }}
            style={{
                ...props.style
            }}
            {...props}
        >
            {/* Holographic overlay/glow effect */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                    background: `radial-gradient(
                    circle at var(--x, 50%) var(--y, 50%), 
                    rgba(255,255,255,0.1) 0%, 
                    transparent 50%
                  )`
                }}
            />
            {/* Content Wrapper */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default HolographicCard;
