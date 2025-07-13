import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Exquisite Gold Collection",
      subtitle: "Timeless Elegance",
      description:
        "Discover our handcrafted gold jewelry collection featuring traditional and contemporary designs",
      image:
        "https://i.pinimg.com/736x/80/cb/be/80cbbe9eaf8c9f178ce1f7f035fd7f5e.jpg",
      price: "Starting from ₹25,000",
      category: "Gold",
      bg: "from-yellow-50 to-amber-100",
    },
    {
      id: 2,
      title: "Diamond Luxury",
      subtitle: "Brilliance Redefined",
      description:
        "Stunning diamond jewelry that captures light and hearts with unmatched brilliance",
      image:
        "https://i.pinimg.com/1200x/6c/49/4c/6c494c4555bb7a5e637a965a8601274f.jpg",
      price: "Starting from ₹50,000",
      category: "Diamond",
      bg: "from-blue-50 to-indigo-100",
    },
    {
      id: 3,
      title: "Wedding Collection",
      subtitle: "Your Perfect Day",
      description:
        "Complete bridal jewelry sets designed to make your special day unforgettable",
      image:
        "https://i.pinimg.com/736x/13/07/02/1307024610ad3ffb9f24c6a1b876c377.jpg",
      price: "Starting from ₹75,000",
      category: "Bridal",
      bg: "from-red-50 to-pink-100",
    },
    {
      id: 4,
      title: "Heritage Earrings",
      subtitle: "Cultural Elegance",
      description:
        "Traditional earring designs that celebrate our rich cultural heritage",
      image:
        "https://i.pinimg.com/1200x/89/cb/e3/89cbe3c1cc038a23bdc49d9d157d1389.jpg",
      price: "Starting from ₹15,000",
      category: "Earrings",
      bg: "from-purple-50 to-violet-100",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5001);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Main Carousel Container */}
      <div
        className="relative w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  {currentSlideData.category}
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-2xl lg:text-3xl text-amber-700 font-light">
                  {currentSlideData.subtitle}
                </h2>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {currentSlideData.description}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  (4.8/5 from 2,341 reviews)
                </span>
              </div>

              <div className="text-3xl font-bold text-gray-800">
                {currentSlideData.price}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Shop Now
                </button>
                <button className="px-8 py-4 bg-white/80 hover:bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                  <Heart className="w-5 h-5" />
                  Add to Wishlist
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"></div>

                {/* Main image container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Price tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                    Premium Quality
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-amber-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-amber-600" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-amber-600 w-8"
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isAutoPlaying
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {isAutoPlaying ? "Auto" : "Manual"}
        </button>
      </div>
    </div>
  );
}
