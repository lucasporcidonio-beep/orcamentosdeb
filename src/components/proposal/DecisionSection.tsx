import { motion } from "framer-motion";
import { MessageCircle, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export const DecisionSection = () => {
    return (
        <section className="py-20 px-4 bg-background">
            <div className="container max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                        Vamos garantir essa data?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
                        Datas são limitadas. Garanta que o registro dos seus 15 anos esteja em boas mãos.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button
                            onClick={() => {
                                trackEvent("click_accept_proposal");
                                window.open("https://wa.me/5515997485268?text=Olá,%20Lucas!%20Adorei%20a%20proposta%20e%20quero%20fechar%20minha%20data.", "_blank");
                            }}
                            className="bg-primary text-primary-foreground text-lg px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Aceitar Proposta
                        </button>
                        <button
                            onClick={() => {
                                trackEvent("click_whatsapp_contact");
                                window.open("https://wa.me/5515997485268?text=Olá,%20Lucas!%20Tenho%20algumas%20dúvidas%20sobre%20a%20proposta.", "_blank");
                            }}
                            className="bg-secondary text-secondary-foreground text-lg px-8 py-4 rounded-full font-bold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Falar no WhatsApp
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
