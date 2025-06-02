export default function NewArrivals() {
  return (
    <section className="py-12 px-4 text-center bg-gray-50">
      <h2 className="text-2xl font-serif text-gold-800 mb-6">New Arrivals</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {[1, 2].map((id) => (
          <div key={id} className="w-64 h-64 rounded-xl overflow-hidden shadow-md bg-white">
            <img src={`/images/product${id}.jpg`} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
