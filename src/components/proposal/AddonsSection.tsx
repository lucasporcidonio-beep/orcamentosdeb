import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { getProposalData } from "@/data/proposalData";
import { useParams } from "react-router-dom";

export const AddonsSection = () => {
    const { clientSlug } = useParams();
    const data = getProposalData(clientSlug);
    const { addons } = data;

    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
                    Adicionais Disponíveis
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {addons.map((addon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-sm hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full text-primary">
                                    <Plus className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-foreground">{addon.item}</span>
                            </div>
                            <span className="font-bold text-lg text-primary">{addon.price}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
