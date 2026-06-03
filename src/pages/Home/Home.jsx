import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../components/ui/ProductCard";
import { useProducts } from "../../hooks/useProducts";


const categories = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products, isLoading, isError } = useProducts();

  const filtered =
    activeCategory === "All"
      ? products
      : products?.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
              New Season 2024 Collection
            </p>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Elevate Your Everyday Essentials
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
              Discover a curated collection of premium apparel designed for the
              modern visionary who values timeless craftsmanship.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/shop"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                to="/collections"
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1"
              >
                View Lookbook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
          <Link
            to="/"
            className="text-sm text-blue-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Our Products</h2>
        <p className="text-sm text-gray-500 mb-8">
          Quality meets craftsmanship in every hand-selected piece.
        </p>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl aspect-square mb-3" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-3 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-sm">
            Something went wrong. Please try again.
          </p>
        )}

        {filtered && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Discover More Products
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Join the Luxe List
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Subscribe to receive exclusive early access to new collections,
            personalized style recommendations, and premium member-only
            invitations.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
              Subscribe Now
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
