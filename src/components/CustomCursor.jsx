import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth movement springs
    const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-500/50 z-[9999] pointer-events-none hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-12px',
                    translateY: '-12px',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0)',
                    borderColor: isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)',
                    borderWidth: isHovering ? '2px' : '1px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            {/* Inner Dot Focus */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-full z-[9999] pointer-events-none hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                    opacity: isHovering ? 0.8 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
