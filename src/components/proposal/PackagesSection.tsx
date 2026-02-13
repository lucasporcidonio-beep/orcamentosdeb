import { Check } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
    {
        name: "Constelação",
        subtitle: "Experiência Completa",
        price: "1999",
        installments: "12x R$ 200",
        features: [
            "Cobertura fotográfica até 5 horas",
            "250 a 300 fotos digitais alta resolução",
            "Ensaio fotográfico pré-evento",
            "Quadro 60x40",
            "Álbum Fotolivro 360° (20x20, 30 pág)",
            "(Bônus) Vídeo Vida",
        ],
        highlight: false,
        recommended: true,
        tag: "Recomendado",
    },
    {
        name: "Lua Cheia",
        subtitle: "Equilíbrio Ideal",
        price: "1299",
        installments: "12x R$ 130",
        features: [
            "Cobertura fotográfica até 5 horas",
            "200 a 250 fotos digitais alta resolução",
            "Ensaio fotográfico pré-evento",
            "(Bônus) Banner personalizado",
        ],
        highlight: true,
        tag: "Mais Escolhido",
        recommended: false,
    },
    {
        name: "Estrela Cadente",
        subtitle: "Essencial",
        price: "699",
        installments: "12x R$ 70",
        features: [
            "Cobertura fotográfica até 4 horas",
            "150 a 200 fotos digitais alta resolução",
        ],
        highlight: false,
        recommended: false,
    },
];

export const PackagesSection = () => {
    return (
        <section id="packages" className="py-20 px-4 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                        Escolha como eternizar seu sonho
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Pacotes desenhados para diferentes necessidades, mantendo sempre a excelência.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 border ${pkg.recommended
                                    ? "bg-card border-primary shadow-2xl scale-105 z-10"
                                    : "bg-card/50 border-border shadow-lg"
                                }`}
                        >
                            {pkg.tag && (
                                <div
                                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase ${pkg.recommended
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground"
                                        }`}
                                >
                                    {pkg.tag}
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                                    {pkg.name}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-6">{pkg.subtitle}</p>
                                <div className="mb-2">
                                    <span className="text-sm align-top">R$</span>
                                    <span className="text-5xl font-bold text-foreground">
                                        {pkg.price}
                                    </span>
                                </div>
                                <p className="text-sm text-primary font-medium">
                                    {pkg.installments}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <Check className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-bold transition-all ${pkg.recommended
                                        ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                Escolher este pacote
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
