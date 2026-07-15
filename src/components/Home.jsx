import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../data/portfolio.json';
import Section from './Section';

const ROLES = [
    'Aspiring AI/ML Developer',
    'Data Scientist Enthusiast',
    'Front-End Developer',
    'Problem Solver',
    'Tech Enthusiast',
];

const useTypewriter = (words, speed = 80, pause = 1800) => {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        let timeout;

        if (!deleting && charIndex < current.length) {
            timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
        } else if (!deleting && charIndex === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
            timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
        } else if (deleting && charIndex === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, wordIndex, words, speed, pause]);

    useEffect(() => {
        setText(words[wordIndex].slice(0, charIndex));
    }, [charIndex, wordIndex, words]);

    return text;
};

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Home = () => {
    const { personal } = portfolioData;
    const role = useTypewriter(ROLES);

    const stats = [
        { label: 'Projects', value: '3+' },
        { label: 'Technologies', value: '20+' },
        { label: 'CGPA', value: '8.26' },
    ];

    return (
        <main className="w-full">
            <section className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden">
                {/* Subtle background: dot grid */}
                <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

                {/* Very subtle ambient blobs */}
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-16 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ── LEFT COLUMN ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-5 order-2 lg:order-1"
                    >
                        {/* Availability badge */}
                        <motion.div variants={fadeUp}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Open to AI/ML Opportunities
                            </span>
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            variants={fadeUp}
                            className="text-gray-400 text-base font-medium tracking-[0.18em] uppercase"
                        >
                            Hello, I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter text-white leading-[1.05]"
                        >
                            {personal.name.split(' ')[0]}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                {personal.name.split(' ')[1]}
                            </span>
                            <span className="text-blue-400">.</span>
                        </motion.h1>

                        {/* Typewriter role */}
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-1.5 text-xl md:text-2xl font-semibold text-gray-300 h-8"
                        >
                            <span>{role}</span>
                            <span className="inline-block w-0.5 h-6 bg-blue-400 animate-blink ml-0.5" />
                        </motion.div>

                        {/* Tagline / Slogan — UNCHANGED */}
                        <motion.p
                            variants={fadeUp}
                            className="text-sm text-blue-400/80 font-medium tracking-wide leading-relaxed max-w-lg"
                        >
                            {personal.tagline}
                        </motion.p>

                        {/* Short intro */}
                        <motion.p
                            variants={fadeUp}
                            className="text-gray-400 text-base leading-relaxed max-w-lg"
                        >
                            {personal.description}
                        </motion.p>

                        {/* Resume Buttons */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-3 pt-2"
                        >
                            <a
                                href="/Bhargav-Vaghela__Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Resume
                            </a>
                            <a
                                href="/Bhargav-Vaghela__Resume.pdf"
                                download="Bhargav-Vaghela-Resume.pdf"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Resume
                            </a>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-6 pt-4 border-t border-white/8 mt-2"
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span className="text-2xl font-black text-white tracking-tight">{stat.value}</span>
                                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT COLUMN — Profile Photo ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, x: 24 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                        className="flex justify-center lg:justify-end order-1 lg:order-2"
                    >
                        <div className="relative w-64 sm:w-72 md:w-80 lg:w-[360px] xl:w-[400px] animate-float">
                            <img
                                src="/me_photo.jpg"
                                alt="Bhargav Vaghela"
                                className="w-full rounded-2xl object-cover object-top"
                                style={{ height: '460px', objectPosition: 'center 10%' }}
                            />
                            {/* Extremely subtle vignette to blend bottom edge */}
                            <div className="absolute inset-x-0 bottom-0 h-20 rounded-b-2xl bg-gradient-to-t from-[#050505]/60 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gray-600 font-medium">Scroll</span>
                    <div className="w-5 h-8 border border-gray-700 rounded-full flex justify-center pt-1.5">
                        <div className="w-0.5 h-2 bg-gray-500 rounded-full animate-scroll-bounce" />
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <Section id="education" title="Education" subtitle="My Academic Journey" className="!min-h-fit !pt-24 !pb-12 md:!py-20">
                <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                    {personal.education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300 flex flex-col gap-3"
                        >
                            <div className="text-3xl">{edu.icon}</div>
                            <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">{edu.duration}</span>
                            <h3 className="text-base font-bold text-white leading-snug">{edu.degree}</h3>
                            <p className="text-gray-400 text-sm font-medium">{edu.institution}</p>
                            {edu.score && (
                                <span className="mt-auto inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1 w-fit">
                                    {edu.score}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Experience Section */}
            <Section id="experience" title="Experience" subtitle="Hackathons & Events" className="!min-h-fit !py-12 md:!py-20">
                <div className="max-w-4xl mx-auto w-full flex flex-col gap-5 mt-8">
                    {personal.experience.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-blue-500/30 hover:bg-white/8 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div>
                                    <span className="text-blue-400 font-mono text-xs tracking-widest uppercase block mb-1">{exp.duration}</span>
                                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                                    <p className="text-gray-300 font-medium">{exp.company}</p>
                                </div>
                                {exp.badge && (
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 whitespace-nowrap">
                                        {exp.badge}
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Currently Building Section */}
            <Section id="currently-building" title="Now" subtitle="What I'm currently working on" className="!min-h-fit !pt-12 !pb-24 md:!py-20">
                <div className="max-w-4xl mx-auto w-full mt-8">
                    {/* Pulsing status bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                        </span>
                        <span className="text-emerald-400 text-sm font-semibold tracking-wide">Active — Building in Progress</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {personal.currentlyBuilding.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.12 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="group relative bg-gradient-to-b from-white/8 to-white/4 border border-white/10 rounded-2xl p-7 hover:border-blue-500/40 transition-all duration-300 overflow-hidden"
                            >
                                {/* Subtle corner glow */}
                                <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-500/8 rounded-full blur-xl group-hover:bg-blue-500/15 transition-all duration-500" />

                                <h3 className="text-base font-bold text-white mb-2 relative z-10">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-5 relative z-10">{item.description}</p>
                                <div className="flex flex-wrap gap-1.5 relative z-10">
                                    {item.tech.map((t) => (
                                        <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wider">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default Home;
