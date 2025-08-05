import { ContactForm } from "@/components/ContactForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <article className="text-center mb-16">
          <header>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              BIM Bot Boost
            </h1>
            <h2 className="text-xl text-muted-foreground mb-8">
              AI-Enhanced Building Information Modeling Services
            </h2>
          </header>
          
          <section className="space-y-6">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional BIM consulting services enhanced with artificial intelligence 
              to streamline your AEC workflows and improve project outcomes.
            </p>
          </section>
        </article>

        {/* Services Grid */}
        <section className="mb-16" aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-2xl font-bold text-center mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold mb-2">3D BIM Modeling</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Precise 3D modeling with AI-powered quality assurance
              </p>
              <div className="text-xs text-muted-foreground">
                Starting at $0.50/sq ft
              </div>
            </article>
            <article className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold mb-2">AI Automation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Automated clash detection and workflow optimization
              </p>
              <div className="text-xs text-muted-foreground">
                $1,500 - $5,000 per project
              </div>
            </article>
            <article className="p-6 bg-card rounded-lg border border-border">
              <h3 className="font-semibold mb-2">BIM Consulting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Expert guidance on BIM implementation and AI integration
              </p>
              <div className="text-xs text-muted-foreground">
                $150 - $250 per hour
              </div>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-bold mb-8">
            Get Started Today
          </h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
};

export default Index;
