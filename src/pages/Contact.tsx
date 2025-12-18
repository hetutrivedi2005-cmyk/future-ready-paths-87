import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  Building2,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const userTypes = [
  {
    id: "learner",
    icon: GraduationCap,
    title: "Join as Learner",
    description: "Start your reskilling journey with personalized courses and certifications.",
  },
  {
    id: "trainer",
    icon: Users,
    title: "Become a Trainer",
    description: "Share your expertise and help others grow. Join our network of industry trainers.",
  },
  {
    id: "partner",
    icon: Building2,
    title: "Partner with Us",
    description: "Collaborate as an employer, training center, or government agency.",
  },
];

const faqs = [
  {
    question: "Who can join the platform?",
    answer: "Anyone looking to upskill or reskill — students, working professionals, gig workers, homemakers returning to work, and rural workforce. Our programs cater to all educational backgrounds.",
  },
  {
    question: "Are the certifications recognized?",
    answer: "Yes, our certifications are aligned with industry standards and recognized by employers across sectors. Many programs are also aligned with government skill missions.",
  },
  {
    question: "How much do courses cost?",
    answer: "We offer a range of pricing options, including free foundational courses, subsidized programs for eligible learners, and premium certifications. Financial assistance is available.",
  },
  {
    question: "Can I learn in my regional language?",
    answer: "Yes! We support multiple Indian languages including Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and Gujarati, with more being added regularly.",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState("learner");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you within 24-48 hours.",
    });
    setFormData({ name: "", email: "", phone: "", sector: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Join the Movement
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're looking to learn, teach, or partner with us — 
              there's a place for you in building India's future-ready workforce.
            </p>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-4">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-xl text-left transition-all ${
                  selectedType === type.id
                    ? "bg-primary text-primary-foreground ring-2 ring-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <type.icon
                  className={`h-8 w-8 mb-3 ${
                    selectedType === type.id ? "text-primary-foreground" : "text-primary"
                  }`}
                />
                <h3 className="font-semibold mb-1">{type.title}</h3>
                <p
                  className={`text-sm ${
                    selectedType === type.id
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {selectedType === "learner" && "Start Your Learning Journey"}
                {selectedType === "trainer" && "Apply as a Trainer"}
                {selectedType === "partner" && "Explore Partnership"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector of Interest</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, sector: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT & Software</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail & Sales</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="finance">Finance & Banking</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="creative">Creative & Media</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your goals, background, or questions..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Submit Application
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">hello@futureskills.org</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">1800-SKILLS-NOW (Toll-Free)</p>
                    <p className="text-sm text-muted-foreground">Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Visit Us</h4>
                    <p className="text-muted-foreground">Training centers across India</p>
                    <p className="text-sm text-muted-foreground">Find your nearest center</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">View available courses and sectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Check eligibility for subsidized programs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Download our mobile app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Join our community forums</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions about our platform.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-card rounded-xl border border-border/50 p-6"
              >
                <h3 className="font-semibold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
