import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Section from './Section';
import portfolioData from '../data/portfolio.json';

const Contact = () => {
    const { contact } = portfolioData;

    return (
        <Section
            id="contact"
            title="Get in Touch"
            subtitle="Let's build something together"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-8 px-4 pt-6"
            >
                {/* Heading */}
                <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        Contact Information
                    </h3>
                    <p className="text-gray-400 text-base font-light leading-relaxed">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                {/* Direct Email Button */}
                <a
                    href="mailto:vaghelabhargav1010@gmail.com"
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    vaghelabhargav1010@gmail.com
                </a>

                {/* Divider */}
                <div className="w-full h-px bg-white/8" />

                {/* Social Icons */}
                <div className="flex gap-5 justify-center">
                    {[
                        { icon: FaLinkedin, link: contact.socialLinks.linkedin, color: 'hover:text-blue-400', label: 'LinkedIn' },
                        { icon: FaGithub, link: contact.socialLinks.github, color: 'hover:text-white', label: 'GitHub' },
                        { icon: FaInstagram, link: contact.socialLinks.instagram, color: 'hover:text-pink-500', label: 'Instagram' },
                    ].map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.1 }}
                            className={`flex flex-col items-center gap-2 group`}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 shadow-xl backdrop-blur-sm group-hover:border-white/20`}>
                                <social.icon size={26} />
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 group-hover:text-gray-400 transition-colors">
                                {social.label}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

export default Contact;
