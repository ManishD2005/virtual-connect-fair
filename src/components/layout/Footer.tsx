
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-display text-xl font-medium mb-6">VirtualConnect</h3>
            <p className="text-muted-foreground mb-6">
              Connecting talent with opportunity in a dynamic virtual environment.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-6">For Job Seekers</h4>
            <FooterLinks
              links={[
                { name: 'Browse Employers', href: '/booths' },
                { name: 'Upcoming Events', href: '/events' },
                { name: 'Resume Resources', href: '/resources/resume' },
                { name: 'Career Advice', href: '/resources/career' },
              ]}
            />
          </div>

          <div>
            <h4 className="font-medium mb-6">For Employers</h4>
            <FooterLinks
              links={[
                { name: 'Create Virtual Booth', href: '/employers/create-booth' },
                { name: 'Talent Sourcing', href: '/employers/talent' },
                { name: 'Recruitment Tools', href: '/employers/tools' },
                { name: 'Success Stories', href: '/employers/stories' },
              ]}
            />
          </div>

          <div>
            <h4 className="font-medium mb-6">Stay Connected</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white px-4 py-3 w-full rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Email address"
              />
              <button
                className="bg-primary text-white rounded-r-md px-4 flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 lg:mb-0">
            © 2023 VirtualConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="hover:text-primary transition-colors">
              Accessibility
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

type SocialLinkProps = {
  icon: React.ReactNode;
  href: string;
};

const SocialLink = ({ icon, href }: SocialLinkProps) => {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

type FooterLinksProps = {
  links: {
    name: string;
    href: string;
  }[];
};

const FooterLinks = ({ links }: FooterLinksProps) => {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
