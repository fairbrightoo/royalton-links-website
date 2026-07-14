import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ExploreOverlay from "./components/ExploreOverlay";
import PropertyContactForm from "./components/PropertyContactForm";
import PrivacyOverlay from "./components/PrivacyOverlay";
import ContactOverlay from "./components/ContactOverlay";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

const App = () => {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [contactProperty, setContactProperty] = useState(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const handlePropertyContact = (propertyData) => {
        setContactProperty(propertyData);
    };

    return (
        <BrowserRouter>
            <main className="relative w-full bg-brand-dark min-h-screen flex flex-col">
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

                        <div className="flex-1 relative z-10">
                            <Routes>
                                <Route 
                                    path="/" 
                                    element={
                                        <Home 
                                            setIsExploreOpen={setIsExploreOpen}
                                            handlePropertyContact={handlePropertyContact}
                                        />
                                    } 
                                />
                                <Route path="/blog" element={<BlogList />} />
                                <Route path="/blog/:slug" element={<BlogPost />} />
                            </Routes>
                        </div>

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

                        {isPrivacyOpen && (
                            <PrivacyOverlay onClose={() => setIsPrivacyOpen(false)} />
                        )}
                    </>
                )}
            </main>
        </BrowserRouter>
    )
}

export default App;