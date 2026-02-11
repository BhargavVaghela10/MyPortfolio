import { useEffect, useRef, useState } from 'react';

const Section = ({ id, title, children, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`min-h-screen pt-32 pb-20 md:py-20 px-6 flex flex-col items-center justify-center ${className}`}
        >
            <div
                className={`max-w-7xl w-full transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent uppercase tracking-tight">
                    {title}
                </h2>

                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
