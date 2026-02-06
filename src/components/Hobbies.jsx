import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

const TiltCard = ({ item }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (0.5 - y) * 20;
        const rotateY = (x - 0.5) * 20;
        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000 w-full h-full"
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-100 ease-out preserve-3d group h-full flex flex-col"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Image Container */}
                <div className="h-64 overflow-hidden relative" style={{ transform: 'translateZ(20px)' }}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                        {item.description}
                    </p>
                </div>

                {/* Neon Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${50 + rotation.y * 2}% ${50 - rotation.x * 2}%, rgba(59, 130, 246, 0.15), transparent 70%)`
                    }}
                ></div>
            </div>
        </motion.div>
    );
};

const Hobbies = () => {
    const hobbies = [
        {
            title: "Photography",
            description: "Capturing moments through the lens, exploring light, shadows, and the beauty of the world. It's my way of storytelling without words.",
            image: "/images/photography.png"
        },
        {
            title: "Travelling",
            description: "Exploring new horizons, embracing diverse cultures, and discovering the hidden gems of our planet. Every journey is a new chapter of growth.",
            image: "/images/travelling.png"
        },
        {
            title: "Cricket",
            description: "The thrill of the game, the precision of the bat, and the passion of the field. Cricket is more than a sport; it's an emotion for me. Virat Kohli is my favourite player.",
            image: "/images/RoKo.jpg"
        }
    ];

    return (
        <Section
            id="hobbies"
            title="My Hobbies"
            subtitle="What I Love Beyond Code"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pt-10">
                {hobbies.map((hobby, index) => (
                    <TiltCard key={index} item={hobby} />
                ))}
            </div>
        </Section>
    );
};

export default Hobbies;
