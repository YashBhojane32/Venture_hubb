import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/destinations';

export default function Testimonials() {
  return (
    <section className="py-24 bg-forest relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sunset rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sunset text-sm font-medium mb-4">
            Traveler Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Adventurers Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real experiences from fellow travelers who explored Maharashtra's hidden treasures
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-colors"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-sunset flex items-center justify-center">
                <Quote className="h-6 w-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sunset text-sunset" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Destination Tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-sky/20 text-sky text-sm mb-6">
                {testimonial.destination}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-white/60">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1,200+</div>
              <div className="text-sm text-white/60">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-white/60">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-white/60">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
