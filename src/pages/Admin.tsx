import { useState } from "react";
import { defaultData, Package } from "@/data/proposalData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { encode } from "js-base64";

// Obfuscation mapping for digits
const digitMap: Record<string, string> = {
    '0': 'x', '1': 'm', '2': 'q', '3': 'p', '4': 'v',
    '5': 'l', '6': 'k', '7': 'h', '8': 'w', '9': 'z',
    '-': 'a', '_': 'j'
};

export default function Admin() {
    const [clientName, setClientName] = useState("");
    const [eventDate, setEventDate] = useState("");
    // We start with default packages and allow editing
    const [packages, setPackages] = useState<Package[]>(defaultData.packages);
    const [generatedLink, setGeneratedLink] = useState("");

    const availableFeatures = [
        "Cobertura fotográfica até 5 horas",
        "Cobertura fotográfica até 4 horas",
        "Ensaio fotográfico pré-evento",
        "250 a 300 fotos digitais alta resolução",
        "200 a 250 fotos digitais alta resolução",
        "150 a 200 fotos digitais alta resolução",
        "Quadro 60x40",
        "Banner personalizado",
        "Banner 90x60",
        "Álbum Fotolivro 360° (20x20, 30 pág)",
        "Álbum 25x25 (30 páginas)",
        "Álbum 30x30 (30 páginas)",
        "(Bônus) Vídeo Vida",
        "Filmmaker",
        "Storymaker",
        "Fotos Impressas",
        "Pack 10 Fotos",
        "Pack 30 Fotos"
    ];

    const handlePriceChange = (index: number, newPrice: string) => {
        const updatedPackages = [...packages];
        updatedPackages[index].price = Number(newPrice);
        setPackages(updatedPackages);
    };

    const handleInstallmentValueChange = (index: number, newValue: string) => {
        const updatedPackages = [...packages];
        updatedPackages[index].installments.value = Number(newValue);
        setPackages(updatedPackages);
    };

    const handleFeatureToggle = (pkgIndex: number, feature: string) => {
        const updatedPackages = [...packages];
        const currentFeatures = updatedPackages[pkgIndex].features || [];

        if (currentFeatures.includes(feature)) {
            updatedPackages[pkgIndex].features = currentFeatures.filter(f => f !== feature);
        } else {
            updatedPackages[pkgIndex].features = [...currentFeatures, feature];
        }

        // Remove the default "Montado sob medida..." placeholder if they start adding real features
        if (updatedPackages[pkgIndex].features.includes("Montado sob medida para o seu evento") && updatedPackages[pkgIndex].features.length > 1) {
            updatedPackages[pkgIndex].features = updatedPackages[pkgIndex].features.filter(f => f !== "Montado sob medida para o seu evento");
        }

        setPackages(updatedPackages);
    };

    const generateLink = () => {
        if (!clientName) {
            toast.error("Por favor, insira o nome da cliente.");
            return;
        }

        const slug = clientName.toLowerCase().replace(/\s+/g, "-");

        // Format and obfuscate the short URL string
        const rawValues = packages.map(pkg => `${pkg.price}-${pkg.installments.value}`).join('_');

        // Convert digits to letters using digitMap
        const mappedLetters = rawValues.split('').map(char => digitMap[char] || char).join('');

        // Base64 encode it completely to hide our custom mapping
        const pValues = encode(mappedLetters);

        const baseUrl = window.location.origin;
        let url = `${baseUrl}/proposta/${slug}?p=${pValues}`;

        // Add custom features for the 4th package (Personalizado)
        if (packages.length >= 4 && packages[3].id === "personalizado") {
            const customFeaturesStr = JSON.stringify(packages[3].features);
            // double encode to hide the JSON structure safely
            const cfParam = encode(unescape(encodeURIComponent(customFeaturesStr)));
            url += `&cf=${cfParam}`;
        }

        if (eventDate) {
            const formattedDate = new Date(eventDate).toLocaleDateString("pt-BR");
            url += `&data=${encodeURIComponent(formattedDate)}`;
        }

        setGeneratedLink(url);
        toast.success("Link gerado com sucesso!");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        toast.success("Link copiado para a área de transferência!");
    };

    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4">
            <div className="container max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold font-display text-primary">Gerador de Propostas</h1>
                    <Link to="/" className="text-sm text-foreground hover:underline">Voltar ao Início</Link>
                </div>

                <div className="grid gap-8">
                    {/* Client Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Dados da Cliente</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome da Debutante</Label>
                                <Input
                                    id="name"
                                    placeholder="Ex: Maria Silva"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Data do Evento (Opcional)</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Packages Configuration */}
                    <Card>
                        <CardHeader>
                            <CardTitle>2. Personalizar Valores dos Pacotes</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {packages.map((pkg, index) => (
                                <div key={pkg.id} className="p-4 border rounded-lg bg-card/50">
                                    <h3 className="font-bold text-lg mb-4 text-primary">{pkg.name}</h3>
                                    <div className="grid gap-4 md:grid-cols-2 mb-4">
                                        <div className="space-y-2">
                                            <Label>Preço à Vista (R$)</Label>
                                            <Input
                                                type="number"
                                                value={pkg.price}
                                                onChange={(e) => handlePriceChange(index, e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Valor da Parcela (12x)</Label>
                                            <Input
                                                type="number"
                                                value={pkg.installments.value}
                                                onChange={(e) => handleInstallmentValueChange(index, e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {pkg.id === "personalizado" && (
                                        <div className="mt-6 pt-6 border-t border-border">
                                            <Label className="mb-4 block text-md">Selecionar Itens do Pacote Personalizado:</Label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {availableFeatures.map(feature => (
                                                    <label key={feature} className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded hover:bg-muted/50">
                                                        <div className="relative flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-background checked:bg-primary checked:border-primary"
                                                                checked={(pkg.features || []).includes(feature)}
                                                                onChange={() => handleFeatureToggle(index, feature)}
                                                            />
                                                            <Check className="absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" strokeWidth={3} />
                                                        </div>
                                                        <span className="leading-tight">{feature}</span>
                                                    </label>
                                                ))}
                                            </div>

                                            {/* Custom features added that aren't in the default list */}
                                            {(pkg.features || []).filter(f => !availableFeatures.includes(f) && f !== "Montado sob medida para o seu evento").map(customFeat => (
                                                <div key={customFeat} className="flex items-center gap-2 mt-2 text-sm p-2 rounded bg-primary/10 border border-primary/20">
                                                    <div className="relative flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-background checked:bg-primary checked:border-primary"
                                                            checked={true}
                                                            onChange={() => handleFeatureToggle(index, customFeat)}
                                                        />
                                                        <Check className="absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" strokeWidth={3} />
                                                    </div>
                                                    <span className="leading-tight flex-1">{customFeat}</span>
                                                </div>
                                            ))}

                                            <div className="mt-4 pt-4 border-t border-border/50">
                                                <Label className="mb-2 block text-sm">Adicionar Item Personalizado Exclusivo:</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Ex: Making Of Extra (R$ 800)"
                                                        id={`custom-feature-input-${index}`}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                const val = e.currentTarget.value.trim();
                                                                if (val) {
                                                                    handleFeatureToggle(index, val);
                                                                    e.currentTarget.value = "";
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={(e) => {
                                                            const input = document.getElementById(`custom-feature-input-${index}`) as HTMLInputElement;
                                                            if (input && input.value.trim()) {
                                                                handleFeatureToggle(index, input.value.trim());
                                                                input.value = "";
                                                            }
                                                        }}
                                                    >
                                                        Adicionar
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">*Digite um serviço e o valor que desejar, depois clique em Adicionar (ou pressione Enter).</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Action */}
                    <div className="flex flex-col gap-4">
                        <Button
                            size="lg"
                            className="w-full text-lg font-bold py-8"
                            onClick={generateLink}
                        >
                            <LinkIcon className="mr-2 w-5 h-5" />
                            Gerar Link Personalizado
                        </Button>

                        {generatedLink && (
                            <Card className="bg-primary/5 border-primary">
                                <CardContent className="p-6">
                                    <Label className="mb-2 block font-bold text-primary">Link Gerado:</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={generatedLink}
                                            readOnly
                                            className="font-mono text-sm bg-background text-foreground"
                                        />
                                        <Button onClick={copyToClipboard} variant="outline">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        *Este link contém as configurações salvas. Envie para a cliente e ela verá os valores que você definiu acima.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
