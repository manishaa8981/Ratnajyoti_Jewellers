import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="bg-[#fdf9f6] text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About Ratnajyoti Jewellers
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Crafted with tradition. Designed for elegance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in the heart of Kathmandu, Ratnajyoti Jewellers was built
              on a passion for artistry, craftsmanship, and culture. With every
              piece we design, we preserve the timeless beauty of Nepalese
              heritage and elevate it with a modern twist.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From generations of skilled artisans to today’s contemporary
              designers, we bring you the finest gold, diamond, and traditional
              jewelry — perfect for every moment and memory.
            </p>
          </div>
          <img
            src="/icons/our-story1.jpg"
            alt="Our Story"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/icons/our-story2.jpg"
            alt="Crafting Jewelry"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To celebrate the spirit of Nepal through meaningful jewelry. We
              aim to connect tradition and innovation — creating designs that
              empower our local artisans, respect our culture, and delight our
              customers with beauty and authenticity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sustainability, ethical sourcing, and attention to detail are at
              the heart of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            <div>
              <h4 className="font-bold text-lg mb-2">
                🌟 Authentic Craftsmanship
              </h4>
              <p className="text-gray-600">
                Each piece is handmade by skilled Nepalese artisans with love
                and precision.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">💍 Certified Purity</h4>
              <p className="text-gray-600">
                Hallmarked gold and conflict-free diamonds — with full
                transparency and trust.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">🌿 Sustainable Luxury</h4>
              <p className="text-gray-600">
                Eco-friendly packaging and ethical production practices that
                honor our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-[#fdf9f6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Be Part of Our Legacy
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Whether it's a gift, a celebration, or a moment of self-love —
            discover jewelry that tells your story.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#b6845b] hover:bg-[#a5714c] text-white font-semibold rounded-full transition"
          >
            Explore Our Collection
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
