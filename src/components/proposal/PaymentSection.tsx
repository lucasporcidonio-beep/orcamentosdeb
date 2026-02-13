import { motion } from "framer-motion";
import { CreditCard, Banknote, Calendar } from "lucide-react";

export const PaymentSection = () => {
    return (
        <section className="py-20 px-4 bg-muted/30">
            <div className="container max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-12 text-foreground">
                    Formas de Pagamento
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-center"
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Reserva</h3>
                        <p className="text-sm text-muted-foreground">
                            Apenas <strong>20%</strong> do valor para garantir sua data na agenda.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-center"
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Banknote className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Pix ou Dinheiro</h3>
                        <p className="text-sm text-muted-foreground">
                            Pagamento restante até o dia do evento sem taxas adicionais.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-center"
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">Cartão de Crédito</h3>
                        <p className="text-sm text-muted-foreground">
                            Parcelamento disponível (com acréscimo da operadora).
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
