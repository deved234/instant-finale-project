import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-100 to-blue-50 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
          Our Story
        </p>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-2xl mx-auto leading-tight">
          Curating the World's Most Exceptional Everyday Essentials
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          A focus on minimalist luxury, timeless craftsmanship, and modern
          elegance since 2024.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
              Our Mission
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining Modern Elegance
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              At LuxeRetail, we believe that everyday objects should inspire.
              Every product in our collection is hand-selected by our team of
              curators who share a passion for exceptional design and quality
              craftsmanship.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              We partner with artisans and brands who share our commitment to
              sustainability, ethical production, and timeless aesthetics that
              transcend seasonal trends.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-80" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Curated Products" },
              { number: "50+", label: "Brand Partners" },
              { number: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
            What We Stand For
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "✦",
              title: "Quality First",
              description:
                "Every product passes through our rigorous quality assessment before earning a place in our collection.",
            },
            {
              icon: "◈",
              title: "Sustainability",
              description:
                "We prioritize brands and artisans who share our commitment to ethical and sustainable practices.",
            },
            {
              icon: "❋",
              title: "Timeless Design",
              description:
                "We curate pieces that transcend trends and bring lasting value to your everyday life.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-700 text-xl">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
              The People Behind LuxeRetail
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Alexandra Reed", role: "Founder & CEO" },
              { name: "James Laurent", role: "Head of Curation" },
              { name: "Sofia Chen", role: "Creative Director" },
              { name: "Marcus Webb", role: "Brand Partnerships" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-sm font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Elevate Your Lifestyle?
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          Join thousands of curators who have discovered the art of refined
          living with LuxeRetail.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/shop"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/register"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Join Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
