import { Link } from 'react-router';
import { Castle, Droplets, Mountain, Home, ArrowRight } from 'lucide-react';
import { categories } from '@/data/destinations';

const iconMap: Record<string, React.ElementType> = {
  Castle,
  Droplets,
  Mountain,
  Home,
};

export default function Categories() {
  return (
    <section className="py-24 bg-gradient-to-b from-sand to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky/5 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky/10 text-sky text-sm font-medium mb-4">
            Travel Categories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ancient fortifications to serene village stays, find the perfect experience for your journey
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Link
                key={category.id}
                to={`/destinations?category=${category.id}`}
                className="group relative rounded-3xl overflow-hidden h-80 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-forest/90 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 group-hover:bg-sunset group-hover:border-sunset transition-all duration-300">
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-sunset font-semibold">
                      {category.count} destinations
                    </span>
                    <span className="flex items-center gap-1 text-white/70 group-hover:text-white group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
