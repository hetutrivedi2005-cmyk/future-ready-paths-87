import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SectorCard } from "@/components/SectorCard";
import { StatCard } from "@/components/StatCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Factory,
  Stethoscope,
  ShoppingCart,
  Truck,
  Leaf,
  TrendingUp,
  Users,
  Award,
  Clock,
  Globe,
  Target,
  Sparkles,
} from "lucide-react";

const featuredSectors = [
  {
    icon: Code,
    title: "IT & Software",
    description: "From coding basics to advanced development skills for the digital economy.",
    skills: ["Web Development", "Data Analysis", "Cloud Computing"],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Modern industrial skills including automation and quality control.",
    skills: ["CNC Operations", "Quality Management", "Industrial IoT"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Essential skills for healthcare workers and care service providers.",
    skills: ["Patient Care", "Medical Records", "Health Technology"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & Sales",
    description: "Customer service, digital sales, and retail management expertise.",
    skills: ["Customer Service", "E-commerce", "Inventory Management"],
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Supply chain management and modern distribution skills.",
    skills: ["Warehouse Ops", "Fleet Management", "Supply Chain"],
  },
  {
    icon: Leaf,
    title: "Agriculture",
    description: "Modern farming techniques and agri-business management.",
    skills: ["Precision Farming", "Agri-Tech", "Sustainable Practices"],
  },
];

const benefits = [
  {
    icon: Target,
    title: "Personalized Learning Paths",
    description: "AI-powered skill gap analysis creates custom learning journeys tailored to your goals and current expertise.",
  },
  {
    icon: Clock,
    title: "Flexible Training Options",
    description: "Learn at your own pace with modular courses available online, offline, or in hybrid formats.",
  },
  {
    icon: Award,
    title: "Industry-Recognized Credentials",
    description: "Earn certifications valued by employers across sectors, boosting your employability.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Access courses in regional languages to ensure inclusive learning for all communities.",
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container-custom relative">
          <div className="py-20 md:py-32 lg:py-40 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Building India's Future-Ready Workforce</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
              Reskilling People for{" "}
              <span className="text-primary">Every Future Job</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-delay-1">
              A comprehensive platform empowering workers across all sectors — from technology 
              to agriculture, manufacturing to healthcare — with the skills needed for tomorrow's economy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
              <Button size="lg" asChild className="gap-2">
                <Link to="/contact">
                  Start Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/sectors">Explore Sectors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding bg-card border-y border-border/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              The Skill Gap Challenge
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Jobs across <strong>all sectors</strong> are transforming rapidly due to automation, 
              digital tools, and evolving industry practices. Workers from technical, non-technical, 
              blue-collar, and service backgrounds struggle to stay job-ready due to 
              <strong> skill mismatch</strong> and lack of accessible reskilling options.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatCard value="12+" label="Sectors Covered" />
            <StatCard value="500+" label="Skill Modules" />
            <StatCard value="50K+" label="Learners Enrolled" />
            <StatCard value="85%" label="Placement Success" />
          </div>
        </div>
      </section>

      {/* Featured Sectors */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Skills for Every Sector
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform covers diverse industries to ensure inclusive reskilling opportunities 
              for everyone — from tech professionals to rural workforce.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSectors.map((sector) => (
              <SectorCard key={sector.title} {...sector} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/sectors">
                View All Sectors <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-muted-foreground mb-8">
                We combine cutting-edge technology with human-centered design to deliver 
                impactful reskilling that actually works for real people with real jobs.
              </p>
              <div className="space-y-2">
                {benefits.map((benefit) => (
                  <FeatureCard key={benefit.title} {...benefit} />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-3xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">All Backgrounds</span>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-center text-center">
                    <TrendingUp className="h-8 w-8 text-accent mb-2" />
                    <span className="text-sm font-medium">Career Growth</span>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-center text-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Certifications</span>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col items-center text-center">
                    <Globe className="h-8 w-8 text-accent mb-2" />
                    <span className="text-sm font-medium">Multi-Language</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Future-Proof Your Career?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of learners already building skills for tomorrow. 
            Whether you're a student, professional, or gig worker — there's a path for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link to="/contact">
                Join as Learner <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact">Partner with Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
