import portfolioData from '../data/portfolio.json';
import AnimatedPortrait from './AnimatedPortrait';

const Hero = () => {
    const { personal } = portfolioData;

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Background Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-drift"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-col-reverse">
                {/* Left Column: Text Content */}
                <div className="text-center md:text-left animate-fade-in-up order-2 md:order-1">
                    <h2 className="text-xl md:text-2xl font-light text-blue-400 mb-4 tracking-wide">
                        {personal.tagline}
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {personal.name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                        {personal.description}
                    </p>

                    <div className="pt-8 flex gap-4 justify-center md:justify-start">
                        <a
                            href="#startup-ideas"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('startup-ideas')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                        >
                            View My Work
                        </a>
                    </div>

                    <div className="pt-8">
                        <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {personal.techStack.map((tech, index) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-gray-300 transition-all hover:text-white hover:border-blue-500/50 cursor-default"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Animated Portrait */}
                <div className="flex items-center justify-center md:justify-end animate-fade-in-up order-1 md:order-2" style={{ animationDelay: '0.4s' }}>
                    <div className="w-64 max-w-full md:w-full md:max-w-md">
                        <AnimatedPortrait />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a
                href="#hobbies"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('hobbies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors animate-bounce cursor-pointer z-20"
                aria-label="Scroll to Hobbies"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </a>
        </section>
    );
};

export default Hero;
