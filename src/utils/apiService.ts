// Mock API endpoints for AI bot integration
// In a real app, these would connect to a backend database

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: {
    type: string;
    min: number;
    max: number;
    unit: string;
  };
  features: string[];
  aiCompatible: boolean;
}

export interface ContactRequest {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Mock services data
const services: Service[] = [
  {
    id: "3d-modeling",
    name: "3D BIM Modeling",
    description: "Precise 3D modeling with AI-powered quality assurance",
    category: "modeling",
    pricing: {
      type: "per_sqft",
      min: 0.50,
      max: 2.00,
      unit: "USD"
    },
    features: ["AI Quality Check", "Clash Detection", "LOD 300-500"],
    aiCompatible: true
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    description: "Automated clash detection and workflow optimization",
    category: "automation",
    pricing: {
      type: "fixed",
      min: 1500,
      max: 5000,
      unit: "USD"
    },
    features: ["Automated Workflows", "Smart Scheduling", "Progress Tracking"],
    aiCompatible: true
  },
  {
    id: "consulting",
    name: "BIM Consulting",
    description: "Expert guidance on BIM implementation and AI integration",
    category: "consulting",
    pricing: {
      type: "hourly",
      min: 150,
      max: 250,
      unit: "USD"
    },
    features: ["Strategic Planning", "AI Integration", "Training"],
    aiCompatible: true
  }
];

// API Functions that AI bots can use
export const apiService = {
  // Get all services
  getServices: (): Service[] => {
    return services;
  },

  // Get service by ID
  getService: (id: string): Service | null => {
    return services.find(service => service.id === id) || null;
  },

  // Search services by category or keyword
  searchServices: (query: string): Service[] => {
    const lowerQuery = query.toLowerCase();
    return services.filter(service => 
      service.name.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery) ||
      service.category.toLowerCase().includes(lowerQuery) ||
      service.features.some(feature => feature.toLowerCase().includes(lowerQuery))
    );
  },

  // Get pricing for a service
  getPricing: (serviceId: string): Service['pricing'] | null => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.pricing : null;
  },

  // Submit contact request (mock)
  submitContact: async (request: ContactRequest): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic validation
    if (!request.name || !request.email || !request.message) {
      return {
        success: false,
        message: "Missing required fields"
      };
    }

    // Mock successful submission
    console.log("Contact request submitted:", request);
    return {
      success: true,
      message: "Thank you! We'll respond within 24 hours."
    };
  },

  // Get company information for AI bots
  getCompanyInfo: () => ({
    name: "BIM Bot Boost",
    description: "AI-enhanced Building Information Modeling services for the AEC industry",
    specialties: ["Building Information Modeling", "AI Automation", "AEC Industry", "3D Modeling"],
    serviceAreas: ["United States", "Canada"],
    contact: {
      email: "info@bimbotboost.com",
      phone: "+1 (555) 123-4567"
    },
    capabilities: {
      aiIntegration: true,
      automatedWorkflows: true,
      realtimeCollaboration: true,
      cloudBased: true
    }
  })
};