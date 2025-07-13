export default function Footer() {
  return (
    <footer className="bg-[#fdf9f6] py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row md:justify-between gap-6">
        {/* Social Media Icons */}
        <div className="flex space-x-4 text-green-900 text-lg">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6 text-sm text-gray-800 font-medium">
          <a href="/ourmission">Our Mission</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="/faq">FAQ</a>
          <a href="/aboutus">About Us</a>
        </nav>

        {/* Contact Button */}
        <div>
          <button className="bg-[#b17b5e] hover:bg-[#9f6c51] text-white px-5 py-2 rounded-full text-sm font-medium transition">
            <a href="/contactus">Contact Us</a>
          </button>
        </div>
      </div>
    </footer>
  );
}
