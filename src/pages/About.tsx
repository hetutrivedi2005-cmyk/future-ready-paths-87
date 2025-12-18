import { Layout } from "@/components/Layout";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Users,
  Globe,
  Award,
  TrendingUp,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
} from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "Bridge the Skill Gap",
    description: "Address the critical mismatch between current workforce skills and evolving job requirements across all sectors.",
  },
  {
    icon: Users,
    title: "Inclusive Reskilling",
    description: "Serve everyone — tech professionals, blue-collar workers, gig economy participants, and rural communities.",
  },
  {
    icon: Globe,
    title: "Accessible Learning",
    description: "Deliver training in multiple languages and formats to reach underserved populations effectively.",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Partner with employers to ensure our credentials translate directly into job opportunities.",
  },
];

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "Every decision we make centers on improving the lives of learners and their families.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously evolve our methods to leverage the latest in learning science and technology.",
  },
  {
    icon: Shield,
    title: "Quality",
    description: "We maintain rigorous standards to ensure every course delivers real-world value.",
  },
  {
    icon: TrendingUp,
    title: "Impact",
    description: "We measure success by the tangible career outcomes of our learners.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About FutureSkills Platform
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're on a mission to democratize workforce reskilling, ensuring that every Indian worker — 
              regardless of their background, location, or current profession — has access to the skills 
              needed for meaningful employment in the rapidly evolving economy.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-card border-y border-border/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Challenge We're Solving
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The world of work is transforming faster than ever. Automation, artificial intelligence, 
                  and digital transformation are reshaping job requirements across every sector — from 
                  IT and manufacturing to agriculture and healthcare.
                </p>
                <p>
                  Yet, most existing upskilling programs focus narrowly on technology roles, leaving 
                  millions of workers in traditional sectors without pathways to adapt and thrive.
                </p>
                <p>
                  <strong className="text-foreground">The result?</strong> A widening skill gap that 
                  threatens livelihoods, limits economic mobility, and holds back India's growth potential.
                </p>
              </div>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8">
              <h3 className="font-semibold text-foreground mb-4">Key Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">65%</strong> of jobs that today's students will do don't exist yet
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">375 million</strong> workers globally may need to switch occupations by 2030
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">54%</strong> of employees need significant reskilling
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Only 2.3%</strong> of India's workforce is formally skilled
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To create an inclusive, scalable platform that equips workers from every sector with 
              future-ready skills, driving economic empowerment and national growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {missionPoints.map((point) => (
              <div key={point.title} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <FeatureCard {...point} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from course design to learner support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Whether you're looking to upskill, train others, or partner with us — 
              there's a place for you in the FutureSkills community.
            </p>
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link to="/contact">
                Get Involved <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
