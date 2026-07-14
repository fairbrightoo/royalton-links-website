import React from 'react';
import Hero from "../components/Hero";
import Properties from "../components/Properties";
import RoyaltonStory from "../components/RoyaltonStory";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import SectionWrapper from "../components/SectionWrapper";

const Home = ({ setIsExploreOpen, handlePropertyContact }) => {
    return (
        <>
            <SectionWrapper id="hero-section" className="z-0">
                <Hero />
            </SectionWrapper>

            <RoyaltonStory />

            <Properties
                setIsExploreOpen={setIsExploreOpen}
                onContact={handlePropertyContact}
            />

            <Team />
            <Testimonials />
        </>
    );
};

export default Home;
