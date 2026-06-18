import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Properties from "./components/Properties";
import About from "./components/About";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SectionWrapper from "./components/SectionWrapper";
import ExploreOverlay from "./components/ExploreOverlay";
import PropertyContactForm from "./components/PropertyContactForm";
// 1. Import Privacy Overlay
import PrivacyOverlay from "./components/PrivacyOverlay";
import ContactOverlay from "./components/ContactOverlay"; // 1. Import
import Loader from "./components/Loader";

const App = () => {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [contactProperty, setContactProperty] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // 2. Add Privacy State
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const handlePropertyContact = (propertyData) => {
        setContactProperty(propertyData);
    };

    return (
        <main className="relative w-full bg-brand-dark min-h-screen">
            {isAppLoading && <Loader onComplete={() => setIsAppLoading(false)} />}

            {!isAppLoading && (
                <>
                    {/* Animated Background Shapes */}
                    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                        <div className="absolute rounded-full blur-[120px] opacity-50 bg-brand-purple w-[400px] h-[400px] -top-[100px] -left-[100px] animate-float-bg"></div>
                        <div className="absolute rounded-full blur-[120px] opacity-50 bg-brand-blue w-[500px] h-[500px] -bottom-[200px] -right-[100px] animate-float-bg" style={{ animationDelay: '-5s' }}></div>
                        <div className="absolute rounded-full blur-[120px] opacity-30 bg-brand-gold w-[300px] h-[300px] top-[40%] left-[40%] animate-float-bg" style={{ animationDelay: '-10s' }}></div>
                    </div>

                    <Navbar setIsContactOpen={setIsContactOpen} />

                    <SectionWrapper id="hero-section" className="z-0">
                        <Hero />
                    </SectionWrapper>

                    <Properties
                        setIsExploreOpen={setIsExploreOpen}
                        onContact={handlePropertyContact}
                    />

                    <About />
                    <Team />
                    <Testimonials />

                    {/* 3. Pass setIsPrivacyOpen to Footer */}
                    <Footer
                        setIsPrivacyOpen={setIsPrivacyOpen}
                        setIsContactOpen={setIsContactOpen}
                    />

                    {/* Overlays */}
                    {isExploreOpen && (
                        <ExploreOverlay
                            onClose={() => setIsExploreOpen(false)}
                            onContact={handlePropertyContact}
                        />
                    )}

                    {isContactOpen && (
                        <ContactOverlay onClose={() => setIsContactOpen(false)} />
                    )}

                    {contactProperty && (
                        <PropertyContactForm
                            property={contactProperty}
                            onClose={() => setContactProperty(null)}
                        />
                    )}

                    {/* 4. Render Privacy Overlay */}
                    {isPrivacyOpen && (
                        <PrivacyOverlay onClose={() => setIsPrivacyOpen(false)} />
                    )}
                </>
            )}
        </main>
    )
}

export default App;