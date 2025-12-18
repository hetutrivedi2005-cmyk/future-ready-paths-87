import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, ChevronRight } from "lucide-react";

const roadmaps = [
  {
    sector: "IT & Software",
    color: "bg-blue-500",
    levels: [
      { level: "Entry", roles: ["Computer Basics", "Data Entry Operator", "IT Support"], duration: "2-3 months" },
      { level: "Skilled", roles: ["Junior Developer", "QA Tester", "Tech Support Lead"], duration: "4-6 months" },
      { level: "Advanced", roles: ["Full-Stack Developer", "DevOps Engineer", "Data Analyst"], duration: "6-12 months" },
      { level: "Expert", roles: ["Solution Architect", "Tech Lead", "AI/ML Engineer"], duration: "Ongoing" },
    ],
  },
  {
    sector: "Manufacturing",
    color: "bg-orange-500",
    levels: [
      { level: "Entry", roles: ["Machine Operator Helper", "Assembly Line Worker", "Quality Checker"], duration: "1-2 months" },
      { level: "Skilled", roles: ["CNC Operator", "Welder", "Quality Technician"], duration: "3-6 months" },
      { level: "Advanced", roles: ["Production Supervisor", "Quality Manager", "Maintenance Engineer"], duration: "6-12 months" },
      { level: "Expert", roles: ["Plant Manager", "Operations Head", "Industrial Consultant"], duration: "Ongoing" },
    ],
  },
  {
    sector: "Healthcare",
    color: "bg-green-500",
    levels: [
      { level: "Entry", roles: ["Healthcare Assistant", "Ward Boy/Aayi", "Reception Staff"], duration: "1-3 months" },
      { level: "Skilled", roles: ["Nursing Assistant", "Lab Technician", "Pharmacy Assistant"], duration: "6-12 months" },
      { level: "Advanced", roles: ["Senior Nurse", "Medical Records Specialist", "Diagnostic Tech"], duration: "1-2 years" },
      { level: "Expert", roles: ["Department Head", "Healthcare Administrator", "Clinical Trainer"], duration: "Ongoing" },
    ],
  },
  {
    sector: "Retail & Sales",
    color: "bg-purple-500",
    levels: [
      { level: "Entry", roles: ["Sales Associate", "Cashier", "Stock Clerk"], duration: "1-2 months" },
      { level: "Skilled", roles: ["Senior Sales Exec", "Visual Merchandiser", "Customer Service Lead"], duration: "3-6 months" },
      { level: "Advanced", roles: ["Store Manager", "Area Sales Manager", "E-commerce Manager"], duration: "6-12 months" },
      { level: "Expert", roles: ["Regional Director", "Retail Operations Head", "Brand Manager"], duration: "Ongoing" },
    ],
  },
];

export default function Roadmaps() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Career Roadmaps
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Visualize your path from beginner to expert. Our sector-wise roadmaps show you exactly 
              what skills to build and what roles you can achieve at each stage of your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Philosophy */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Progressive Growth</h3>
                <p className="text-sm text-muted-foreground">Build skills step-by-step</p>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-border" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Clear Milestones</h3>
                <p className="text-sm text-muted-foreground">Know what comes next</p>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-border" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Lifelong Learning</h3>
                <p className="text-sm text-muted-foreground">Growth never stops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmaps */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12">
            {roadmaps.map((roadmap) => (
              <div key={roadmap.sector} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <div className={`${roadmap.color} px-6 py-4`}>
                  <h2 className="text-xl font-bold text-white">{roadmap.sector}</h2>
                </div>
                <div className="p-6">
                  {/* Desktop View */}
                  <div className="hidden lg:flex items-stretch gap-4">
                    {roadmap.levels.map((level, index) => (
                      <div key={level.level} className="flex-1 flex items-stretch">
                        <div className="flex-1 bg-muted/50 rounded-xl p-4 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`h-2 w-2 rounded-full ${roadmap.color}`} />
                            <span className="font-semibold text-foreground">{level.level}</span>
                          </div>
                          <ul className="space-y-2 mb-4">
                            {level.roles.map((role) => (
                              <li key={role} className="text-sm text-muted-foreground">
                                {role}
                              </li>
                            ))}
                          </ul>
                          <span className="text-xs text-primary font-medium">{level.duration}</span>
                        </div>
                        {index !== roadmap.levels.length - 1 && (
                          <div className="flex items-center px-2">
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile View */}
                  <div className="lg:hidden space-y-4">
                    {roadmap.levels.map((level, index) => (
                      <div key={level.level}>
                        <div className="bg-muted/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${roadmap.color}`} />
                              <span className="font-semibold text-foreground">{level.level}</span>
                            </div>
                            <span className="text-xs text-primary font-medium">{level.duration}</span>
                          </div>
                          <ul className="space-y-1">
                            {level.roles.map((role) => (
                              <li key={role} className="text-sm text-muted-foreground">
                                • {role}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {index !== roadmap.levels.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Sectors */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Roadmaps for Every Sector
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We offer detailed career roadmaps for all 12+ sectors on our platform. 
            Explore the paths available in logistics, agriculture, finance, hospitality, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="gap-2">
              <Link to="/sectors">
                View All Sectors <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Get Personalized Guidance</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lifelong Learning */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your Journey Doesn't End
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              The future of work demands continuous learning. Our platform supports you through 
              every career transition with updated courses, new certifications, and ongoing mentorship.
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link to="/contact">
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
