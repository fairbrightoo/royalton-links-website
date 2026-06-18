import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Animate loader for 2 seconds, then start fading it out
        const timer1 = setTimeout(() => {
            setIsFading(true);
        }, 2200);

        // Tell parent we are completely done after fade out
        const timer2 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[9999] bg-brand-dark flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Logo Container */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                
                {/* SVG Canvas */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-2xl">
                    <defs>
                        <linearGradient id="arcGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#f97316" /> {/* Deep Orange */}
                            <stop offset="100%" stopColor="#fbbf24" /> {/* Brand Gold/Yellow */}
                        </linearGradient>
                    </defs>

                    {/* Left Arc (Draws from bottom 50,90 to top 50,10 clockwise) */}
                    <path
                        d="M 50 90 A 40 40 0 0 1 50 10"
                        fill="none"
                        stroke="url(#arcGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="animate-draw-arc"
                    />

                    {/* Right Arc (Draws from bottom 50,90 to top 50,10 counter-clockwise) */}
                    <path
                        d="M 50 90 A 40 40 0 0 0 50 10"
                        fill="none"
                        stroke="url(#arcGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="animate-draw-arc"
                    />

                    {/* Four Purple Dots (Clockwise blinking) */}
                    {/* Top Left */}
                    <circle cx="40" cy="40" r="4.5" fill="#8B5CF6" className="animate-blink-dot" style={{ animationDelay: '0s' }} />
                    {/* Top Right */}
                    <circle cx="60" cy="40" r="4.5" fill="#8B5CF6" className="animate-blink-dot" style={{ animationDelay: '0.2s' }} />
                    {/* Bottom Right */}
                    <circle cx="60" cy="60" r="4.5" fill="#8B5CF6" className="animate-blink-dot" style={{ animationDelay: '0.4s' }} />
                    {/* Bottom Left */}
                    <circle cx="40" cy="60" r="4.5" fill="#8B5CF6" className="animate-blink-dot" style={{ animationDelay: '0.6s' }} />
                </svg>

                {/* Subtle glowing background behind logo to make it pop */}
                <div className="absolute inset-0 bg-brand-purple/20 blur-3xl rounded-full animate-pulse z-[-1]"></div>
            </div>

            <style>{`
                @keyframes draw-arc {
                    0% {
                        stroke-dasharray: 126;
                        stroke-dashoffset: 126;
                        opacity: 0;
                    }
                    15% {
                        opacity: 1;
                    }
                    60% {
                        stroke-dasharray: 126;
                        stroke-dashoffset: 0;
                        opacity: 1;
                    }
                    100% {
                        stroke-dasharray: 126;
                        stroke-dashoffset: 0;
                        opacity: 0;
                    }
                }
                .animate-draw-arc {
                    /* 2.5s loop to feel deliberate and premium */
                    animation: draw-arc 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }

                @keyframes blink-dot {
                    0%, 100% {
                        opacity: 0.15;
                        transform: scale(0.85);
                        filter: brightness(0.5);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.15);
                        filter: brightness(1.2) drop-shadow(0 0 6px rgba(139, 92, 246, 0.8));
                    }
                }
                .animate-blink-dot {
                    animation: blink-dot 1.2s ease-in-out infinite;
                    transform-origin: center;
                    transform-box: fill-box;
                }
            `}</style>
        </div>
    );
};

export default Loader;
