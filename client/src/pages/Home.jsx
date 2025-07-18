import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CategoryGrid from "../components/categoryGrid";
import CollectionsShowcase from "../components/collectionShowCase";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import RatnajyotiWorld from "../components/ratnajyotiWorld";
import VideoCarouselBasicExample from "../components/VideoCarousel";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration (ms)
      once: true, // whether animation should happen only once
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <VideoCarouselBasicExample />
      </div>

      <div data-aos="zoom-in">
        <CollectionsShowcase />
      </div>

      <div data-aos="fade-up">
        <CategoryGrid />
      </div>

      <div data-aos="fade-left">
        <RatnajyotiWorld />
      </div>

      <div data-aos="fade-right">
        <NewArrivals />
      </div>

      <Link
        to="/faq"
        className="fixed bottom-6 right-6 z-50 bg-[#b6845b] hover:bg-[#a06d48] text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        title="Have a Question? Visit FAQ"
      >
        <FaQuestionCircle className="text-2xl" />
      </Link>
      <Footer />
    </div>
  );
}
