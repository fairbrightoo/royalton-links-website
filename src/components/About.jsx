import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { FiArrowRight, FiCheckCircle, FiX } from "react-icons/fi";

const About = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    // Effect to handle animation timing for the modal
    useEffect(() => {
        if (isModalOpen) {
            // slight delay to trigger CSS transition after mount
            const timer = setTimeout(() => setShowContent(true), 50);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isModalOpen]);

    const handleClose = () => {
        setShowContent(false);
        // Wait for animation to finish before unmounting
        setTimeout(() => setIsModalOpen(false), 700); 
    };

    return (
        <SectionWrapper id="about" className="z-20 bg-brand-dark/80 backdrop-blur-2xl text-white">
            <div className="container mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center">

                {/* Left: Text Content */}
                <div className="flex flex-col gap-4 md:gap-8">
                    <div>
                        <p className="text-brand-gold font-body tracking-widest uppercase mb-2 md:mb-4">
                            Our Story
                        </p>
                        <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] mb-4 md:mb-6">
                            BEYOND <br /> <span className="text-brand-gold">PREMIUM</span>
                        </h2>
                        <p className="text-base md:text-lg text-white/80 font-body leading-relaxed max-w-md">
                            Founded in 2023, Royalton Properties isn't just about selling lands and building houses.
                            It's about curating lifestyles for the ambitious, the bold, and the visionaries.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {["Exclusive Locations", "Smart Home Integration", "Sustainable Design"].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-xl font-heading text-white/90">
                                <FiCheckCircle className="text-brand-gold" />
                                {item}
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-fit flex items-center gap-3 px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 uppercase tracking-widest font-bold text-sm group"
                    >
                        Read Our Philosophy 
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Right: Image/Visual */}
                <div className="relative h-[25vh] md:h-[60vh] w-full rounded-2xl overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop"
                        alt="About Champions"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gold Overlay */}
                    <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay"></div>
                </div>

            </div>

            {/* SLEEK MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden">
                    {/* Backdrop */}
                    <div 
                        className={`absolute inset-0 bg-brand-dark/90 backdrop-blur-xl transition-opacity duration-700 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}
                        onClick={handleClose}
                    ></div>
                    
                    {/* Modal Content */}
                    <div 
                        className={`relative w-full max-w-4xl bg-brand-dark/95 border border-white/10 rounded-2xl p-8 md:p-16 lg:p-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={handleClose}
                            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-brand-gold transition-colors duration-300 text-3xl md:text-4xl hover:rotate-90"
                        >
                            <FiX />
                        </button>

                        <p className="text-brand-gold font-body tracking-widest uppercase mb-4 text-xs md:text-sm">
                            The Royalton Philosophy
                        </p>
                        
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-10 text-white">
                            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-ice to-brand-purple">Legacies</span>
                        </h3>
                        
                        <div className="space-y-6 md:space-y-8 text-lg md:text-xl lg:text-2xl font-body text-white/80 leading-relaxed font-light">
                            <p>
                                At Royalton Properties, our philosophy is anchored in the uncompromising belief that true luxury goes beyond mere aesthetics—it is the seamless integration of visionary innovation, sustainable design, and unparalleled reliability.
                            </p>
                            <p>
                                We don't just build homes or sell land; we architect legacies. Every space we curate is a testament to our profound commitment to excellence, intentionally designed to elevate the human experience, foster thriving communities, and stand the test of time.
                            </p>
                            <div className="pl-6 border-l-2 border-brand-gold pt-2 pb-2">
                                <p className="font-medium text-white italic text-xl md:text-2xl">
                                    "Excellence is not an act, but a habit built into the very foundation of every Royalton project."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
};

export default About;