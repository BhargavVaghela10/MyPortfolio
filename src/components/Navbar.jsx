import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Hobbies', path: '/hobbies' },
        { name: 'Projects', path: '/projects' },
        { name: 'Slogan Spectrum', path: '/slogan-spectrum' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 py-8 md:px-12 pointer-events-none transition-colors duration-300 ${isOpen ? '' : 'mix-blend-difference'}`}
        >
            {/* Logo */}
            <Link
                to="/"
                className="text-2xl font-black tracking-tighter text-white pointer-events-auto cursor-pointer"
            >
                BHARGAV VAGHELA<span className="text-blue-500">.</span>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-10 pointer-events-auto items-center">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`
                                    text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                                    ${isActive
                                        ? 'text-blue-500'
                                        : 'text-gray-400 hover:text-white'
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile Menu Toggle */}
            <div
                className="md:hidden pointer-events-auto cursor-pointer text-white relative z-[101]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-[1px]' : ''}`}></div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-20 right-8 bg-[#0a0a0a] border border-gray-800 p-6 rounded-2xl flex flex-col gap-4 pointer-events-auto md:hidden w-48 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-[100]">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm font-bold uppercase tracking-widest ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
