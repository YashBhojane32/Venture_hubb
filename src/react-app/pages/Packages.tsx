import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import PackageCard from "@/react-app/components/packages/PackageCard";
import { packages } from "@/data/packages";

export default function Packages() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">
          Travel Packages
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}