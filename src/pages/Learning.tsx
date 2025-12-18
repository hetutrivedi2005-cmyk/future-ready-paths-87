import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Route,
  BookOpen,
  Wrench,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const learningSteps = [
  {
    step: 1,
    icon: Search,
    title: "Skill Gap Assessment",
    description: "Take our AI-powered assessment to identify your current skills and discover gaps relative to your career goals.",
    details: [
      "Comprehensive skill evaluation",
      "Industry-aligned benchmarks",
      "Personalized gap analysis report",
      "Career goal mapping",
    ],
  },
  {
    step: 2,
    icon: Route,
    title: "Personalized Learning Path",
    description: "Receive a customized curriculum designed around your goals, background, and available time commitment.",
    details: [
      "AI-recommended courses",
      "Flexible scheduling options",
      "Prerequisite skill building",
      "Progress milestones",
    ],
  },
  {
    step: 3,
    icon: BookOpen,
    title: "Modular Training",
    description: "Learn through bite-sized modules that fit your schedule — available in short-term and long-term formats.",
    details: [
      "Micro-learning modules",
      "Video & interactive content",
      "Multi-language support",
      "Mobile-friendly access",
    ],
  },
  {
    step: 4,
    icon: Wrench,
    title: "Hands-On Practice",
    description: "Apply your learning through projects, simulations, and real-world exercises that build practical expertise.",
    details: [
      "Industry projects",
      "Virtual labs & simulations",
      "Case study analysis",
      "Portfolio building",
    ],
  },
  {
    step: 5,
    icon: Award,
    title: "Certifications & Credentials",
    description: "Earn industry-recognized certifications that validate your skills and enhance your employability.",
    details: [
      "Sector-specific certificates",
      "Government-recognized credentials",
      "Digital badges",
      "Verification system",
    ],
  },
  {
    step: 6,
    icon: Users,
    title: "Career Guidance & Mentorship",
    description: "Get ongoing support from mentors and career counselors to navigate your professional journey.",
    details: [
      "1-on-1 mentoring sessions",
      "Career counseling",
      "Job placement support",
      "Alumni network access",
    ],
  },
];

const formats = [
  {
    title: "Online Self-Paced",
    description: "Learn anytime, anywhere with our digital platform. Ideal for working professionals.",
    features: ["24/7 access", "Mobile app", "Download for offline"],
  },
  {
    title: "Live Virtual Classes",
    description: "Engage with instructors and peers in scheduled online sessions.",
    features: ["Real-time interaction", "Q&A sessions", "Recorded replays"],
  },
  {
    title: "In-Person Training",
    description: "Hands-on training at our partner centers across India.",
    features: ["Practical workshops", "Lab access", "Peer networking"],
  },
  {
    title: "Hybrid Programs",
    description: "Combine online theory with in-person practical sessions.",
    features: ["Flexible scheduling", "Best of both", "Industry visits"],
  },
];

export default function Learning() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Learning Model
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A proven 6-step methodology that takes you from skill identification to career success, 
              with personalized support at every stage of your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {learningSteps.map((item, index) => (
                <div
                  key={item.step}
                  className={`relative flex gap-6 ${
                    index !== learningSteps.length - 1 ? "pb-8" : ""
                  }`}
                >
                  {/* Connector Line */}
                  {index !== learningSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  {/* Step Number */}
                  <div className="shrink-0 relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {item.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Formats */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Flexible Learning Formats
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the learning style that fits your lifestyle. All formats deliver the same 
              quality content with industry-recognized credentials.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formats.map((format) => (
              <div
                key={format.title}
                className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{format.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{format.description}</p>
                <ul className="space-y-2">
                  {format.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Learning in Your Language
              </h2>
              <p className="text-muted-foreground mb-6">
                We believe language should never be a barrier to learning. Our courses are available 
                in multiple regional languages with plans to expand coverage continuously.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Gujarati"].map(
                  (lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 bg-card rounded-full text-sm font-medium"
                    >
                      {lang}
                    </span>
                  )
                )}
              </div>
              <Button asChild className="gap-2">
                <Link to="/contact">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
