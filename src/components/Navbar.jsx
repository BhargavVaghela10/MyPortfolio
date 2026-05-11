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
        { name: 'Contact', path: '/contact' }
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
