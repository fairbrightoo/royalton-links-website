import React, { useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from './TeamCard';

gsap.registerPlugin(ScrollTrigger);

import team1 from '../assets/images/placeholder_team_1.png';
import team2 from '../assets/images/placeholder_team_2.png';
import team3 from '../assets/images/placeholder_team_3.png';
import team4 from '../assets/images/placeholder_team_4.png';
import team5 from '../assets/images/placeholder_team_5.png';
import team6 from '../assets/images/placeholder_team_6.png';
import team7 from '../assets/images/placeholder_team_7.png';
import team8 from '../assets/images/placeholder_team_8.png';

// --- 8 MEMBER LAYOUT CONFIGURATION (Unchanged) ---
const teamMembers = [
    {
        id: 1, name: "Chinedu Okafor", role: "HOD, Accounting Dept",
        image: team1,
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '0%', left: '2%', width: '16%', aspectRatio: '3/4', zIndex: 2 }
    },
    {
        id: 2, name: "Adebayo Ogunlesi", role: "HOD, Admin Dept",
        image: team2,
        socials: { linkedin: "#", mail: "#" },
        style: { top: '30%', left: '0%', width: '22%', aspectRatio: '4/3', zIndex: 3 }
    },
    {
        id: 3, name: "Aliyu Abubakar", role: "HOD, Human Resource Dept",
        image: team3,
        socials: { linkedin: "#" },
        style: { top: '55%', left: '8%', width: '24%', aspectRatio: '1/1', zIndex: 1 }
    },
    {
        id: 4, name: "Dr. Oluwaseun Adeleke", role: "Managing Director",
        image: team4,
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '2%', left: '26%', width: '22%', aspectRatio: '3/5', zIndex: 2 }
    },
    {
        id: 5, name: "Zainab Usman", role: "General Manager",
        image: team5,
        socials: { instagram: "#", linkedin: "#" },
        style: { top: '13%', left: '57%', width: '24%', aspectRatio: '3/5', zIndex: 10 }
    },
    {
        id: 6, name: "Nnamdi Chukwu", role: "HOD, Site Dept",
        image: team6,
        socials: { linkedin: "#", mail: "#" },
        style: { top: '45%', left: '42%', width: '18%', aspectRatio: '3/4', zIndex: 5 }
    },
    {
        id: 7, name: "Amina Bello", role: "Asst. HOD, Business Development",
        image: team7,
        socials: { linkedin: "#", instagram: "#" },
        style: { top: '5%', right: '2%', width: '18%', aspectRatio: '1/1', zIndex: 3 }
    },
    {
        id: 8, name: "Mr. Tunde Bakare", role: "Asst. General Manager",
        image: team8,
        socials: { linkedin: "#", twitter: "#" },
        style: { top: '50%', right: '0%', width: '20%', aspectRatio: '4/3', zIndex: 12 }
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