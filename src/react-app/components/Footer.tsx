import { Link } from 'react-router';
import { Compass, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';

const footerLinks = {
  explore: [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Travel Packages', path: '/packages' },
    { name: 'Blog & Stories', path: '/blog' },
    { name: 'Photo Gallery', path: '/gallery' },
  ],
  categories: [
    { name: 'Historic Forts', path: '/destinations?category=forts' },
    { name: 'Waterfalls', path: '/destinations?category=waterfalls' },
    { name: 'Trekking Trails', path: '/destinations?category=trekking' },
    { name: 'Village Stays', path: '/destinations?category=villages' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press Kit', path: '/press' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-2">Join the Adventure</h3>
              <p className="text-white/70 max-w-md">
                Subscribe for exclusive travel guides, hidden gems, and special offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full sm:w-72"
              />
              <Button className="bg-sunset hover:bg-sunset/90 text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-white/10">
                <Compass className="h-6 w-6 text-sunset" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Venture Hub</span>
                <span className="text-[10px] uppercase tracking-widest text-white/60">
                  Explore the Unseen
                </span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Discover Maharashtra's hidden treasures. From ancient forts to pristine waterfalls, 
              we help adventurers explore beyond the ordinary.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sunset">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sunset">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sunset">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-white/70">
              <a href="mailto:hello@venturehub.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                hello@venturehub.in
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Mumbai, Maharashtra
              </span>
            </div>
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Venture Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
