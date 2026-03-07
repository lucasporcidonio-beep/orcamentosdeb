export interface Package {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    installments: { count: number, value: number };
    features: string[];
    highlight: boolean;
    recommended: boolean;
    tag?: string;
}

export interface Addon {
    item: string;
    price: string; // Keeping as string for flexibility (e.g. "R$15 cada")
}

export interface ProposalData {
    packages: Package[];
    addons: Addon[];
    realTimeCoverage: {
        price: number;
        title: string;
        description: string;
    };
}

const defaultPackages: Package[] = [
    {
        id: "constelacao",
        name: "Constelação",
        subtitle: "Experiência Completa",
        price: 2499,
        installments: { count: 12, value: 249 },
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
        id: "lua_cheia",
        name: "Lua Cheia",
        subtitle: "Equilíbrio Ideal",
        price: 1699,
        installments: { count: 12, value: 169 },
        features: [
            "Cobertura fotográfica até 5 horas",
            "200 a 250 fotos digitais alta resolução",
            "Ensaio fotográfico pré-evento",
            "(Bônus) Banner personalizado",
        ],
        highlight: true,
        recommended: false,
        tag: "Mais Escolhido",
    },
    {
        id: "estrela_cadente",
        name: "Estrela Cadente",
        subtitle: "Essencial",
        price: 999,
        installments: { count: 12, value: 99 },
        features: [
            "Cobertura fotográfica até 4 horas",
            "150 a 200 fotos digitais alta resolução",
        ],
        highlight: false,
        recommended: false,
    },
];

const defaultAddons: Addon[] = [
    { item: "Quadro 60x40", price: "R$349" },
    { item: "Banner 90x60", price: "R$189" },
    { item: "Fotos Impressas", price: "R$15 cada" },
    { item: "Pack 10 Fotos", price: "R$120" },
    { item: "Pack 30 Fotos", price: "R$300" },
    { item: "Álbum 25x25 (30 páginas)", price: "R$999" },
    { item: "Álbum 30x30 (30 páginas)", price: "R$1299" },
    { item: "Vídeo Vida (Até 10 Min)", price: "R$150" },
];

export const defaultData: ProposalData = {
    packages: defaultPackages,
    addons: defaultAddons,
    realTimeCoverage: {
        price: 599,
        title: "Cobertura de Eventos em Tempo Real",
        description: "Cobertura em tempo real para que você e seus convidados compartilhem a magia instantaneamente.",
    }
};

// Define overrides for specific clients here
// Key = client slug (e.g. "yasmin-cristine")
const clientOverrides: Record<string, Partial<ProposalData>> = {
    "maria-eduarda": {
        packages: defaultPackages.map(p => p.id === "constelacao" ? { ...p, price: 1800, installments: { count: 12, value: 180 } } : p),
    }
};

import { decode } from "js-base64";

// Reverse mapping for obfuscation
const reverseMap: Record<string, string> = {
    'x': '0', 'm': '1', 'q': '2', 'p': '3', 'v': '4',
    'l': '5', 'k': '6', 'h': '7', 'w': '8', 'z': '9',
    'a': '-', 'j': '_'
};

export const getProposalData = (clientSlug?: string): ProposalData => {
    let data = { ...defaultData };

    // 1. Apply static client overrides (if defined in code)
    if (clientSlug && clientOverrides[clientSlug]) {
        data = { ...data, ...clientOverrides[clientSlug] };
    }

    // 2. Apply dynamic URL overrides
    if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);

        const shortConfig = searchParams.get("p");
        const configParam = searchParams.get("config");

        if (shortConfig) {
            try {
                // Decode from base64 first
                const decodedLetters = decode(shortConfig);

                // Unmap letters back to digits and separators
                const unmappedRaw = decodedLetters.split('').map(char => reverseMap[char] || char).join('');

                const packagePrices = unmappedRaw.split('_');
                const tempPackages = [...data.packages];
                packagePrices.forEach((priceStr, index) => {
                    if (index < tempPackages.length) {
                        const [price, install] = priceStr.split('-');
                        if (price && install) {
                            tempPackages[index] = {
                                ...tempPackages[index],
                                price: Number(price),
                                installments: { ...tempPackages[index].installments, value: Number(install) }
                            };
                        }
                    }
                });
                data.packages = tempPackages;
            } catch (e) {
                console.error("Failed to parse short config", e);
            }
        } else if (configParam) {
            try {
                // Try to decode as UTF-8 (new format)
                const decoded = decodeURIComponent(escape(atob(configParam)));
                const dynamicOverrides = JSON.parse(decoded);
                data = { ...data, ...dynamicOverrides };
            } catch (e) {
                // Fallback for legacy links (simple atob)
                try {
                    const decoded = atob(configParam);
                    const dynamicOverrides = JSON.parse(decoded);
                    data = { ...data, ...dynamicOverrides };
                } catch (e2) {
                    console.error("Failed to parse dynamic config", e2);
                }
            }
        }
    }

    return data;
};
