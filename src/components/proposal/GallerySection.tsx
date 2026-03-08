import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Dynamically import all images from the debutantes folder
// Using relative path to ensure glob works correctly
const imagesGlob = import.meta.glob("../../assets/debutantes/*.{jpg,jpeg,png,webp}", { eager: true });

// Convert glob object to array of strings (urls)
const allImages = Object.values(imagesGlob).map((mod: any) => mod.default);

export const GallerySection = () => {
    const [displayImages, setDisplayImages] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: "start",
        dragFree: true
    }, [
        Autoplay({
            delay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            playOnInit: true
        })
    ]);

    // Randomly select images on mount
    useEffect(() => {
        if (allImages.length === 0) {
            console.warn("No images found in gallery glob!");
            return;
        }
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        setDisplayImages(shuffled.slice(0, 15)); // Show 15 random photos
    }, []);

    const navigate = useCallback((direction: "prev" | "next") => {
        if (selectedIndex === null) return;

        setSelectedIndex(prev => {
            if (prev === null) return null;
            if (direction === "prev") {
                return prev === 0 ? displayImages.length - 1 : prev - 1;
            } else {
                return prev === displayImages.length - 1 ? 0 : prev + 1;
            }
        });
        setProgress(0); // Reset timer on manual navigation
    }, [selectedIndex, displayImages.length]);

    // Auto-advance timer logic
    useEffect(() => {
        if (selectedIndex === null || isPaused) return;

        const duration = 7000; // 7 seconds
        const interval = 100; // Update every 100ms

        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (interval / duration) * 100;
                if (newProgress >= 100) {
                    navigate("next");
                    return 0;
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [selectedIndex, isPaused, navigate]);

    // Reset progress when opening modal
    useEffect(() => {
        if (selectedIndex !== null) {
            setProgress(0);
            setIsPaused(false);
        }
    }, [selectedIndex]);

    return (
        <section className="py-20 bg-background overflow-hidden relative">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4">
                    Momentos Eternizados
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Cada clique, uma história. Confira nossa galeria com momentos únicos.
                </p>
            </div>

            {/* Auto-playing Carousel */}
            <div className="overflow-hidden w-full px-4" ref={emblaRef}>
                <div
                    className="flex touch-pan-y -ml-4"
                    style={{ transitionTimingFunction: 'linear' }} // Makes Autoplay smooth
                >
                    {displayImages.map((src, index) => (
                        <div
                            key={index}
                            className="flex-none min-w-[280px] w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 pl-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative group overflow-hidden rounded-xl cursor-pointer aspect-[3/4]"
                                onClick={() => setSelectedIndex(index)}
                            >
                                <img
                                    src={src}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Instagram Stories like border overlay */}
                                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="text-white w-8 h-8 drop-shadow-lg scale-50 group-hover:scale-100 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stories / Lightbox Modal */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
                        onClick={() => setSelectedIndex(null)}
                    >
                        {/* Top Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-50">
                            <motion.div
                                className="h-full bg-primary"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: "linear", duration: 0.1 }} // Smooth minimal updates
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("prev");
                            }}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("next");
                            }}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Main Image Container */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-screen h-screen flex items-center justify-center p-0"
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onTouchStart={() => setIsPaused(true)}
                            onTouchEnd={() => setIsPaused(false)}
                        >
                            <img
                                src={displayImages[selectedIndex]}
                                alt="Gallery View"
                                className="w-full h-full object-contain rounded-none"
                            />

                            {/* Pause Indicator (optional) */}
                            {isPaused && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-4 rounded-full backdrop-blur-sm pointer-events-none transition-opacity">
                                    <Pause className="w-8 h-8 text-white fill-white" />
                                </div>
                            )}
                        </motion.div>

                        {/* Caption / Helper Text */}
                        <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-sm">
                            <p>Pressione a tela ou passe o mouse para pausar</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
