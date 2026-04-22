import { Link } from 'react-router';
import { MapPin, Star, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/react-app/components/ui/badge';
import { Button } from '@/react-app/components/ui/button';
import { destinations } from '@/data/destinations';

const featuredDestinations = destinations.filter(d => d.featured).slice(0, 4);

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Moderate: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Difficult: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function FeaturedDestinations() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest/10 text-forest text-sm font-medium mb-4">
            Featured Destinations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Hidden Gems Await
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked destinations that offer unforgettable experiences beyond the beaten path
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredDestinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className={`group relative rounded-2xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-64'} overflow-hidden`}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className={`${difficultyColors[destination.difficulty]} border`}>
                    {destination.difficulty}
                  </Badge>
                  <Badge className="bg-forest/90 text-white capitalize">
                    {destination.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-1 text-sm text-white/80 mb-2">
                  <MapPin className="h-4 w-4" />
                  {destination.location}
                </div>
                <h3 className={`font-bold mb-2 group-hover:text-sunset transition-colors ${
                  index === 0 ? 'text-2xl' : 'text-xl'
                }`}>
                  {destination.name}
                </h3>
                <p className={`text-white/70 mb-4 line-clamp-2 ${index === 0 ? '' : 'text-sm'}`}>
                  {destination.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-sunset text-sunset" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-white/60 text-sm">({destination.reviewCount})</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-sunset group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            asChild
            size="lg" 
            className="bg-forest hover:bg-forest-light text-white px-8"
          >
            <Link to="/destinations">
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
