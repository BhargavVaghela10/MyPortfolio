import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import portfolioData from '../data/portfolio.json';

const TiltCard = ({ idea }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [showTooltip, setShowTooltip] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (0.5 - y) * 10;
        const rotateY = (x - 0.5) * 10;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000 w-full"
        >
            <div
                className="relative bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl transition-all duration-300 preserve-3d group h-full flex flex-col hover:bg-white/[0.06]"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* GitHub Icon & Tooltip */}
                <div
                    className="absolute top-8 right-8 z-20"
                    style={{ transform: 'translateZ(50px)' }}
                >
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setShowTooltip(true);
                                setTimeout(() => setShowTooltip(false), 3000);
                            }}
                            className="p-2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </motion.div>

                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    className="absolute top-full right-0 mt-2 w-48 p-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-xl z-30 text-center leading-tight"
                                >
                                    Currently polishing ; Repository will be available soon
                                    <div className="absolute -top-1 right-3 w-2 h-2 bg-blue-600 rotate-45"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={{ transform: 'translateZ(40px)' }} className="mb-8 pr-12">
                    <h3 className="text-3xl font-black mb-3 text-white tracking-tighter">
                        {idea.title}
                    </h3>
                    <p className="text-blue-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
                        {idea.subtitle}
                    </p>
                </div>

                <div style={{ transform: 'translateZ(30px)' }} className="space-y-8 flex-1">
                    {/* Sections Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Capabilities/Functionality */}
                        <div>
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                {idea.coreCapabilities ? 'Core Capabilities' : 'Core Functionality'}
                            </h4>
                            <ul className="space-y-2">
                                {(idea.coreCapabilities || idea.coreFunctionality).map((item, i) => (
                                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                                        <span className="text-blue-500">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Intelligence/Decision Layer */}
                        <div>
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                {idea.intelligenceLayer ? 'Intelligence Layer' : 'Decision Support Layer'}
                            </h4>
                            <ul className="space-y-2">
                                {(idea.intelligenceLayer || idea.decisionSupportLayer).map((item, i) => (
                                    <li key={i} className="text-sm text-gray-300 flex gap-2">
                                        <span className="text-purple-500">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stakeholders (only if present) */}
                        {idea.stakeholders && (
                            <div>
                                <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                    Key Stakeholders
                                </h4>
                                <ul className="space-y-2">
                                    {idea.stakeholders.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-300 flex gap-2">
                                            <span className="text-emerald-500">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* System Flow */}
                        <div>
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                System Flow
                            </h4>
                            <p className="text-xs text-gray-400 bg-white/5 p-4 rounded-2xl border border-white/5 leading-relaxed italic">
                                {idea.systemFlow}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div style={{ transform: 'translateZ(20px)' }} className="mt-10 pt-8 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                        {idea.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Ambient Glow */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${50 + rotation.y * 5}% ${50 - rotation.x * 5}%, rgba(59, 130, 246, 0.05), transparent 70%)`
                    }}
                ></div>
            </div>
        </motion.div>
    );
};

const StartupIdeas = () => {
    const { startupIdeas } = portfolioData.sections;

    return (
        <Section
            id="projects"
            title={startupIdeas.title}
            subtitle="Deep Tech Solutions for Real World Impact"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-6 md:px-12 pt-16">
                {startupIdeas.ideas.map((idea, index) => (
                    <TiltCard key={index} idea={idea} />
                ))}
            </div>
        </Section>
    );
};

export default StartupIdeas;
