import { useState } from "react";
import { defaultData, Package } from "@/data/proposalData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Admin() {
    const [clientName, setClientName] = useState("");
    const [eventDate, setEventDate] = useState("");
    // We start with default packages and allow editing
    const [packages, setPackages] = useState<Package[]>(defaultData.packages);
    const [generatedLink, setGeneratedLink] = useState("");

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

    const generateLink = () => {
        if (!clientName) {
            toast.error("Por favor, insira o nome da cliente.");
            return;
        }

        const slug = clientName.toLowerCase().replace(/\s+/g, "-");

        // Prepare overrides object
        // We only want to send the packages array if it's different (or just send it anyway for simplicity)
        const overrides = {
            packages: packages
        };

        // Encode to Base64 (UTF-8 safe)
        const configString = btoa(unescape(encodeURIComponent(JSON.stringify(overrides))));

        const baseUrl = window.location.origin;
        let url = `${baseUrl}/proposta/${slug}?config=${configString}`;

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
                                    <div className="grid gap-4 md:grid-cols-2">
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
                                            className="font-mono text-sm bg-white"
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
