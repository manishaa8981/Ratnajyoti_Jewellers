import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Exquisite Gold Collection",
      subtitle: "Timeless Elegance",
      description: "Discover our handcrafted gold jewelry collection featuring traditional and contemporary designs",
      image: "https://i.pinimg.com/736x/80/cb/be/80cbbe9eaf8c9f178ce1f7f035fd7f5e.jpg",
      price: "Starting from Rs.25,000",
      textColor: "text-yellow-100",
    },
    {
      id: 2,
      title: "Diamond Luxury",
      subtitle: "Brilliance Redefined",
      description: "Stunning diamond jewelry that captures light and hearts with unmatched brilliance",
      image: "https://i.pinimg.com/1200x/6c/49/4c/6c494c4555bb7a5e637a965a8601274f.jpg",
      price: "Starting from Rs.50,000",
      textColor: "text-white",
    },
    {
      id: 3,
      title: "Wedding Collection",
      subtitle: "Your Perfect Day",
      description: "Complete bridal jewelry sets designed to make your special day unforgettable",
      image: "https://i.pinimg.com/736x/13/07/02/1307024610ad3ffb9f24c6a1b876c377.jpg",
      price: "Starting from Rs.75,000",
      textColor: "text-red-100",
    },
    {
      id: 4,
      title: "Heritage Earrings",
      subtitle: "Cultural Elegance",
      description: "Traditional earring designs that celebrate our rich cultural heritage",
      image: "https://i.pinimg.com/1200x/89/cb/e3/89cbe3c1cc038a23bdc49d9d157d1389.jpg",
      price: "Starting from Rs.15,000",
      textColor: "text-yellow-900",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5001);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % slides.length); setIsAutoPlaying(false); };
  const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); setIsAutoPlaying(false); };
  const goToSlide = (index) => { setCurrentSlide(index); setIsAutoPlaying(false); };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[600px] overflow-hidden">
      <div
        className="relative w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-3 md:space-y-6 text-center lg:text-left">
              <div className="space-y-1 md:space-y-2">
                <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight ${currentSlideData.textColor}`}>
                  {currentSlideData.title}
                </h1>
                <h2 className="text-lg sm:text-2xl lg:text-3xl text-white font-light">
                  {currentSlideData.subtitle}
                </h2>
              </div>
              <p className="hidden sm:block text-sm md:text-lg text-white leading-relaxed max-w-lg mx-auto lg:mx-0">
                {currentSlideData.description}
              </p>
              <div className="hidden sm:flex items-center justify-center lg:justify-start gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                <span className="ml-2 text-gray-300 text-xs md:text-sm">(4.8/5 from 2,341 reviews)</span>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white">{currentSlideData.price}</div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button className="px-5 md:px-8 py-2 md:py-4 bg-bronze hover:bg-bronze-10 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Shop Now
                </button>
                <button className="px-5 md:px-8 py-2 md:py-4 bg-white/80 hover:bg-white text-gray-800 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base backdrop-blur-sm">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" /> Add to Wishlist
                </button>
              </div>
            </div>

            {/* Right Image — hidden on small screens */}
            <div className="hidden lg:block relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img src={currentSlideData.image} alt={currentSlideData.title} className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-3 md:left-6 top-1/2 transform -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-20">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
        <button onClick={nextSlide} className="absolute right-3 md:right-6 top-1/2 transform -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-20">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-amber-600 w-6 md:w-8" : "w-2 md:w-3 bg-white/60 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
