import React, { useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from './TeamCard';

gsap.registerPlugin(ScrollTrigger);

import adminImage from '../assets/images/admin.png';
import hrHodImage from '../assets/images/hr hod.png';
import mdImage from '../assets/images/md.png';
import gmImage from '../assets/images/gm.png';
import siteHodImage from '../assets/images/site hod.png';
import marketingHodImage from '../assets/images/marketing hod.png';
import ictHodImage from '../assets/images/ict hod.png';

// --- 7 MEMBER LAYOUT CONFIGURATION ---
const teamMembers = [
    {
        id: 2, name: "Miss Modlyn Akpale", role: "HOD, Admin Dept",
        image: adminImage,
        socials: { linkedin: "#", mail: "#" },
        style: { top: '30%', left: '0%', width: '22%', aspectRatio: '4/3', zIndex: 3 }
    },
    {
        id: 3, name: "Mrs Blessing Onuche Innocent", role: "HOD, Human Resource Dept",
        image: hrHodImage,
        socials: { linkedin: "#" },
        style: { top: '55%', left: '8%', width: '24%', aspectRatio: '1/1', zIndex: 1 }
    },
    {
        id: 4, name: "Dr. Uchenna Eze", role: "Managing Director",
        image: mdImage,
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '2%', left: '26%', width: '22%', aspectRatio: '3/5', zIndex: 2 }
    },
    {
        id: 5, name: "Com. Uche Nwachukwu", role: "General Manager",
        image: gmImage,
        socials: { instagram: "#", linkedin: "#" },
        style: { top: '13%', left: '57%', width: '24%', aspectRatio: '3/5', zIndex: 10 }
    },
    {
        id: 6, name: "Mrs Ijeoma Okereke", role: "HOD, Site Dept",
        image: siteHodImage,
        socials: { linkedin: "#", mail: "#" },
        style: { top: '45%', left: '42%', width: '18%', aspectRatio: '3/4', zIndex: 5 }
    },
    {
        id: 7, name: "Mr Mathew Imakun", role: "HOD, Business Development",
        image: marketingHodImage,
        socials: { linkedin: "#", instagram: "#" },
        style: { top: '5%', right: '2%', width: '18%', aspectRatio: '1/1', zIndex: 3 }
    },
    {
        id: 8, name: "Mr Mathias Nega", role: "HOD, ICT Dept",
        image: ictHodImage,
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '50%', right: '0%', width: '20%', aspectRatio: '4/3', zIndex: 12 },
        objectPosition: 'top'
    },
];

const Team = () => {
    const containerRef = useRef(null);
    const q = gsap.utils.selector(containerRef);

    useGSAP(() => {
        const cards = q('.team-card-container');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
            },
            onComplete: startBreathing
        });

        tl.from(cards, {
            opacity: 0,
            scale: 0,
            x: () => gsap.utils.random([-1000, 1000]),
            y: () => gsap.utils.random([-1000, 1000]),
            rotation: () => gsap.utils.random(-45, 45),
            duration: 1.5,
            stagger: { amount: 0.5, from: "random" },
            ease: "power3.out"
        });

        function startBreathing() {
            cards.forEach((card) => {
                gsap.to(card, {
                    y: gsap.utils.random(-15, -25),
                    rotation: gsap.utils.random(-3, 3),
                    duration: gsap.utils.random(3, 5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: gsap.utils.random(0, 2)
                });
            });
        }

    }, { scope: containerRef });

    return (
        <SectionWrapper
            id="team"
            // FIX 1: Reduced top padding (!pt-20 md:!pt-24) to lift Header UP
            className="z-30 bg-brand-dark/80 backdrop-blur-2xl text-white !justify-start !pt-20 md:!pt-24 overflow-hidden"
        >
            <div className="container mx-auto px-4 h-full flex flex-col">

                {/* Header Section */}
                {/* Reduced bottom margin slightly to keep things tight */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 relative z-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading leading-[0.9] text-white uppercase mb-4">
                            Our <br /> <span className="text-brand-gold">Royal Team</span>
                        </h2>
                        <p className="text-white/70 font-body text-sm md:text-base max-w-md border-l-2 border-brand-gold pl-4">
                            Meet the elite team of business savvy, dedicated and reliable professionals crafting your legacy.
                        </p>
                    </div>
                </div>

                {/* --- The Collage Container --- */}
                {/* FIX 2: Removed negative margin. */}
                {/* FIX 3: Changed aspect ratio to [16/8] (shorter) so bottom cards are pulled UP on screen */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-7xl mx-auto aspect-[9/10] md:aspect-[16/8] mt-0 mb-auto"
                >
                    {teamMembers.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Team;