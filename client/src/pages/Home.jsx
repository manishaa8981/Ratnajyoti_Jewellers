import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CategoryGrid from "../components/categoryGrid";
import CollectionsShowcase from "../components/collectionShowCase";
import FeaturedCategories from "../components/FeaturedCategories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import RatnajyotiWorld from "../components/ratnajyotiWorld";
import VideoCarouselBasicExample from "../components/VideoCarousel";

export default function Home() {
  return (
    <div>
      <Navbar />
            <VideoCarouselBasicExample />
      <FeaturedCategories />
      <CollectionsShowcase />
      <CategoryGrid />
      <RatnajyotiWorld />
      <NewArrivals />
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
