import { motion } from "framer-motion";
import { Smartphone, Instagram, Zap, Film } from "lucide-react";
import realtimeImg from "@/assets/realtime.jpg";
import { getProposalData } from "@/data/proposalData";
import { useParams } from "react-router-dom";

export const RealTimeCoverage = () => {
    const { clientSlug } = useParams();
    const data = getProposalData(clientSlug);
    const { realTimeCoverage } = data;

    return (
        <section className="py-20 px-4 bg-gradient-to-r from-background to-secondary/10 overflow-hidden">
            <div className="container max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">
                            Diferencial Exclusivo
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                            Viva seu evento <br />
                            <span className="italic text-primary">enquanto ele acontece</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {realTimeCoverage.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                { icon: Instagram, text: "Stories Ilimitados" },
                                { icon: Film, text: "Mini vídeos editados (Reels)" },
                                { icon: Zap, text: "Entrega Instantânea" },
                                { icon: Smartphone, text: "Destaque no perfil" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 bg-card/50 p-3 rounded-lg border border-border/50">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-foreground">{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-6">
                            <div>
                                <span className="block text-2xl font-bold text-foreground">R$ {realTimeCoverage.price}</span>
                                <span className="text-sm text-muted-foreground">Valor adicional</span>
                            </div>
                            <button className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                                Adicionar ao pacote
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl md:translate-x-4 md:translate-y-4 -z-10" />
                        <img
                            src={realtimeImg}
                            alt="Cobertura em tempo real"
                            className="rounded-2xl shadow-2xl w-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
