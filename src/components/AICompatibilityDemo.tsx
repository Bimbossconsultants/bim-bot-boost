import { useState } from "react";
import { Bot, Brain, Database, MessageSquare, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "demo" | "coming-soon";
}

const aiFeatures: AIFeature[] = [
  {
    id: "chatbot",
    title: "AI Chatbot Integration",
    description: "Intelligent conversation system trained on BIM expertise",
    icon: <MessageSquare className="h-5 w-5" />,
    status: "active"
  },
  {
    id: "api",
    title: "AI-Ready APIs",
    description: "Structured endpoints for AI agents to access services and data",
    icon: <Database className="h-5 w-5" />,
    status: "active"
  },
  {
    id: "schema",
    title: "Structured Data Markup",
    description: "Schema.org markup for better AI understanding",
    icon: <Search className="h-5 w-5" />,
    status: "active"
  },
  {
    id: "automation",
    title: "Process Automation",
    description: "AI-driven workflow automation for BIM projects",
    icon: <Zap className="h-5 w-5" />,
    status: "demo"
  },
  {
    id: "intelligence",
    title: "AI Analytics",
    description: "Intelligent insights from project data",
    icon: <Brain className="h-5 w-5" />,
    status: "coming-soon"
  },
  {
    id: "assistant",
    title: "AI Project Assistant",
    description: "Virtual assistant for project management",
    icon: <Bot className="h-5 w-5" />,
    status: "coming-soon"
  }
];

export const AICompatibilityDemo = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("/api/services");
  const { toast } = useToast();

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    toast({
      title: "AI Response",
      description: "BIM AI Assistant: I can help you with modeling, analysis, and project planning. What specific BIM challenge can I assist with?",
      duration: 5000,
    });
    setChatMessage("");
  };

  const handleApiTest = () => {
    toast({
      title: "API Response",
      description: `Mock response from ${apiEndpoint} - Structured data ready for AI consumption`,
      duration: 3000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent";
      case "demo": return "bg-primary";
      case "coming-soon": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Live";
      case "demo": return "Demo";
      case "coming-soon": return "Coming Soon";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiFeatures.map((feature) => (
          <Card key={feature.id} className="hover:shadow-elegant transition-all duration-300 border-muted">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </div>
                <Badge variant="secondary" className={getStatusColor(feature.status)}>
                  {getStatusText(feature.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Demos */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Integration Demos
          </CardTitle>
          <CardDescription>
            Interactive examples of AI-compatible features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chatbot" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
              <TabsTrigger value="api">API Testing</TabsTrigger>
              <TabsTrigger value="schema">Structured Data</TabsTrigger>
            </TabsList>

            <TabsContent value="chatbot" className="mt-6">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">AI Assistant:</p>
                  <p>Hello! I'm the BIM AI Assistant. I can help with modeling questions, project planning, and technical consultations. How can I assist you today?</p>
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask about BIM services, pricing, or technical questions..."
                    className="flex-1"
                  />
                  <Button type="submit" variant="ai">
                    Send
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="/api/endpoint"
                    className="flex-1"
                  />
                  <Button onClick={handleApiTest} variant="tech">
                    Test API
                  </Button>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <pre className="text-sm">
{`{
  "services": [
    {
      "id": "bim-modeling",
      "name": "BIM 3D Modeling",
      "description": "Comprehensive BIM modeling services",
      "pricing": {
        "type": "per_sqft",
        "range": "$0.50-$2.00"
      },
      "ai_compatible": true,
      "automation_level": "high"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schema" className="mt-6">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Schema.org Markup Example:</p>
                  <pre className="text-xs overflow-x-auto">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "BimBoss AI-Enhanced Services",
  "description": "AI-compatible BIM consulting",
  "serviceType": "Building Information Modeling",
  "areaServed": ["USA", "Canada", "UK"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "BIM Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "3D BIM Modeling"
        }
      }
    ]
  }
}
</script>`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};