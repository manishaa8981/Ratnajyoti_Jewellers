// import Navbar from "../components/Navbar";

// export default function Homepage() {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// }
import FeaturedCategories from "../components/FeaturedCategories";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
    </div>
  );
}
