import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "About Us", path: "/about" },
    { name: "Sectors & Skills", path: "/sectors" },
    { name: "Learning Model", path: "/learning" },
    { name: "Career Roadmaps", path: "/roadmaps" },
  ],
  resources: [
    { name: "Join as Learner", path: "/contact" },
    { name: "Become a Trainer", path: "/contact" },
    { name: "Partner with Us", path: "/contact" },
    { name: "FAQs", path: "/contact" },
  ],
  sectors: [
    { name: "IT & Software", path: "/sectors" },
    { name: "Healthcare", path: "/sectors" },
    { name: "Manufacturing", path: "/sectors" },
    { name: "View All", path: "/sectors" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-semibold text-lg">FutureSkills</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering individuals across all sectors with the skills they need for tomorrow's jobs. 
              Join our mission to build a future-ready workforce.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>hello@futureskills.org</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>1800-SKILLS-NOW</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Pan-India Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} FutureSkills Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
