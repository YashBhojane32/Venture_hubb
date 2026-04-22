import { useState } from 'react';
import { Search, MapPin, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Maharashtra Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/30 to-transparent" />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-sunset/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8">
            <MapPin className="h-4 w-4 text-sunset" />
            <span>Discover Maharashtra's Hidden Gems</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight">
            Explore the{' '}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sunset via-sunset-light to-sky">
                Unseen
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-sunset/30 blur-sm" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Journey beyond the ordinary. Discover ancient forts, pristine waterfalls, 
            hidden villages, and breathtaking trails across Maharashtra.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search destinations, treks, or experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-0 text-white placeholder:text-white/50 text-lg focus-visible:ring-sunset/50"
                />
              </div>
              <Button className="h-14 px-8 bg-sunset hover:bg-sunset/90 text-white text-lg font-semibold shadow-lg shadow-sunset/30">
               Explore
              <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-white/50 text-sm">Popular:</span>
              {['Harishchandragad', 'Sandhan Valley', 'Devkund', 'Kalsubai'].map((place) => (
                <button
                  key={place}
                  className="px-3 py-1 rounded-full text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 bg-forest hover:bg-forest-light text-white text-lg font-semibold shadow-xl"
            >
              Start Exploring
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 border-white/30 text-white hover:bg-white/10 text-lg font-semibold backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: '50+', label: 'Destinations' },
              { value: '1000+', label: 'Travelers' },
              { value: '100+', label: 'Trek Routes' },
              { value: '4.9', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-sm">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
