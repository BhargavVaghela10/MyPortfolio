import { useState, useEffect, useRef } from 'react';

const FRAME_COUNT = 240; // Updated to match user frames
const FPS = 24;
const FRAME_INTERVAL = 1000 / FPS;

const AnimatedPortrait = () => {
    const [currentFrame, setCurrentFrame] = useState(1);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const frameRef = useRef(1);
    const lastFrameTimeRef = useRef(0);
    const animationRef = useRef(null);

    // Preload images
    useEffect(() => {
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
        }
    }, []);

    // Animation Loop
    useEffect(() => {
        const animate = (time) => {
            if (time - lastFrameTimeRef.current > FRAME_INTERVAL) {
                frameRef.current = (frameRef.current % FRAME_COUNT) + 1;
                setCurrentFrame(frameRef.current);
                lastFrameTimeRef.current = time;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    // 3D Tilt Handles
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        // Calculate rotation: -20 to 20 degrees
        const rotateX = (0.5 - y) * 40;
        const rotateY = (x - 0.5) * 40;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className="relative w-full max-w-md aspect-square perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
            style={{ perspective: '1000px' }}
        >
            <div
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-100 ease-out border border-gray-700/50"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5), ${-rotation.y}px ${rotation.x}px 30px rgba(59, 130, 246, 0.2)`
                }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 pointer-events-none mix-blend-overlay z-10"></div>

                {/* Frame Image */}
                <img
                    src={`/frames/ezgif-frame-${currentFrame.toString().padStart(3, '0')}.jpg`}
                    alt="Animated Portrait"
                    className="w-full h-full object-cover"
                />

                {/* Shine effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-20 pointer-events-none"
                    style={{
                        backgroundPosition: `${50 + rotation.y}% ${50 + rotation.x}%`,
                        opacity: 0.5 + (Math.abs(rotation.x) + Math.abs(rotation.y)) / 40
                    }}
                ></div>
            </div>
        </div>
    );
};

export default AnimatedPortrait;
