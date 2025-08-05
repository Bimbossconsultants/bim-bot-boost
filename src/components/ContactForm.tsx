import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiService, type ContactRequest } from "@/utils/apiService";

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactRequest>({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = apiService.getServices();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await apiService.submitContact(formData);
      
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        setFormData({ name: "", email: "", service: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof ContactRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Get in touch for BIM services and AI integration consulting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium">
              Name *
            </label>
            <Input
              id="contact-name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email *
            </label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="your.email@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="contact-service" className="text-sm font-medium">
              Service Interest
            </label>
            <Select 
              value={formData.service} 
              onValueChange={(value) => updateFormData("service", value)}
            >
              <SelectTrigger id="contact-service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="contact-message" className="text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => updateFormData("message", e.target.value)}
              placeholder="Tell us about your project requirements..."
              rows={4}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};