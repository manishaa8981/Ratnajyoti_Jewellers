import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqItems = [
    {
      question: "How do I know my ring size?",
      answer:
        "To determine your ring size, you can use a ring sizer tool, measure an existing ring, or visit a local jeweler for professional sizing. We also provide a detailed ring size guide on our website with printable templates and measurement instructions to help you find the perfect fit.",
    },
    {
      question: "Can I return or exchange jewelry?",
      answer:
        "Yes, we offer a 7-day return or exchange policy for unused items in original condition and packaging. Customized or engraved items may not be eligible. Please check our Return Policy for details.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major payment methods including Credit/Debit Cards and Cash on Delivery (COD) in select regions.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Orders are typically processed within 24-48 hours. Standard delivery takes 3-7 business days depending on your location. We also offer express shipping at checkout.",
    },
    {
      question: "Is your jewelry authentic and hallmarked?",
      answer:
        "Yes, all our jewelry is authentic and comes with proper hallmarking certifications. We use genuine materials including 24-carat gold plating, conflict-free diamonds, and traditional Nepalese craftsmanship techniques. Each piece comes with a certificate of authenticity.",
    },
    {
      question: "Do you offer custom jewelry designs?",
      answer:
        "Absolutely! We specialize in custom jewelry design. Our skilled artisans can create unique pieces based on your specifications, incorporating traditional Nepalese techniques with modern designs. Contact us to discuss your custom jewelry requirements.",
    },
    {
      question: "How should I care for my jewelry?",
      answer:
        "To maintain your jewelry's beauty, store pieces separately in soft pouches, avoid contact with chemicals and perfumes, clean gently with a soft cloth, and remove jewelry before swimming or exercising. We provide detailed care instructions with each purchase.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by destination. Please check our shipping policy for specific details about international orders, customs, and duties.",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[#fdf9f6]">
        {/* Header Section with fade-in-up */}
        <section className="pt-16 pb-8">
          <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
            <h1 className="text-5xl font-bold text-gray-900">FAQ</h1>
            <p className="text-lg text-gray-600 mt-2">
              Frequently Asked Questions
            </p>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 animate-fade-in`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-bronze-10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <div
                    className={`transform transition-transform duration-300 ${
                      openItems[index] ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-6 h-6 text-white bg-gray-900 rounded-full p-1" />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openItems[index]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA Section with animation */}
        <section className="py-16 bg-white animate-fade-in-up">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our support team is ready to help you!
            </p>
            <button
              onClick={() => navigate("/contactus")}
              className="px-8 py-3 bg-bronze text-white hover:bg-[#a57049] font-semibold rounded-3xl shadow-md hover:shadow-xl transition-transform hover:scale-105 duration-300"
            >
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
