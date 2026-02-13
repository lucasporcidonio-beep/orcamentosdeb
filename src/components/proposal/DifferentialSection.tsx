import { motion } from "framer-motion";
import { Camera, Heart, CheckCircle, Sparkles } from "lucide-react";

const differentials = [
    {
        icon: Camera,
        title: "Direção Estratégica",
        description: "Eu guio cada pose para valorizar sua beleza natural.",
    },
    {
        icon: Heart,
        title: "Narrativa Visual",
        description: "Fotos que contam a sua história, não apenas registros soltos.",
    },
    {
        icon: CheckCircle,
        title: "Entrega Profissional",
        description: "Organização impecável, prazos cumpridos e alta qualidade.",
    },
    {
        icon: Sparkles,
        title: "Experiência Leve",
        description: "Você vai se sentir à vontade e confiante durante todo o processo.",
    },
];

export const DifferentialSection = () => {
    return (
        <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {differentials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-card border border-border/50 p-6 rounded-xl hover:border-primary/50 transition-colors text-center md:text-left shadow-sm"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold font-display text-foreground mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
