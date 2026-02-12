import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompetencySlide {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface CompetencyCarouselProps {
    slides: CompetencySlide[];
}

const CARD_WIDTH = 420;
const CARD_GAP = 24;
const TRANSITION_DURATION = 0.4;
const TRANSITION_EASE = [0.4, 0, 0.2, 1] as const;

const CompetencyCarousel: React.FC<CompetencyCarouselProps> = ({ slides }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Detect prefers-reduced-motion
    const [reducedMotion, setReducedMotion] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Track container width for centering calculations
    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Responsive card width
    const getCardWidth = useCallback(() => {
        if (containerWidth < 640) return containerWidth - 48; // mobile: full width minus padding
        if (containerWidth < 1024) return Math.min(CARD_WIDTH, containerWidth * 0.75); // tablet
        return CARD_WIDTH; // desktop
    }, [containerWidth]);

    const cardWidth = getCardWidth();
    const totalCardWidth = cardWidth + CARD_GAP;

    // Calculate the x offset to center the active card
    const getOffset = useCallback(
        (index: number) => {
            const centerOffset = (containerWidth - cardWidth) / 2;
            return centerOffset - index * totalCardWidth;
        },
        [containerWidth, cardWidth, totalCardWidth]
    );

    // Animate to the active index
    const animateTo = useCallback(
        (index: number) => {
            const target = getOffset(index);
            if (reducedMotion) {
                x.set(target);
            } else {
                animate(x, target, {
                    duration: TRANSITION_DURATION,
                    ease: TRANSITION_EASE as unknown as number[],
                });
            }
        },
        [getOffset, x, reducedMotion]
    );

    // Re-center on resize or index change
    useEffect(() => {
        animateTo(activeIndex);
    }, [activeIndex, containerWidth, animateTo]);

    const goTo = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(slides.length - 1, index));
            setActiveIndex(clamped);
        },
        [slides.length]
    );

    const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    // Drag/swipe handling
    const handleDragEnd = useCallback(
        (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            const threshold = cardWidth * 0.2;
            if (info.offset.x < -threshold && activeIndex < slides.length - 1) {
                goNext();
            } else if (info.offset.x > threshold && activeIndex > 0) {
                goPrev();
            } else {
                animateTo(activeIndex);
            }
        },
        [activeIndex, slides.length, cardWidth, goNext, goPrev, animateTo]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        },
        [goNext, goPrev]
    );

    if (!containerWidth) {
        return <div ref={containerRef} className="w-full h-[320px]" />;
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Operational Competencies Carousel"
            aria-roledescription="carousel"
        >
            {/* Slides track */}
            <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                style={{ x, gap: `${CARD_GAP}px` }}
                drag="x"
                dragConstraints={{
                    left: getOffset(slides.length - 1) - 50,
                    right: getOffset(0) + 50,
                }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
            >
                {slides.map((slide, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <motion.div
                            key={index}
                            className="flex-shrink-0"
                            style={{ width: cardWidth }}
                            animate={{
                                scale: isActive ? 1 : 0.95,
                                opacity: isActive ? 1 : 0.5,
                            }}
                            transition={
                                reducedMotion
                                    ? { duration: 0 }
                                    : { duration: TRANSITION_DURATION, ease: TRANSITION_EASE as unknown as number[] }
                            }
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
                        >
                            {/* Card — reuses glass-panel from index.html */}
                            <div className="glass-panel relative p-6 transition-all duration-300 hover:shadow-md group h-full bg-off-white hover:bg-white border-transparent hover:border-gray-200">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 border-b border-border-neutral pb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-charcoal opacity-80">{slide.icon}</span>
                                        <h3 className="font-header text-lg font-bold text-charcoal tracking-tight">
                                            {slide.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-army-green" />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="font-body text-sm leading-relaxed text-charcoal-light">
                                    {slide.description}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-6 mt-8">
                <button
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    className="w-10 h-10 rounded-full border border-border-neutral bg-white flex items-center justify-center transition-all duration-200 hover:border-charcoal hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Previous competency"
                >
                    <ChevronLeft className="w-5 h-5 text-charcoal" />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex
                                    ? 'w-6 h-2 bg-charcoal'
                                    : 'w-2 h-2 bg-border-neutral hover:bg-battleship-gray'
                                }`}
                            role="tab"
                            aria-selected={index === activeIndex}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goNext}
                    disabled={activeIndex === slides.length - 1}
                    className="w-10 h-10 rounded-full border border-border-neutral bg-white flex items-center justify-center transition-all duration-200 hover:border-charcoal hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Next competency"
                >
                    <ChevronRight className="w-5 h-5 text-charcoal" />
                </button>
            </div>
        </div>
    );
};

export default CompetencyCarousel;
