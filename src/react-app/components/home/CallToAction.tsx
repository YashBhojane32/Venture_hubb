import { Link } from 'react-router';
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';

export default function CallToAction() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sunset/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-forest/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sunset/10 text-sunset text-sm font-medium mb-6">
              Ready for Adventure?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Start Your Journey to{' '}
              <span className="text-gradient">Unexplored</span> Maharashtra
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're a seasoned trekker or a first-time explorer, we have the perfect 
              adventure waiting for you. Join thousands of travelers who have discovered 
              Maharashtra's hidden treasures with Venture Hub.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-forest" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">50+ Places</div>
                  <div className="text-sm text-muted-foreground">To explore</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-sky" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Year Round</div>
                  <div className="text-sm text-muted-foreground">Adventures</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sunset/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-sunset" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Expert</div>
                  <div className="text-sm text-muted-foreground">Local Guides</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="h-14 px-8 bg-sunset hover:bg-sunset/90 text-white text-lg font-semibold shadow-xl shadow-sunset/25"
              >
                <Link to="/destinations">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="h-14 px-8 border-2 border-forest text-forest hover:bg-forest hover:text-white text-lg font-semibold"
              >
                <Link to="/packages">
                  View Packages
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                    alt="Mountain view"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80"
                    alt="Waterfall"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80"
                    alt="Trekking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80"
                    alt="Village"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000000000}?w=100&q=80`}
                        alt="Traveler"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-foreground">1,200+</span>
                  <span className="text-muted-foreground"> travelers this month</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Join our community of adventurers exploring Maharashtra
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
