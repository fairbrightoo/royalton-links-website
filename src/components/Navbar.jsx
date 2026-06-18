import React, { useState, useRef } from 'react';
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RoyaltonLogo from "../assets/images/royalton-logo.svg";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ setIsContactOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const drawerRef = useRef(null);
    const backdropRef = useRef(null);
    const linksRef = useRef([]);

    const [navStyle, setNavStyle] = useState({
        bg: 'bg-transparent',
        text: 'text-white'
    });

    const sections = [
        { id: 'hero-section', bg: 'bg-transparent', text: 'text-white' },
        { id: 'properties',   bg: 'bg-transparent', text: 'text-white' },
        { id: 'about',        bg: 'bg-transparent', text: 'text-white' },
        { id: 'team',         bg: 'bg-transparent', text: 'text-white' },
        { id: 'testimonials', bg: 'bg-transparent', text: 'text-white' },
        { id: 'footer',       bg: 'bg-transparent', text: 'text-white' },
    ];

    /* NAVBAR COLOR SYNC */
    useGSAP(() => {
        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: `#${section.id}`,
                start: "top top+=10",
                end: "bottom top",
                onEnter: () => setNavStyle({ bg: section.bg, text: section.text }),
                onEnterBack: () => setNavStyle({ bg: section.bg, text: section.text }),
            });
        });
    }, []);

    /* MOBILE + TABLET DRAWER ANIMATIONS */
    useGSAP(() => {
        if (isOpen) {
            gsap.to(backdropRef.current, {
                autoAlpha: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.45,
                ease: "power3.out"
            });

            gsap.fromTo(
                linksRef.current,
                { x: 30, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.35,
                    stagger: 0.08,
                    ease: "power2.out"
                }
            );
        } else {
            gsap.to(backdropRef.current, {
                autoAlpha: 0,
                duration: 0.25,
                ease: "power2.in"
            });

            gsap.to(drawerRef.current, {
                x: "100%",
                duration: 0.35,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* NAVBAR */}
            <nav
                className={`fixed top-0 left-0 w-full z-[80] flex items-center justify-between 
                px-4 sm:px-6 md:px-10 lg:px-20 py-4 md:py-5 lg:py-6 transition-colors duration-500 
                ${navStyle.bg} ${navStyle.text} pointer-events-none`}
            >

                {/* LOGO */}
                <div className="flex items-center gap-3 pointer-events-auto">
                    <img
                        src={RoyaltonLogo}
                        alt="Royalton Logo"
                        className="
                            h-12 sm:h-14 md:h-16 lg:h-20
                            w-auto object-contain
                            lg:[transform:scale(1.7)]
                        "
                        style={{
                            transform: "scale(1.2)",          // mobile & tablet
                            transformOrigin: "left center",
                        }}
                    />

                    <div className="flex flex-col leading-tight">
                        <span className="font-heading text-xl md:text-2xl lg:text-3xl tracking-widest text-gradient-primary uppercase">
                            Royalton Properties
                        </span>

                        <span className="
                            font-body
                            text-[0.55rem] sm:text-[0.65rem] md:text-[0.70rem] lg:text-xs
                            tracking-[0.15em]
                            block whitespace-nowrap opacity-90 mt-0 text-brand-purple
                        ">
                            Realty and Reliability........
                        </span>
                    </div>
                </div>

                {/* DESKTOP LINKS (LG AND UP ONLY) */}
                <div className="hidden lg:flex gap-8 font-body text-lg font-bold tracking-wide pointer-events-auto">
                    <a href="#properties" className="hover:text-brand-gold transition-colors">OUR PROPERTIES</a>
                    <a href="#about" className="hover:text-brand-gold transition-colors">ABOUT US</a>
                    <a href="#footer" className="hover:text-brand-gold transition-colors">LOCATIONS</a>

                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="hover:text-brand-gold transition-colors uppercase font-bold"
                    >
                        CONTACT
                    </button>
                </div>

                {/* MOBILE & TABLET MENU BUTTON */}
                <div className="flex gap-6 text-xl items-center pointer-events-auto lg:hidden">
                    <button
                        className="text-3xl cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <FiMenu />
                    </button>
                </div>
            </nav>

            {/* BACKDROP */}
            <div
                ref={backdropRef}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm opacity-0 pointer-events-auto z-[90]"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* DRAWER */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-[80%] max-w-[320px]
                bg-brand-dark text-white z-[100] px-8 py-10 flex flex-col gap-12
                translate-x-full"
            >

                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                    <img
                        src={RoyaltonLogo}
                        className="h-12 w-auto object-contain"
                        alt="Logo"
                    />
                    <button onClick={() => setIsOpen(false)} className="text-3xl">
                        <FiX />
                    </button>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col gap-8 text-2xl font-heading tracking-wider">
                    {["PROPERTIES", "ABOUT US", "LOCATIONS", "CONTACT"].map((item, i) => (
                        <div
                            key={item}
                            ref={el => (linksRef.current[i] = el)}
                            className="opacity-0 cursor-pointer hover:text-brand-gold"
                            onClick={() => {
                                setIsOpen(false);
                                if (item === "CONTACT") setIsContactOpen(true);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
