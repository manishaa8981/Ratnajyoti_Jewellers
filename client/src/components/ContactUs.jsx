import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "./Navbar";

export default function ContactUs() {
  return (
    <div>
      <Navbar />
      <section className="bg-[#fdf9f6] py-16 px-6">
        {/* Heading */}
        <div className="max-w-5xl mx-auto text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 mt-3">
            We'd love to hear from you! Whether you have a question about
            products, pricing, or anything else.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* LEFT: Contact Info */}
          <div
            className="space-y-6 text-left animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            {[
              {
                Icon: MapPin,
                label: "Address",
                value: "Ratnajyoti Jewellers, Kathmandu, Nepal",
              },
              {
                Icon: Phone,
                label: "Phone",
                value: "+977-9800000000",
              },
              {
                Icon: Mail,
                label: "Email",
                value: "support@ratnajyoti.com",
              },
            ].map(({ Icon, label, value }, idx) => (
              <div
                key={label}
                className="flex items-start gap-4 animate-fade-in-up"
                style={{
                  animationDelay: `${0.2 + idx * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <Icon className="w-6 h-6 text-[#b6845b]" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {label}
                  </h4>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Contact Form */}
          <form
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6845b] transition duration-300 hover:shadow-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6845b] transition duration-300 hover:shadow-sm"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6845b] transition duration-300 hover:shadow-sm"
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6845b] transition duration-300 hover:shadow-sm"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-bronze hover:bg-[#a57049] text-white font-semibold px-6 py-3 rounded-3xl shadow hover:shadow-xl transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
