import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/contact-photo.jpg"; // Updated hero background
import { trackEvent } from "@/lib/analytics";
import logoImg from "@/assets/logo-custom.png"; // We will instruct user to place logo here

interface HeroSectionProps {
    clientName: string;
    eventDate?: string | null;
}

export const HeroSection = ({ clientName, eventDate }: HeroSectionProps) => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-40 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <img src={logoImg} alt="Logo" className="h-24 md:h-32 mx-auto drop-shadow-2xl" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 tracking-wide uppercase">
                        Proposta Personalizada
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight mb-6 leading-tight">
                        A experiência completa para <br />
                        <span className="text-primary italic">eternizar seus 15 anos</span> <br />
                        com elegância e presença.
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
                        Proposta exclusiva para <span className="text-foreground font-semibold">{clientName}</span>
                        {eventDate && (
                            <>
                                <span className="mx-2">•</span>
                                <span className="text-foreground/80">{eventDate}</span>
                            </>
                        )}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-primary text-primary-foreground text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 mx-auto"
                        onClick={() => {
                            trackEvent("click_hero_cta", { client: clientName });
                            document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Quero garantir minha data
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
