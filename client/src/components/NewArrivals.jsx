export default function NewArrivals() {
  return (
    <div className="relative mb-8 px-4">
      {/* Background with text */}
      <div
        className="text-center h-[280px] md:h-[350px] bg-no-repeat bg-cover bg-[position:80%_80%] px-6 py-12 md:py-16 z-0 rounded-xl"
        style={{ backgroundImage: `url('/images/newarrivalbg.jpg')` }}
      >
        <h2 className="text-xl md:text-2xl font-semibold font-serif text-black">New Arrivals</h2>
        <p className="text-gray-700 mt-1 text-base md:text-lg font-medium">10+ New Items</p>
        <p className="text-gray-700 text-sm md:text-lg max-w-xl mx-auto font-medium">
          New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!
        </p>
      </div>

      {/* Hanging Cards */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-16 lg:gap-60 -mt-[100px] md:-mt-[130px] z-20 relative px-4">
        <div className="w-full sm:w-[260px] md:w-[300px] h-[200px] md:h-[250px] group rounded-xl overflow-hidden shadow-xl bg-white">
          <img
            src="/images/newarrivaldiamond.jpg"
            alt="Diamond Necklace"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="w-full sm:w-[260px] md:w-[300px] h-[200px] md:h-[250px] group rounded-xl overflow-hidden shadow-xl bg-white">
          <img
            src="/images/newarrivalmanagal.jpg"
            alt="Mangalsutra"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </div>
  );
}
