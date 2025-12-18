import { Layout } from "@/components/Layout";
import { SectorCard } from "@/components/SectorCard";
import {
  Code,
  Factory,
  Stethoscope,
  ShoppingCart,
  Truck,
  Leaf,
  Building2,
  GraduationCap,
  Palette,
  Hotel,
  MessageSquare,
  Smartphone,
} from "lucide-react";

const sectors = [
  {
    icon: Code,
    title: "IT & Software",
    description: "Build skills in programming, web development, data science, cloud computing, and cybersecurity for the digital economy.",
    skills: ["Web Development", "Python/Java", "Data Analytics", "Cloud Computing", "Cybersecurity"],
  },
  {
    icon: Factory,
    title: "Manufacturing & Industrial Skills",
    description: "Master modern manufacturing including automation, quality control, CNC operations, and Industry 4.0 technologies.",
    skills: ["CNC Operations", "Quality Control", "Industrial IoT", "Welding & Fabrication", "Lean Manufacturing"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare & Care Services",
    description: "Develop competencies in patient care, medical technology, healthcare administration, and allied health services.",
    skills: ["Patient Care", "Medical Records", "Lab Technician", "Pharmacy Assistant", "Elder Care"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & Sales",
    description: "Excel in customer service, e-commerce operations, visual merchandising, and modern retail management.",
    skills: ["Customer Service", "E-commerce", "Visual Merchandising", "POS Systems", "Inventory Management"],
  },
  {
    icon: Truck,
    title: "Logistics & Supply Chain",
    description: "Learn warehouse management, fleet operations, supply chain optimization, and last-mile delivery systems.",
    skills: ["Warehouse Operations", "Fleet Management", "Supply Chain", "Inventory Systems", "Last-Mile Delivery"],
  },
  {
    icon: Leaf,
    title: "Agriculture",
    description: "Adopt modern farming techniques, agri-tech solutions, organic practices, and agricultural business management.",
    skills: ["Precision Farming", "Agri-Tech", "Organic Farming", "Post-Harvest", "Agri-Business"],
  },
  {
    icon: Building2,
    title: "Finance & Banking",
    description: "Build expertise in financial services, banking operations, fintech applications, and accounting fundamentals.",
    skills: ["Banking Operations", "Financial Analysis", "GST & Taxation", "Fintech", "Insurance"],
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description: "Develop teaching skills, instructional design capabilities, ed-tech proficiency, and training facilitation.",
    skills: ["Teaching Methods", "Instructional Design", "Ed-Tech Tools", "Assessment", "Curriculum Development"],
  },
  {
    icon: Palette,
    title: "Creative & Media",
    description: "Master graphic design, video production, content creation, digital marketing, and social media management.",
    skills: ["Graphic Design", "Video Editing", "Content Writing", "Digital Marketing", "Social Media"],
  },
  {
    icon: Hotel,
    title: "Hospitality & Tourism",
    description: "Excel in hotel management, food service, travel operations, and customer experience in tourism.",
    skills: ["Hotel Operations", "Food & Beverage", "Tour Management", "Event Planning", "Guest Relations"],
  },
  {
    icon: MessageSquare,
    title: "Soft Skills & Communication",
    description: "Strengthen workplace communication, teamwork, problem-solving, and professional development skills.",
    skills: ["Communication", "Teamwork", "Problem Solving", "Time Management", "Leadership"],
  },
  {
    icon: Smartphone,
    title: "Digital & Financial Literacy",
    description: "Build foundational digital skills, online safety awareness, and financial management capabilities.",
    skills: ["Computer Basics", "Internet Safety", "Mobile Banking", "Digital Payments", "Personal Finance"],
  },
];

export default function Sectors() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Sectors & Skills
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform covers 12+ major sectors, ensuring that workers from every background — 
              technical or non-technical, urban or rural — can find relevant skills to advance their careers.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector) => (
              <SectorCard key={sector.title} {...sector} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Cutting Skills */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Cross-Cutting Skills for All
            </h2>
            <p className="text-muted-foreground mb-8">
              Regardless of your sector, these foundational skills enhance your employability and career growth.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Digital Literacy",
                "Communication",
                "Critical Thinking",
                "Adaptability",
                "Data Basics",
                "Financial Awareness",
                "Workplace Safety",
                "Environmental Consciousness",
                "Ethics & Integrity",
                "Customer Focus",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-card rounded-full text-sm font-medium border border-border hover:border-primary/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
