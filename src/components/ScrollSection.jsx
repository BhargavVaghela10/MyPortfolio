import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ScrollSection = ({ data, active }) => {
    const navigate = useNavigate();

    return (
        <div className={`h-screen w-full sticky top-0 left-0 flex flex-col justify-center ${data.align === 'left' ? 'items-start' : data.align === 'right' ? 'items-end' : 'items-center'} pointer-events-none z-10 px-6 md:px-20 pt-28 md:pt-0`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                    opacity: active ? 1 : 0,
                    y: active ? 0 : 50,
                    scale: active ? 1 : 0.95
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`max-w-4xl w-full ${data.align === 'left' ? 'text-left items-start' :
                    data.align === 'right' ? 'text-right items-end ml-auto' :
                        'text-center items-center mx-auto'
                    } flex flex-col`}
            >
                <h2
                    className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white will-change-transform"
                    style={{
                        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.4)',
                        WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                    }}
                >
                    {data.heading}
                </h2>
                <p
                    className="text-xl md:text-2xl text-white font-semibold tracking-wide max-w-2xl leading-relaxed will-change-transform"
                    style={{
                        textShadow: '1px 1px 8px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    {data.subheading}
                </p>

                {data.techList && (
                    <div className={`flex flex-wrap gap-3 mt-8 max-w-2xl will-change-transform ${data.align === 'right' ? 'justify-end' : data.align === 'left' ? 'justify-start' : 'justify-center'}`}>
                        {data.techList.map((tech, idx) => (
                            <span
                                key={idx}
                                className="px-5 py-2.5 bg-blue-500/20 border-2 border-blue-400/30 rounded-full text-white text-sm font-bold tracking-wider uppercase backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {data.cta && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: active ? 1 : 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-10 px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 pointer-events-auto shadow-2xl hover:scale-105 border-2 border-white/10 will-change-transform"
                        onClick={() => navigate('/contact')}
                    >
                        Get in Touch
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

export default ScrollSection;
