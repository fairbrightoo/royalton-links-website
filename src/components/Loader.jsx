import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Animate loader for a bit to show off the cool animation, then fade out
        const timer1 = setTimeout(() => {
            setIsFading(true);
        }, 5200);

        // Tell parent we are completely done after fade out
        const timer2 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[9999] bg-brand-dark flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Resized Logo Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                
                {/* Embedded Vector Logo */}
                <div className="absolute inset-0 w-full h-full drop-shadow-2xl">
                    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385.36 351.52"><defs><style>{`.cls-1{fill:#b0338f;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9,.cls-10,.cls-11,.cls-12,.cls-13,.cls-14,.cls-15,.cls-16,.cls-17,.cls-18,.cls-19,.cls-20,.cls-21,.cls-22,.cls-23,.cls-24,.cls-25,.cls-26,.cls-27,.cls-28,.cls-29,.cls-30,.cls-31,.cls-32,.cls-33,.cls-34,.cls-35,.cls-36,.cls-37,.cls-38,.cls-39,.cls-40,.cls-41,.cls-42,.cls-43,.cls-44,.cls-45,.cls-46,.cls-47,.cls-48,.cls-49,.cls-50,.cls-51,.cls-52,.cls-53,.cls-54,.cls-55,.cls-56,.cls-57,.cls-58,.cls-59,.cls-60,.cls-61,.cls-62,.cls-63,.cls-64,.cls-65,.cls-66,.cls-67,.cls-68,.cls-69,.cls-70,.cls-71,.cls-72,.cls-73,.cls-74,.cls-75,.cls-76,.cls-77,.cls-78,.cls-79,.cls-80,.cls-81,.cls-82,.cls-83,.cls-84,.cls-85,.cls-86,.cls-87,.cls-88,.cls-89{stroke-width:0px;}.cls-2{fill:#535788;}.cls-3{fill:#4b4479;}.cls-4{fill:#815e8c;}.cls-5{fill:#795b8b;}.cls-6{fill:#f3f0f4;}.cls-7{fill:#49528a;}.cls-8{fill:#e7e7f2;}.cls-9{fill:#e9e5f0;}.cls-10{fill:#79317e;}.cls-11{fill:#5e4a8a;}.cls-12{fill:#733583;}.cls-13{fill:#b4b2cc;}.cls-14{fill:#45378f;}.cls-15{fill:#cabbcd;}.cls-16{fill:#f7f5f8;}.cls-17{fill:#eee9ef;}.cls-18{fill:#615a8f;}.cls-19{fill:#443f71;}.cls-20{fill:#585988;}.cls-21{fill:#635b85;}.cls-22{fill:#e3dde6;}.cls-23{fill:#b12f8f;}.cls-24{fill:#634480;}.cls-25{fill:#b55098;}.cls-26{fill:#595781;}.cls-27{fill:#4d5184;}.cls-28{fill:#453c8f;}.cls-29{fill:#3f3892;}.cls-30{fill:#695488;}.cls-31{fill:#7f5986;}.cls-32{fill:#7b507d;}.cls-33{fill:#adb3d5;}.cls-34{fill:#3c3a92;}.cls-35{fill:#413a7b;}.cls-36{fill:#6c3284;}.cls-37{fill:#635c89;}.cls-38{fill:#464a7b;}.cls-39{fill:#cbc3d7;}.cls-40{fill:#2b356a;}.cls-41{fill:#423d78;}.cls-42{fill:#6e4f88;}.cls-43{fill:#e2dce8;}.cls-44{fill:#675f8d;}.cls-45{fill:#d3cede;}.cls-46{fill:#763281;}.cls-47{fill:#544182;}.cls-48{fill:#eeebf1;}.cls-49{fill:#6c6397;}.cls-50{fill:#f68a21;}.cls-51{fill:#e3e3ee;}.cls-52{fill:#683988;}.cls-53{fill:#4c3690;}.cls-54{fill:#63568e;}.cls-55{fill:#b13790;}.cls-56{fill:#505385;}.cls-57{fill:#5b5d8c;}.cls-58{fill:#75578a;}.cls-59{fill:#642d80;}.cls-60{fill:#5a5b8b;}.cls-61{fill:#253e90;}.cls-62{fill:#d8ccd8;}.cls-63{fill:#253f90;}.cls-64{fill:#655d89;}.cls-65{fill:#494375;}.cls-66{fill:#d7d4e4;}.cls-67{fill:#603389;}.cls-68{fill:#835e88;}.cls-69{fill:#695b90;}.cls-70{fill:#4f358f;}.cls-71{fill:#4c4680;}.cls-72{fill:#93689f;}.cls-73{fill:#502e8e;}.cls-74{fill:#683275;}.cls-75{fill:#6a578b;}.cls-76{fill:#6a6087;}.cls-77{fill:#4e406e;}.cls-78{fill:#b13f92;}.cls-79{fill:#4e467e;}.cls-80{fill:#845f89;}.cls-81{fill:#dad3df;}.cls-82{fill:#59388c;}.cls-83{fill:#7d6f9b;}.cls-84{fill:#5b3489;}.cls-85{fill:#473d80;}.cls-86{fill:#755383;}.cls-87{fill:#e8e5ee;}.cls-88{fill:#263f90;}.cls-89{fill:#424c81;}`}</style></defs><path className="cls-23" d="M187.82,140.95c43.49,34.8,84.27,71.77,127.73,106.37-10.69,0-21.38.15-32.07-.1-2.75-.06-4.98-2.21-7.16-3.97-22.31-18-44.7-35.9-66.91-54.02-4.7-3.83-8.74-8.47-13.08-12.74-2.44-2.4-5.24-4.23-8.63-5.9-5.49,3.81-11.1,7.02-15.32,12.66-3.23,4.33-8.2,7.4-12.54,10.85-20.97,16.68-41.97,33.33-63.02,49.93-4.17,3.29-8.65,5.08-14.39,4.96-8.04-.17-15.87-1.64-25.25-2.07,7.63-6.26,14.28-11.86,21.1-17.27,18.59-14.74,38.19-28.37,55.57-44.41,13.35-12.32,28.17-22.64,41.68-34.63,3.68-3.27,7.74-6.11,12.28-9.67Z"/><path className="cls-61" d="M229.96,161.68c-6.39-5.3-12.78-10.61-19.97-16.58v-63.5c-10.83-5.25-21.03-10.19-31.7-15.37,0-8.55.12-16.86-.05-25.17-.08-3.78,2.41-5.45,4.94-7.23,10.85-7.64,21.69-15.32,32.61-22.86,5.3-3.66,9.97-8.3,16.25-10.97v161.12c-.69.19-1.38.38-2.07.57Z"/><path className="cls-63" d="M102.26,195.31c-2.06-1.78-1.41-3.75-1.42-5.52-.05-15.8.24-31.61-.18-47.4-.14-5.32,1.86-8.7,5.54-11.98,15.72-14,31.15-28.35,47.09-42.09,4.15-3.58,5.55-9.81,11.68-11.46.23.83.66,1.65.67,2.48.12,18.25-.01,36.52,1.3,54.74.49,6.84-1.84,11.73-7.39,15.83-9.7,7.17-18.76,15.22-28.57,22.23-8.8,6.28-15.1,15.31-24.23,21.13-1.28.82-2.28,2.09-4.48,2.05Z"/><g className="horn-group">
<path className="cls-50" d="M77.34,215.29c-3.28,3.81-6.49,7.49-11.92,8.98-5.01-8.61-7.27-18.21-9.16-27.73-2.79-14-2.78-28.41.16-42.26,3.77-17.76,9.46-35.06,19.82-50.4,11.8-17.46,24.59-33.8,43.54-44.38,12.5-6.98,25.71-11.67,39.58-14.79,1.75-.39,3.63-.21,5.27-.28q2.64,5.51.41,14.59c-5.56,1.87-11.37,3.81-17.17,5.77-9.39,3.18-18.69,6.87-26.43,13.06-24.87,19.9-44.13,43.4-49.17,76.33-3.15,20.61-.4,40.44,5.07,61.1Z"/>
<path className="cls-50" d="M306.98,223.49c-4.38-1.1-6.46-4.34-9.43-6.82-.88-4.77,1.62-8.99,2.56-13.4,8.44-39.41,2.08-75.55-24.5-106.67-8.47-9.92-17.43-19.91-29.98-25.3-7.48-3.21-4.92-9.44-5.18-14.82,3.28-1.79,5.94-.88,8.46.16,13.02,5.35,25.24,12.36,34.43,22.97,17.17,19.83,29.31,42.29,33.11,68.83,3.38,23.63,2.23,46.7-5.76,69.29-.51,1.44-1.15,2.84-1.86,4.18-.26.5-.91.8-1.84,1.58Z"/>
</g><path className="cls-88" d="M245.54,173.76c-2.4-30.09-2.22-78.29.45-87.84,8.73,6.05,16.09,13.31,23.13,20.93,1.92,2.08,2.81,4.6,2.8,7.6-.08,26.25-.05,52.51-.09,78.76,0,.54-.5,1.09-1.01,2.11-10.18-5.31-17.57-13.74-25.28-21.56Z"/><path className="cls-55" d="M192.71,229.29c-1.89-3.9-.77-7.56-1.14-11.29,4.82-3.27,9.34-2.82,14.09-.77.96,3.86.83,7.47.17,11.23-4.36,3.01-8.7,1.82-13.12.83Z"/><path className="cls-25" d="M167.6,229.19v-12.75c4.47-1.68,8.94-.85,13.71-.73,1.41,4.05.61,7.93.72,12.05-4.63,2.2-9.15.43-14.43,1.43Z"/><path className="cls-1" d="M167.91,206.06v-11.94c4.27-1.84,8.74-.89,13.53-.76,1.21,4.13.73,7.97.53,12.23-4.82,1.12-9.24.37-14.07.47Z"/><path className="cls-78" d="M194.22,193.46h11.85v12.28h-12.6c-.17-4.48-1.32-8.59.75-12.28Z"/><path className="cls-60" d="M195.5,235.56c1.14.34,2.23.88,3.25-.43.74-.95,1.61-1.94,2.65-2.47,2.69-1.39,4.75-.22,6.15,2.15,2.24,3.8,1.1,11.64-1.92,13.51-2.65,1.64-4.34-.09-6.46-1.54-2.5-1.71-.18-5.68-3.62-6.59-1.36-1.53-1.35-3.07-.06-4.63Z"/><path className="cls-56" d="M239.03,232.11c2.03,2.81.5,5.96,3.4,7.29.69.32,1.28,1.39,1.45,2.22.45,2.16.41,4.3-1.46,5.97-1.51,1.34-3.22,1.93-5.09,1.05-2.12-1.01-3.24-2.78-3.15-5.21.16-4.13,1.53-7.73,4.84-11.31Z"/><path className="cls-27" d="M195.5,235.56c.02,1.54.04,3.09.06,4.63-.17,3.5-1.18,6.51-5.43,8.41.43-3.76-2.16-5.86-3.58-8.57-1.25-2.39-.9-5.65,2.04-7.11,2.91-1.45,5.98-1.79,6.91,2.64Z"/><path className="cls-2" d="M180.04,235.48c-1.85,2.03-2.85,2.64-4.19,2.4-.3-4.34.78-6.1,3.71-5.78,2.84.31,4.45,2.08,4.32,4.9-.06,1.45-.55,3.19-1.48,4.21-2.1,2.28.14,4.5-.35,6.74-2.28,1.24-4.51,1.35-6.75-.21-.12-4.22,4.31-6.87,4.75-12.26Z"/><path className="cls-7" d="M231.51,231.7c-2.07,6.6,3.06,11.64-1.73,16.65-2.19-1.4-4.38-2.81-6.58-4.22q1.63-8.52,8.31-12.43Z"/><path className="cls-20" d="M163.99,233c2.82-1.09,5.45-1.02,8.74.21-2.24,5.4-2.88,11.34-7.64,16.04-2.94-4.72,1.24-7.35,1.39-9.84,1.29-3.69-3.46-2.91-2.48-6.41Z"/><path className="cls-57" d="M212.19,233.05c2.25-1.13,4.56-1.11,7.45.14.09,5.88-2.63,10.63-6.11,15.69q-1.07-4.41,1.44-11.88c-1.14-1.14-3.78-1.2-2.78-3.95Z"/><path className="cls-38" d="M147.72,232.54c-6.39,8.39-6.55,8.07-.81,14.81-4.08,1.09-6.62-.19-7.7-3.89-1.59-5.47.87-9.12,8.51-10.91Z"/><path className="cls-40" d="M153.98,240.41c-1.25.75-1.92,2.2-3.06.62-.12-.16-.16-.52-.06-.68,1.05-1.69,1.81-.08,3.11.06Z"/><path className="cls-8" d="M203.98,236.59c1.15,2.66.57,5.3.29,8.34q-3.52-4.36-.29-8.34Z"/><path className="cls-33" d="M130.92,239.16c-.82-1.12-.97-2.51.41-2.91,1.35-.39,2.29.45,1.06,1.93-.36.43-.97.66-1.47.98Z"/><path className="cls-13" d="M191.59,236.05c.83.33,1.68.74,1.42,1.82-.21.87-.78,1.68-1.84,1.41-.87-.22-1.61-.82-1.36-1.88.2-.89.65-1.61,1.79-1.35Z"/></svg>
                </div>

                {/* Subtle glowing background behind logo to make it pop */}
                <div className="absolute inset-0 bg-brand-purple/20 blur-[80px] rounded-full animate-pulse z-[-1]"></div>
            </div>

            <style>{`
                /* 1. Horns growing from bottom to top using clip-path inset */
                .horn-group {
                    animation: horn-grow 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
                }

                @keyframes horn-grow {
                    0% { clip-path: inset(100% 0 0 0); }
                    50%, 100% { clip-path: inset(0 0 0 0); }
                }

                /* 2. Dots blinking clockwise */
                @keyframes dot-blink {
                    0%, 100% { opacity: 0.15; transform: scale(0.85); filter: brightness(0.6); }
                    50% { opacity: 1; transform: scale(1.25); filter: brightness(1.3) drop-shadow(0 0 8px rgba(176, 51, 143, 0.8)); }
                }

                /* Top Left */
                .cls-1 { 
                    animation: dot-blink 1.2s ease-in-out infinite; 
                    transform-origin: center; transform-box: fill-box; animation-delay: 0s; 
                }
                /* Top Right */
                .cls-78 { 
                    animation: dot-blink 1.2s ease-in-out infinite; 
                    transform-origin: center; transform-box: fill-box; animation-delay: 0.3s; 
                }
                /* Bottom Right */
                .cls-55 { 
                    animation: dot-blink 1.2s ease-in-out infinite; 
                    transform-origin: center; transform-box: fill-box; animation-delay: 0.6s; 
                }
                /* Bottom Left */
                .cls-25 { 
                    animation: dot-blink 1.2s ease-in-out infinite; 
                    transform-origin: center; transform-box: fill-box; animation-delay: 0.9s; 
                }
            `}</style>
        </div>
    );
};

export default Loader;
