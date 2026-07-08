import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from './SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

const RoyaltonStory = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Horizontal Scroll Animation for Desktop
            let panels = gsap.utils.toArray('.story-panel');

            let horizTween = gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + containerRef.current.offsetWidth * (panels.length - 1),
                }
            });
            
            // Micro-animations within panels for Desktop
            panels.forEach((panel, i) => {
                const elements = panel.querySelectorAll('.animate-el');
                if(elements.length > 0) {
                    gsap.fromTo(elements, 
                        { y: 50, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            duration: 1, 
                            stagger: 0.2,
                            scrollTrigger: {
                                trigger: panel,
                                containerAnimation: horizTween,
                                start: "left center",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        });

        mm.add("(max-width: 767px)", () => {
            // Vertical scroll animations for Mobile
            let panels = gsap.utils.toArray('.story-panel');
            
            panels.forEach((panel) => {
                const elements = panel.querySelectorAll('.animate-el');
                if(elements.length > 0) {
                    gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            duration: 0.8, 
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        });

    }, { scope: containerRef });

    const values = [
        { letter: 'I', title: 'Integrity', text: 'Transparency in all dealings, ensuring honesty, ethical compliance and consistency in all transactions.' },
        { letter: 'L', title: 'Legacy', text: 'We focus on long-term impact rather than short-term gains.' },
        { letter: 'I', title: 'Innovation', text: 'Creating positive and satisfying experience for all stakeholders.' },
        { letter: 'N', title: 'Nurture', text: 'Building long-term relationships with clients, partners and investors by guiding them through every step of the journey.' },
        { letter: 'K', title: 'Knowledge', text: 'Possessing foresight in anticipating urban expansion patterns and infrastructure developments to secure land ahead of market appreciation.' }
    ];

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-brand-dark z-20">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue rounded-full blur-[150px]"></div>
            </div>

            <div className="flex flex-col md:flex-row w-full md:w-[400vw] h-auto md:h-screen" id="panels-container">
                
                {/* Panel 1: Business Overview */}
                <div className="story-panel w-full md:w-screen min-h-[50vh] md:h-full flex items-center justify-center p-6 py-16 md:p-20 relative">
                    <div className="max-w-4xl w-full z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="w-full md:w-5/12 shrink-0">
                            <h2 className="text-5xl sm:text-6xl md:text-8xl font-heading leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light animate-el md:pr-4 whitespace-nowrap">
                                OUR<br/>STORY&nbsp;
                            </h2>
                            <div className="h-1 w-16 md:w-24 bg-brand-gold mt-4 md:mt-6 animate-el"></div>
                        </div>
                        <div className="w-full md:w-7/12">
                            <p className="text-xl md:text-3xl font-body font-light text-white leading-relaxed animate-el">
                                <span className="font-semibold text-brand-gold">Royalton Links Ltd</span> operates as the Group's strategic land banking and partnership subsidiary, focused on acquiring and holding prime land assets for future development and facilitating diaspora investment channels.
                            </p>
                            <p className="text-base md:text-xl text-white/70 mt-4 md:mt-6 animate-el">
                                The company specializes in identifying high-potential locations before infrastructure development, securing strategic land positions, and creating structured investment products for offshore investors. The subsidiary serves as the Group's forward-looking arm, securing tomorrow's development sites today.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Vision */}
                <div className="story-panel w-full md:w-screen min-h-[50vh] md:h-full flex items-center justify-center p-6 py-16 md:p-20 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-heading text-white/5 whitespace-nowrap select-none pointer-events-none">
                        VISION
                    </div>
                    <div className="max-w-5xl w-full z-10 text-center">
                        <p className="text-brand-blue-light font-body tracking-[0.3em] uppercase mb-4 md:mb-8 text-xs md:text-base font-bold animate-el">
                            The Destination
                        </p>
                        <h3 className="text-3xl md:text-6xl lg:text-7xl font-heading text-white leading-tight animate-el">
                            To be the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-brand-purple">strategic bridge</span> connecting today's real estate realities with tomorrow's possibilities.
                        </h3>
                    </div>
                </div>

                {/* Panel 3: Mission */}
                <div className="story-panel w-full md:w-screen min-h-[50vh] md:h-full flex items-center justify-center p-6 py-16 md:p-20 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-heading text-white/5 whitespace-nowrap select-none pointer-events-none">
                        MISSION
                    </div>
                    <div className="max-w-5xl w-full z-10 text-center">
                        <p className="text-brand-purple font-body tracking-[0.3em] uppercase mb-4 md:mb-8 text-xs md:text-base font-bold animate-el">
                            The Action
                        </p>
                        <h3 className="text-2xl md:text-5xl lg:text-6xl font-body font-light text-white leading-relaxed animate-el">
                            To identify, acquire, and hold <span className="font-semibold text-brand-gold">strategic land assets</span> while creating investment corridors that allow local and international stakeholders to conveniently participate with assurances of <span className="font-semibold text-brand-gold">premium ROI</span>.
                        </h3>
                    </div>
                </div>

                {/* Panel 4: Core Values (I-LINK) */}
                <div className="story-panel w-full md:w-screen min-h-[50vh] md:h-full flex items-center justify-center p-6 py-16 md:p-12 relative">
                    <div className="max-w-7xl w-full z-10 flex flex-col h-full justify-center">
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-4xl md:text-7xl font-heading text-white animate-el">
                                CORE VALUES <br className="block sm:hidden" /><span className="text-brand-gold">(I-LINK)</span>
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 h-auto">
                            {values.map((val, index) => (
                                <div key={index} className={`group relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-brand-gold/10 hover:border-brand-gold/30 transition-all duration-500 flex flex-col overflow-hidden animate-el ${index === 4 ? 'sm:col-span-2 md:col-span-1' : ''}`}>
                                    <div className="absolute -right-4 -top-8 text-8xl md:text-9xl font-heading text-white/5 group-hover:text-brand-gold/10 transition-colors duration-500">
                                        {val.letter}
                                    </div>
                                    <h4 className="text-xl md:text-3xl font-heading text-brand-gold mb-3 md:mb-4 relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                                        {val.title}
                                    </h4>
                                    <p className="text-sm md:text-base text-white/80 font-body leading-relaxed relative z-10">
                                        {val.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RoyaltonStory;
