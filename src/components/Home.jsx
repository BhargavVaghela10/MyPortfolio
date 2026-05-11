import { useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion';
import ImageSequence from './ImageSequence';
import ScrollSection from './ScrollSection';
import portfolioData from '../data/portfolio.json';

const Home = () => {
    const [activeSection, setActiveSection] = useState(0);
    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for a more fluid feel
    const smoothedProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Convert motion value to plain number for ImageSequence
    const progress = useTransform(smoothedProgress, [0, 1], [0, 1]);

    // Map portfolio data to scroll sections
    const { personal, sections } = portfolioData;

    const sectionsData = [
        {
            id: 'intro',
            heading: `Hi, I'm ${personal.name}.`,
            subheading: personal.tagline,
            align: 'center'
        },
        {
            id: 'philosophy',
            heading: "My Approach",
            subheading: "I like to start from the core problem, understand the user's needs, and then build solutions that are simple, fast, and easy to use.",
            align: 'left'
        },
        {
            id: 'skills',
            heading: "Tech Stack",
            subheading: "I work with Data Science and AI/ML technologies to build intelligent solutions and models.",
            techList: ["PYTHON", "PANDAS", "NUMPY", "SCIKIT-LEARN"],
            align: 'right'
        },
        {
            id: 'projects',
            heading: "Project Philosophy",
            subheading: "I Build Project with precision and purpose.",
            techList: ["Performance", "Design", "Scalability"],
            align: 'left'
        },
        {
            id: 'cta',
            heading: "Let's Connect.",
            subheading: `${personal.description}`,
            align: 'center',
            cta: true
        }
    ];

    // Determine active section based on scroll progress
    useMotionValueEvent(smoothedProgress, "change", (latest) => {
        // 5 sections over 0-1 range
        const index = Math.min(
            sectionsData.length - 1,
            Math.floor(latest * sectionsData.length)
        );
        if (activeSection !== index) {
            setActiveSection(index);
        }
    });

    return (
        <div className="relative bg-[#050505] text-white">
            {/* Container height: 400vh for scroll distance */}
            <div className="h-[500vh] relative">

                {/* Sticky Canvas Background */}
                <ImageSequence progress={smoothedProgress} />

                {/* Text Overlays */}
                <div className="relative z-10 w-full">
                    {sectionsData.map((section, index) => (
                        <ScrollSection
                            key={section.id}
                            data={section}
                            active={activeSection === index}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="fixed top-0 left-0 h-1 bg-white/10 w-full z-50 pointer-events-none">
                    <div
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-75 ease-out"
                        style={{ width: `${Math.max(0, Math.min(100, (activeSection + 1) / sectionsData.length * 100))}%` }}
                    />
                </div>
            </div>

            {/* Scroll Hint - Only visible on first section */}
            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 z-50 pointer-events-none ${activeSection === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Scroll to Explore</span>
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-scroll-bounce" />
                </div>
            </div>

            {/* Footer / Scroll hint was here */}
        </div>
    );
};

export default Home;
