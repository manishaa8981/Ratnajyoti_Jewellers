import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function OurMission() {
  return (
    <div className="bg-[#fdf9f6] text-gray-800">
      <Navbar />

      {/* Header Section */}
      <section className="py-16 bg-white animate-fade-in-up">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            OUR MISSION
          </h1>
          <p
            className="text-lg text-gray-600 mb-3 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Handcrafted jewelry that is ethical, sustainable and made in Nepal.
          </p>
          <p
            className="text-base text-gray-500 max-w-4xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Each of our designs is carefully curated with style and soul — with
            a motive to promote local Nepalese craftsmanship by giving emerging
            artisans a platform, and uplifting the community side by side.
          </p>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 animate-fade-in-up">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#b6845b]">
              SUSTAINABILITY
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                At Ratnajyoti Jewellers, we are committed to creating ethical
                and sustainable jewelry that blends tradition with mindful
                craftsmanship. Our pieces are handcrafted using 24-carat
                gold-plated copper, panchadhatu, and conflict-free diamonds,
                making them hypoallergenic and safe for everyday wear.
              </p>
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                We follow a zero-waste manufacturing process, preserving age-old
                jewelry-making techniques while minimizing our environmental
                footprint.
              </p>
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                Our packaging reflects our values — eco-friendly Nepali Lokta
                paper boxes and reusable pouches made by local women, reducing
                single-use plastic and supporting community livelihoods.
              </p>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition duration-500">
              <img
                src="/images/gold.jpg"
                alt="Traditional Nepalese jewelry"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Made in Nepal Section */}
      <section className="py-16 bg-white animate-fade-in-up">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className="relative md:order-1 animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl hover:scale-105 transition duration-500">
              <img
                src="/images/jwel-making1.png"
                alt="Jewelry crafting process"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#b6845b]">
              MADE IN NEPAL
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                Our jewelry is crafted by talented artisans in Patan and
                Kathmandu using generations-old techniques and precision. Each
                design holds a story — unique, soulful, and deeply rooted in
                heritage.
              </p>
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                The process includes sculpting, carving, polishing — all done by
                hand with care and perfection.
              </p>
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                We strive to create opportunities for skilled manpower in Nepal
                while preserving our cultural identity and helping uplift the
                local economy.
              </p>
              <p
                className="animate-fade-in"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}
              >
                When you support us, you support Nepal’s legacy and its people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
