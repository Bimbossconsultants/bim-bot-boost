import { Building, Cpu, Database, FileText, Search, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  aiFeatures: string[];
  pricing: string;
  automation: "high" | "medium" | "low";
}

const services: Service[] = [
  {
    id: "bim-modeling",
    title: "AI-Enhanced BIM Modeling",
    description: "3D modeling with AI-powered quality checks and automated clash detection",
    icon: <Building className="h-6 w-6" />,
    aiFeatures: ["Automated clash detection", "AI quality validation", "Smart object recognition"],
    pricing: "$0.75-$2.50/sq ft",
    automation: "high"
  },
  {
    id: "ai-consultation",
    title: "AI Implementation Consulting",
    description: "Help integrate AI bots and agents with your BIM workflows",
    icon: <Cpu className="h-6 w-6" />,
    aiFeatures: ["Bot integration", "API development", "Workflow automation"],
    pricing: "$150-$250/hour",
    automation: "medium"
  },
  {
    id: "data-structuring",
    title: "Data Structuring for AI",
    description: "Convert legacy BIM data into AI-readable formats",
    icon: <Database className="h-6 w-6" />,
    aiFeatures: ["Schema.org markup", "API endpoints", "Structured data export"],
    pricing: "$500-$2000/project",
    automation: "high"
  },
  {
    id: "documentation",
    title: "AI-Generated Documentation",
    description: "Automated technical documentation from BIM models",
    icon: <FileText className="h-6 w-6" />,
    aiFeatures: ["Auto documentation", "Multi-format export", "Version control"],
    pricing: "$0.25-$0.75/sq ft",
    automation: "high"
  },
  {
    id: "seo-optimization",
    title: "AI Discoverability",
    description: "Optimize your BIM content for AI search and discovery",
    icon: <Search className="h-6 w-6" />,
    aiFeatures: ["SEO optimization", "Voice search ready", "Bot-friendly markup"],
    pricing: "$1000-$3000/site",
    automation: "medium"
  },
  {
    id: "automation",
    title: "Process Automation",
    description: "AI-driven automation of repetitive BIM tasks",
    icon: <Zap className="h-6 w-6" />,
    aiFeatures: ["Workflow automation", "Smart scheduling", "Progress tracking"],
    pricing: "$2000-$5000/setup",
    automation: "high"
  }
];

const getAutomationColor = (level: string) => {
  switch (level) {
    case "high": return "bg-accent text-accent-foreground";
    case "medium": return "bg-primary text-primary-foreground";
    case "low": return "bg-muted text-muted-foreground";
    default: return "bg-muted";
  }
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI-Enhanced BIM Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our services are designed to work seamlessly with AI bots, agents, and automated systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-elegant transition-all duration-300 border-muted">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {service.icon}
                  </div>
                  <Badge className={getAutomationColor(service.automation)}>
                    {service.automation} automation
                  </Badge>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">AI Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.aiFeatures.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="font-semibold text-primary">{service.pricing}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ai" size="lg">
            Get Custom AI Integration Quote
          </Button>
        </div>
      </div>
    </section>
  );
};