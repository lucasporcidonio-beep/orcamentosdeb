import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { getProposalData } from "@/data/proposalData";
import { useParams } from "react-router-dom";

export const ComparisonTable = () => {
    const { clientSlug } = useParams();
    const data = getProposalData(clientSlug);
    const { packages } = data;

    // We need to map the features to rows dynamically or keep a static list of "comparable items"
    // and check if each package has it.
    // For simplicity and robustness, let's define the rows we want to compare 
    // and check against package features or specific properties.

    // Helper to check if a package has a feature
    const hasFeature = (pkgFeatures: string[], featureKeyword: string) => {
        return pkgFeatures.some(f => f.toLowerCase().includes(featureKeyword.toLowerCase()));
    };

    // Helper to get value for specific features like "Photos" or "Hours"
    const getFeatureValue = (pkgFeatures: string[], type: "hours" | "photos") => {
        if (type === "hours") {
            const match = pkgFeatures.find(f => f.includes("horas"));
            return match ? match.match(/\d+\s*horas?/i)?.[0] || "Sim" : "Não";
        }
        if (type === "photos") {
            const match = pkgFeatures.find(f => f.includes("fotos"));
            return match ? match.match(/\d+\s*a\s*\d+/)?.[0] || match?.match(/\d+/)?.[0] || "Sim" : "Não";
        }
        return "Não";
    };

    const rows = [
        { label: "Horas de Cobertura", type: "hours" },
        { label: "Fotos Digitais", type: "photos" },
        { label: "Ensaio Pré-Evento", keyword: "Ensaio" },
        { label: "Banner Personalizado", keyword: "Banner" },
        { label: "Quadro 60x40", keyword: "Quadro" },
        { label: "Álbum Fotolivro", keyword: "Álbum" },
        { label: "Vídeo Vida", keyword: "Vídeo" },
    ];

    // Organize packages by ID to easily map to columns if order matters, 
    // but packages array from data is already ordered.
    // We assume packages are [Constelação, Lua Cheia, Estrela Cadente] based on defaultData order.

    return (
        <section className="py-20 px-4">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
                    Compare os Detalhes
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="overflow-x-auto bg-card rounded-xl border border-border shadow-sm"
                >
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-foreground font-display">
                            <tr>
                                <th className="p-4 pl-6 font-bold">Item</th>
                                {packages.map(pkg => (
                                    <th key={pkg.id} className={`p-4 text-center font-bold ${pkg.highlight || pkg.recommended ? "text-primary" : "text-muted-foreground"}`}>
                                        {pkg.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 font-body">
                            {rows.map((row, index) => (
                                <tr key={index} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 pl-6 font-medium text-foreground">{row.label}</td>
                                    {packages.map(pkg => {
                                        let value: string | boolean = false;

                                        if (row.type) {
                                            // @ts-ignore
                                            value = getFeatureValue(pkg.features, row.type);
                                        } else if (row.keyword) {
                                            value = hasFeature(pkg.features, row.keyword);
                                        }

                                        return (
                                            <td key={pkg.id} className={`p-4 text-center ${typeof value === 'string' ? "text-foreground font-medium" : ""}`}>
                                                {typeof value === "boolean" ? (
                                                    value ? <Check className="w-5 h-5 mx-auto text-primary" /> : <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                                                ) : (
                                                    value
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
};
