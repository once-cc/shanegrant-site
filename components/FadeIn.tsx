import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FadeInProps {
    children: ReactNode;
    delay?: 0 | 100 | 200 | 300 | 400 | 500;
    className?: string;
    threshold?: number;
    rootMargin?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    className = '',
    threshold = 0.1,
    rootMargin = '0px'
}) => {
    const { ref, isVisible } = useScrollAnimation(threshold, rootMargin);

    const delayClass = delay > 0 ? `delay-${delay}` : '';

    return (
        <div
            ref={ref}
            className={`scroll-hidden ${isVisible ? 'scroll-visible' : ''} ${delayClass} ${className}`}
        >
            {children}
        </div>
    );
};

export default FadeIn;
