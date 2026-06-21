import React, { useRef, useState } from 'react';
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
    const textRef = useRef(null);
    const videoWindowRef = useRef(null);
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
                    scale: 1,
                    duration: 2.5,
                    ease: "sine.inOut"
                });
            } else {
                // Fade out the inactive videos
                gsap.to(videoEl, {
                    opacity: 0,
                    scale: 1.05, // Slight scale effect for depth
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

        // Fade in the sleek dark background
        tl.fromTo(containerRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 2, ease: "power2.inOut" }
        );

        // Slide in the text content from the left
        tl.fromTo(textRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1.5, ease: "power4.out" },
            "-=1"
        );

        // Animate individual letters in headings
        tl.to(".letter-anim", {
            opacity: 1,
            duration: 0.03,
            stagger: { amount: 1, from: "random" }
        }, "-=1");

        // Slide in the Video Window from the right
        tl.fromTo(videoWindowRef.current,
            { opacity: 0, x: 100, rotationY: -15 },
            { opacity: 1, x: 0, rotationY: 0, duration: 2, ease: "power4.out", transformPerspective: 1000 },
            "-=1.5"
        );

        // Fade in UI buttons
        tl.to(".fade-in-anim", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "-=0.5");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#07070a] overflow-hidden flex items-center pt-24 md:pt-32 pb-12 opacity-0">
            
            {/* ----------------------------------------- */}
            {/* DEEP SLEEK GRADIENT BACKGROUND LAYER      */}
            {/* ----------------------------------------- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Top-left subtle gold/orange glow */}
                <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-gold/10 blur-[120px]"></div>
                
                {/* Bottom-right deep blue glow */}
                <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-blue/15 blur-[150px]"></div>
                
                {/* Subtle dark grid overlay for architectural feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay"></div>
                
                {/* Dark Vignette to keep edges shadowy and mysterious */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#07070a_100%)]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between h-full gap-12 lg:gap-8">
                
                {/* ----------------------------------------- */}
                {/* LEFT SIDE: TYPOGRAPHY & BRANDING          */}
                {/* ----------------------------------------- */}
                <div ref={textRef} className="w-full lg:w-5/12 flex flex-col justify-center text-left pt-12 md:pt-0">
                    
                    <h1 className="font-heading text-[15vw] md:text-[10vw] lg:text-[7rem] xl:text-[8.5rem] leading-[0.85] text-gradient-accent select-none tracking-tighter uppercase mb-4">
                        ROYALTON
                    </h1>
                    
                    <p className="text-lg md:text-2xl xl:text-3xl text-brand-gold font-body font-medium tracking-widest uppercase mb-8 md:mb-12 border-l-4 border-brand-gold pl-4">
                        Realty & Reliability
                    </p>

                    <div className="max-w-md">
                        <h2 className="text-2xl md:text-3xl xl:text-4xl font-heading text-white mb-4 leading-tight drop-shadow-lg">
                            <SplitText>Modern Living Redefined</SplitText>
                        </h2>

                        <p className="text-sm md:text-base xl:text-lg text-white/70 font-body leading-relaxed">
                            Experience the pinnacle of architectural design. Sustainable, smart, and built for the future. We curate spaces that inspire, elevate, and endure.
                        </p>
                    </div>

                    {/* Navigation Buttons for Video Carousel */}
                    <div className="flex gap-4 mt-8 md:mt-12 pointer-events-auto fade-in-anim opacity-0 translate-y-4">
                        <button
                            onClick={prevVideo}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group shadow-lg"
                        >
                            <FiArrowLeft className="text-xl md:text-2xl group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={nextVideo}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-300 group shadow-lg"
                        >
                            <FiArrowRight className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>

                {/* ----------------------------------------- */}
                {/* RIGHT SIDE: GLASSMORPHISM VIDEO WINDOW    */}
                {/* ----------------------------------------- */}
                <div ref={videoWindowRef} className="w-full lg:w-7/12 flex justify-end items-center mt-4 lg:mt-0 opacity-0 perspective-1000 relative z-20">
                    
                    {/* Glassmorphism Container */}
                    <div className="relative w-full max-w-4xl aspect-[16/10] md:aspect-video rounded-2xl md:rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-2 md:p-4 overflow-visible group">
                        
                        {/* Golden Glow Accent behind the card */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 md:w-64 md:h-64 bg-brand-gold/20 rounded-full blur-[60px] md:blur-[100px] z-[-1] transition-all duration-700 group-hover:bg-brand-gold/30"></div>
                        
                        {/* Blue Glow Accent behind the card */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-64 md:h-64 bg-brand-blue/30 rounded-full blur-[60px] md:blur-[100px] z-[-1] transition-all duration-700 group-hover:bg-brand-blue/40"></div>

                        {/* Inner Video Container (Rounded, cuts off video edges) */}
                        <div className="relative w-full h-full rounded-xl md:rounded-[1.5rem] overflow-hidden bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                            
                            {videos.map((vid, idx) => (
                                <video
                                    key={idx}
                                    ref={el => videoRefs.current[idx] = el}
                                    src={vid}
                                    className="absolute inset-0 w-full h-full object-cover transform scale-105"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{ opacity: idx === 0 ? 1 : 0 }}
                                />
                            ))}

                            {/* Inner Vignette for cinematic look */}
                            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.4)] pointer-events-none mix-blend-overlay"></div>
                            
                            {/* Glass Reflections overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none mix-blend-overlay"></div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
