import React, { useRef, useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Import the user's video
import royaltonVid from '../assets/videos/royalton-vid.mp4';
import primeluxVid from '../assets/videos/primelux-exclusive.mp4';

const SplitText = ({ children, className }) => {
    return (
        <span className={className}>
            {children.split("").map((char, i) => (
                <span key={i} className="inline-block opacity-0 letter-anim">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};

const videos = [
    royaltonVid,
    primeluxVid
];

const Hero = () => {
    const containerRef = useRef(null);
    const championsRef = useRef(null);
    const subtextLeftRef = useRef(null);
    const subtextRightRef = useRef(null);
    const videoRefs = useRef([]);

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    // -------------------------------------------------
    // VIDEO CAROUSEL LOGIC
    // -------------------------------------------------
    const nextVideo = () => {
        setActiveVideoIndex((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setActiveVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    // Smooth "Melting Ice" Crossfade Transition
    useGSAP(() => {
        videoRefs.current.forEach((videoEl, idx) => {
            if (!videoEl) return;

            if (idx === activeVideoIndex) {
                // Fade in the active video very smoothly
                gsap.to(videoEl, {
                    opacity: 1,
                    duration: 2.5,
                    ease: "sine.inOut"
                });
            } else {
                // Fade out the inactive videos
                gsap.to(videoEl, {
                    opacity: 0,
                    duration: 2.5,
                    ease: "sine.inOut"
                });
            }
        });
    }, [activeVideoIndex]);

    // -------------------------------------------------
    // HERO ENTRY ANIMATIONS
    // -------------------------------------------------
    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.fromTo(championsRef.current,
            { y: "100%" },
            { y: "0%", duration: 1.5, ease: "power4.out" }
        );

        tl.fromTo([subtextLeftRef.current, subtextRightRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "+=0.1"
        );

        tl.to(".letter-anim", {
            opacity: 1,
            duration: 0.05,
            stagger: { amount: 1, from: "random" }
        }, "+=0.2");

        tl.to(".fade-in-anim", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "+=0.1");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-brand-dark/80 backdrop-blur-2xl overflow-hidden">

            {/* ----------------------------------------- */}
            {/* VIDEO BACKGROUND LAYER */}
            {/* ----------------------------------------- */}
            <div className="absolute inset-0 z-0">
                {videos.map((vid, idx) => (
                    <video
                        key={idx}
                        ref={el => videoRefs.current[idx] = el}
                        src={vid}
                        className="absolute inset-0 w-full h-full object-cover contrast-110 saturate-110 brightness-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ opacity: idx === 0 ? 1 : 0 }}
                    />
                ))}
                
                {/* Sleek vignette/gradient overlay to make the canvas modern and text readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/90 pointer-events-none"></div>
                <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* ----------------------------------------- */}
            {/* BACKGROUND TEXT */}
            {/* ----------------------------------------- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 -translate-y-12 md:translate-y-0">
                <div className="relative w-full px-4 flex justify-center">
                    <div ref={subtextLeftRef} className="absolute -top-12 md:-top-20 lg:-top-32 left-[5%] lg:left-[10%] opacity-0 flex flex-col items-end">
                        <p className="text-[1.75rem] md:text-[3.75rem] lg:text-[6rem] font-body font-black tracking-widest bg-gradient-to-r from-brand-blue-ice to-brand-purple bg-clip-text text-transparent leading-none pb-2">
                            Realty
                        </p>
                        <span className="text-[4rem] md:text-[9rem] lg:text-[16rem] font-heading font-bold text-brand-gold/80 leading-none mt-2 md:mt-4 lg:mt-8 -mr-16 md:-mr-32 lg:-mr-[20vw]">
                            &amp;
                        </span>
                    </div>

                    <div className="overflow-hidden w-full text-center">
                        <h1
                            ref={championsRef}
                            className="font-heading text-[13vw] md:text-[15vw] leading-none text-gradient-accent select-none tracking-tighter uppercase opacity-90 translate-y-full pb-4"
                        >
                            ROYALTON
                        </h1>
                    </div>

                    <div ref={subtextRightRef} className="absolute -bottom-10 md:-bottom-16 lg:-bottom-24 right-[5%] lg:right-[10%] opacity-0">
                        <p className="text-[1.75rem] md:text-[3.75rem] lg:text-[6rem] font-body font-black tracking-widest bg-gradient-to-l from-brand-blue-ice to-brand-purple bg-clip-text text-transparent leading-none pb-2">
                            Reliability
                        </p>
                    </div>
                </div>
            </div>

            {/* ----------------------------------------- */}
            {/* UI GROUP 1 */}
            {/* ----------------------------------------- */}
            <div className="absolute z-20
                bottom-32 right-6 text-right items-end
                md:bottom-12 md:left-10 md:text-left md:items-start md:right-auto
                lg:bottom-14 lg:left-20

                max-w-[80%] md:max-w-2xl lg:max-w-4xl flex flex-col gap-6 md:gap-6 lg:gap-10 pointer-events-none">

                <div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading mb-2 md:mb-3 tracking-tight text-white leading-tight drop-shadow-lg">
                        <SplitText>Modern Living Redefined</SplitText>
                    </h2>

                    <p className="text-sm md:text-lg lg:text-xl text-white/90 font-body leading-relaxed font-medium tracking-normal drop-shadow-md">
                        <SplitText>Experience the pinnacle of architectural design.</SplitText> <br className="hidden md:block" />
                        <SplitText>Sustainable, smart, and built for the future.</SplitText>
                    </p>
                </div>

                <div className="flex gap-3 md:gap-4 lg:gap-6 pointer-events-auto fade-in-anim opacity-0 translate-y-4 justify-end md:justify-start">
                    <button
                        onClick={prevVideo}
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20
                        rounded-full border border-white/40 bg-brand-dark/30 backdrop-blur-md flex items-center justify-center
                        text-white hover:bg-white hover:text-brand-dark hover:border-white transition-all duration-300 group pointer-events-auto shadow-xl"
                    >
                        <FiArrowLeft className="text-xl md:text-3xl lg:text-5xl" />
                    </button>

                    <button
                        onClick={nextVideo}
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20
                        rounded-full border border-white/40 bg-brand-dark/30 backdrop-blur-md flex items-center justify-center
                        text-white hover:bg-white hover:text-brand-dark hover:border-white transition-all duration-300 group pointer-events-auto shadow-xl"
                    >
                        <FiArrowRight className="text-xl md:text-3xl lg:text-5xl" />
                    </button>
                </div>
            </div>

            {/* ----------------------------------------- */}
            {/* UI GROUP 2 */}
            {/* ----------------------------------------- */}
            <div
                className="absolute z-20 pointer-events-none
                top-28 left-6 text-left
                md:top-auto md:bottom-12 md:left-auto md:right-10 md:text-right
                lg:bottom-16 lg:right-20"
            >
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading text-white drop-shadow-lg">
                    <SplitText>Start Your Journey</SplitText>
                </h2>
                <p className="text-xs md:text-base lg:text-xl text-white/80 font-body fade-in-anim opacity-0 translate-y-4 drop-shadow-md">
                    EST. 2025
                </p>
            </div>

        </section>
    );
};

export default Hero;
