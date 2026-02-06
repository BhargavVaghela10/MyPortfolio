import Section from './Section';
import portfolioData from '../data/portfolio.json';
import { motion } from 'framer-motion';

const SloganSpectrum = () => {
    const { sloganSpectrum } = portfolioData.sections;
    const { quotes } = sloganSpectrum;

    return (
        <Section
            id="slogan-spectrum"
            title={sloganSpectrum.title}
            subtitle="Words that Inspire"
        >
            <div className="max-w-5xl mx-auto px-4 pt-10">
                <div className="space-y-12">
                    {quotes.map((quote, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 relative group overflow-hidden ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 left-6 text-blue-500/20 text-8xl font-serif pointer-events-none group-hover:text-blue-500/30 transition-colors">
                                "
                            </div>

                            {/* Author Image */}
                            {quote.image && (
                                <div className="flex-shrink-0 relative">
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-500 shadow-2xl">
                                        <img
                                            src={quote.image}
                                            alt={quote.author}
                                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-lg shadow-blue-500/50">
                                        ✨
                                    </div>
                                </div>
                            )}

                            {/* Quote Text */}
                            <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                <p className="text-2xl md:text-3xl italic text-gray-100 mb-6 leading-relaxed font-light">
                                    "{quote.text}"
                                </p>
                                <div className={`inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium tracking-wider uppercase text-xs`}>
                                    {quote.author}
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default SloganSpectrum;
