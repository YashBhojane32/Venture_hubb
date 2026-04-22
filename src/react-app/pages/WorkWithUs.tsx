import { MapPin, Car, Home, Camera } from "lucide-react";
import { useState } from "react";

const roles = [
  {
    title: "Local Guide",
    value: "guide",
    icon: MapPin,
    description: "Help travelers explore hidden forts, trails, and villages in your area."
  },
  {
    title: "Driver",
    value: "driver",
    icon: Car,
    description: "Provide safe and reliable transport services for travelers."
  },
  {
    title: "Homestay Owner",
    value: "host",
    icon: Home,
    description: "List your homestay and host travelers looking for authentic stays."
  },
  {
    title: "Photographer",
    value: "photographer",
    icon: Camera,
    description: "Capture beautiful travel moments and experiences."
  }
];

export default function WorkWithUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    experience: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Sending Data:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Response:", data);

      alert("Application submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        role: "",
        experience: ""
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="pt-28 pb-20">

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Work With <span className="text-sunset">Explore Beyond</span>
        </h1>

        <p className="text-lg text-muted-foreground">
          Are you a local guide, driver, or homestay owner? Join our network
          and help travelers discover hidden destinations across Maharashtra.
        </p>
      </section>

      {/* Role Cards */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {roles.map((role) => {
          const Icon = role.icon;

          return (
            <div
              key={role.title}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="mb-4 text-sunset">
                <Icon size={32} />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {role.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Application Form */}
      <section className="max-w-3xl mx-auto px-6 bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Apply Now
        </h2>

        <form className="grid gap-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-3 rounded-lg"
          />

          {/* ✅ FIXED ROLE SELECT */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.title}
              </option>
            ))}
          </select>

          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            rows={4}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-sunset text-white py-3 rounded-lg hover:bg-sunset/90 transition"
          >
            Submit Application
          </button>

        </form>

      </section>

    </div>
  );
}