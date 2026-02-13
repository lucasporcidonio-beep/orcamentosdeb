import { motion } from "framer-motion";

export const ImportanceSection = () => {
    return (
        <section className="py-20 px-4 bg-secondary/10">
            <div className="container max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                        Não é apenas uma festa. <span className="text-primary italic">É um marco.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-body">
                        Seus 15 anos merecem mais do que fotos comuns. Merecem direção, sensibilidade e excelência.
                        É sobre capturar quem você é hoje, para que você possa reviver esse sentimento para sempre.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
