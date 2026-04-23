import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="py-20 text-center bg-white">
        <h1 className="text-5xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have questions about trips, treks, or destinations?  
          Our team at Venture Hub is here to help you plan your next adventure.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Contact Form */}
        <form className="bg-white p-8 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          
          <div className="flex items-start gap-4">
            <MapPin className="text-green-600" />
            <div>
              <h3 className="font-bold">Location</h3>
              <p className="text-gray-600">
                Nashik, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-green-600" />
            <div>
              <h3 className="font-bold">Email</h3>
              <p className="text-gray-600">
                contact@venturehub.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-green-600" />
            <div>
              <h3 className="font-bold">Phone</h3>
              <p className="text-gray-600">
                +91 98765 43210
              </p>
            </div>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}