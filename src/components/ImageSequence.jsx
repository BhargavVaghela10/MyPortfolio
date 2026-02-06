import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';

const ImageSequence = ({ progress }) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(progress.get());
    const totalFrames = 240; // Matching user's 240 frames

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages = [];
            const imagePromises = [];

            for (let i = 1; i <= totalFrames; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    // Format number to 3 digits (001, 002, etc.)
                    const frameNumber = i.toString().padStart(3, '0');
                    // POINTING TO USER'S FRAMES IN public/frames/
                    img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
                    img.onload = () => {
                        resolve(img);
                        setLoadedCount(prev => prev + 1);
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        resolve(null);
                    };
                    loadedImages[i - 1] = img;
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    // Subscribe to progress motion value changes
    useMotionValueEvent(progress, "change", (latest) => {
        setCurrentProgress(latest);
    });

    const lastFrameIndex = useRef(-1);

    const drawFrame = () => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        let frameIndex = Math.floor(currentProgress * (totalFrames - 1));
        frameIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));

        const ctx = canvas.getContext('2d');
        const img = images[frameIndex];

        if (img && img.complete) {
            const displayWidth = window.innerWidth;
            const displayHeight = window.innerHeight;

            const canvasRatio = displayWidth / displayHeight;
            const imgRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawHeight = displayHeight;
                drawWidth = displayHeight * imgRatio;
                offsetX = (displayWidth - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = displayWidth;
                drawHeight = displayWidth / imgRatio;
                offsetX = 0;
                offsetY = (displayHeight - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, displayWidth, displayHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            lastFrameIndex.current = frameIndex;
        }
    };

    useEffect(() => {
        if (images.length === totalFrames) {
            requestAnimationFrame(drawFrame);
        }
    }, [currentProgress, images, loadedCount]);

    // Handle resizing with device pixel ratio for HD quality
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                const canvas = canvasRef.current;

                // Set display size (css pixels)
                const displayWidth = window.innerWidth;
                const displayHeight = window.innerHeight;

                // Set actual size in memory (scaled to account for extra pixel density)
                canvas.width = displayWidth * dpr;
                canvas.height = displayHeight * dpr;

                // Scale all drawing operations by the dpr
                const ctx = canvas.getContext('2d');
                ctx.scale(dpr, dpr);

                // Set CSS size to match display size
                canvas.style.width = `${displayWidth}px`;
                canvas.style.height = `${displayHeight}px`;

                // Force a redraw after resize
                if (images.length === totalFrames) {
                    drawFrame();
                }
            }
        };

        // Run resize when component mounts and when loading completes
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [loadedCount]); // Re-run when loading completes

    // Loading Screen
    if (loadedCount < totalFrames) {
        const percent = Math.round((loadedCount / totalFrames) * 100);
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
                <div className="w-64 h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <div className="text-xl font-light tracking-widest text-gray-400">
                    LOADING EXPERIENCE {percent}%
                </div>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-cover z-0"
            style={{ display: 'block' }}
        />
    );
};

export default ImageSequence;
