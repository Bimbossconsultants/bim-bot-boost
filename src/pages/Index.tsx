import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AICompatibilityDemo } from "@/components/AICompatibilityDemo";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <section id="ai-features" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              AI Compatibility Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how we've made BIM services compatible with AI bots, agents, and automated systems
            </p>
          </div>
          <AICompatibilityDemo />
        </div>
      </section>

      <ServicesSection />
      <ContactSection />
      
      {/* Structured Data for AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "BimBoss AI-Enhanced Services",
            "description": "AI-compatible BIM consulting and automation services",
            "serviceType": "Building Information Modeling",
            "areaServed": ["United States", "Canada", "United Kingdom"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI-Enhanced BIM Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI-Enhanced BIM Modeling",
                    "description": "3D modeling with AI-powered quality checks"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Implementation Consulting",
                    "description": "Help integrate AI bots with BIM workflows"
                  }
                }
              ]
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "Customer Service",
              "email": "ai@bimboss.com"
            }
          })
        }}
      />
    </div>
  );
};

export default Index;
