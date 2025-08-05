import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-subtle py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI-Enhanced BIM Services
          </Badge>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            <span className="block">AI-Compatible</span>
            <span className="bg-gradient-ai bg-clip-text text-transparent">
              BIM Solutions
            </span>
            <span className="block">for Modern AEC</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Experience the future of Building Information Modeling with AI-enhanced services, 
            intelligent automation, and seamless integration with AI bots and agents.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="ai" size="lg" className="group">
              Start AI Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              View API Documentation
            </Button>
          </div>

          {/* AI Features preview */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 rounded-lg bg-card p-4 shadow-elegant">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI Chatbot Ready</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-card p-4 shadow-elegant">
              <Zap className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Automated Workflows</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-card p-4 shadow-elegant">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Schema Markup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};