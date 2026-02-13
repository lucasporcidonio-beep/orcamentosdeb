import { useParams } from "react-router-dom";
import { HeroSection } from "../components/proposal/HeroSection";
import { ImportanceSection } from "../components/proposal/ImportanceSection";
import { DifferentialSection } from "../components/proposal/DifferentialSection";
import { PackagesSection } from "../components/proposal/PackagesSection";
import { ComparisonTable } from "../components/proposal/ComparisonTable";
import { RealTimeCoverage } from "../components/proposal/RealTimeCoverage";
import { AddonsSection } from "../components/proposal/AddonsSection";
import { PaymentSection } from "../components/proposal/PaymentSection";
import { DecisionSection } from "../components/proposal/DecisionSection";
import { GallerySection } from "../components/proposal/GallerySection";

const Proposal = () => {
    const { clientSlug } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const eventDate = searchParams.get("data"); // Expects format like "15/12/2025" or "15 de Dezembro"

    // Helper to format client name from slug (e.g., "yasmin-cristine" -> "Yasmin Cristine")
    const clientName = clientSlug
        ? clientSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";

    return (
        <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
            <HeroSection clientName={clientName} eventDate={eventDate} />
            <ImportanceSection />
            <DifferentialSection />
            <GallerySection />

            <PackagesSection />
            <ComparisonTable />
            <RealTimeCoverage />

            <AddonsSection />
            <PaymentSection />
            <DecisionSection />
        </div>
    );
};

export default Proposal;
