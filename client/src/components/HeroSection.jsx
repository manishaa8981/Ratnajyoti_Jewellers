export default function HeroSection() {
  return (
    <section className="relative bg-[url('/images/hero.jpg')] bg-cover bg-center h-[500px] flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-8 rounded-xl text-center max-w-lg">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold-800">
          Elegant Jewelry for Every Occasion
        </h1>
        <p className="mt-3 text-gray-700">
          Explore timeless collections in Gold, Diamond, and more.
        </p>
        <button className="mt-5 px-6 py-2 bg-gold-800 text-white rounded-full hover:opacity-90">
          Shop Now
        </button>
      </div>
    </section>
  );
}
