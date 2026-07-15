import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Skills', path: '/skills' },
        { name: 'Hobbies', path: '/hobbies' },
        { name: 'Projects', path: '/projects' },
        { name: 'Slogan Spectrum', path: '/slogan-spectrum' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center p-4 md:px-12 md:py-8 pointer-events-none transition-colors duration-300 ${isOpen ? '' : 'mix-blend-difference'}`}
        >
            {/* Mobile Container */}
            <div className="md:hidden w-full flex justify-between items-center border border-white/10 rounded-3xl p-3 px-5 bg-white/5 backdrop-blur-md pointer-events-auto">
                {/* Mobile Logo */}
                <Link
                    to="/"
                    className="text-xl font-black tracking-tighter text-white cursor-pointer"
                >
                    BHARGAV VAGHELA<span className="text-blue-500">.</span>
                </Link>

                {/* Mobile Menu Toggle Button */}
                <div
                    className="cursor-pointer text-white relative z-[101] bg-white/10 hover:bg-white/20 transition-all rounded-full p-2 flex items-center justify-center w-10 h-10"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex flex-col gap-1.5">
                        <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                        <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* Desktop Logo */}
            <Link
                to="/"
                className="hidden md:block text-2xl font-black tracking-tighter text-white pointer-events-auto cursor-pointer"
            >
                BHARGAV VAGHELA<span className="text-blue-500">.</span>
            </Link>

            {/* Desktop Links + GitHub */}
            <ul className="hidden md:flex gap-8 pointer-events-auto items-center">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                                    isActive ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}

                {/* GitHub Button */}
                <li>
                    <a
                        href="https://github.com/BhargavVaghela10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/12 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </li>
            </ul>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-20 right-8 bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl flex flex-col gap-4 pointer-events-auto md:hidden w-52 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-[100]">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm font-bold uppercase tracking-widest ${
                                location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* GitHub in mobile menu */}
                    <a
                        href="https://github.com/BhargavVaghela10"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
