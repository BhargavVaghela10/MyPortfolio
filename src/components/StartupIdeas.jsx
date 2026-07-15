import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import portfolioData from '../data/portfolio.json';

const GitHubIcon = () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const ProjectCard = ({ idea, index }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setRotation({ x: (0.5 - y) * 8, y: (x - 0.5) * 8 });
    };

    const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000 w-full"
        >
            <div
                className="relative bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group hover:bg-white/[0.06] hover:border-white/20 flex flex-col h-full overflow-hidden"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Card top accent */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                <div className="p-8 flex flex-col gap-6 flex-1" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Header */}
                    <div style={{ transform: 'translateZ(30px)' }}>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-1.5">
                            {idea.title}
                        </h3>
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                            {idea.subtitle}
                        </p>
                    </div>

                    {/* Description */}
                    <div style={{ transform: 'translateZ(25px)' }}>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {idea.description}
                        </p>
                    </div>

                    {/* Capabilities */}
                    <div style={{ transform: 'translateZ(20px)' }} className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.18em] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
                            Core Capabilities
                        </h4>
                        <ul className="space-y-1.5">
                            {idea.coreCapabilities.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-blue-500 mt-0.5 text-xs">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Intelligence Layer */}
                    <div style={{ transform: 'translateZ(20px)' }} className="space-y-3">
                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.18em] flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-indigo-500 inline-block" />
                            Intelligence Layer
                        </h4>
                        <ul className="space-y-1.5">
                            {idea.intelligenceLayer.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-indigo-400 mt-0.5 text-xs">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Tech Stack */}
                    <div style={{ transform: 'translateZ(15px)' }} className="pt-5 border-t border-white/5">
                        <div className="flex flex-wrap gap-2 mb-5">
                            {idea.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-wider"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* GitHub Button */}
                        {idea.github ? (
                            <a
                                href={idea.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/15 hover:border-white/30 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <GitHubIcon />
                                View on GitHub
                            </a>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/3 border border-white/8 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-xl cursor-default">
                                <GitHubIcon />
                                Repo Coming Soon
                            </span>
                        )}
                    </div>
                </div>

                {/* Ambient hover glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${50 + rotation.y * 5}% ${50 - rotation.x * 5}%, rgba(59,130,246,0.04), transparent 65%)`
                    }}
                />
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
            subtitle="Deep Tech Solutions for Real-World Impact"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-12 pt-12">
                {startupIdeas.ideas.map((idea, index) => (
                    <ProjectCard key={index} idea={idea} index={index} />
                ))}
            </div>
        </Section>
    );
};

export default StartupIdeas;
