import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import ProductCard from "../../components/ui/ProductCard";
import { useProducts } from "../../hooks/useProducts";

const categories = [
  "All",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const heroSlides = [
  {
    title: "Signature Travel Edit",
    category: "Luxury Essentials",
    price: "$395",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
    accent: "from-blue-700 to-slate-950",
  },
  {
    title: "Alpine Timepiece",
    category: "Best Seller",
    price: "$249",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    accent: "from-amber-700 to-stone-950",
  },
  {
    title: "Tailored Weekend Set",
    category: "New Arrival",
    price: "$180",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    accent: "from-emerald-700 to-zinc-950",
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);

  const { data: products, isLoading, isError } = useProducts();

  const filtered =
    activeCategory === "All"
      ? products
      : products?.filter((p) => p.category === activeCategory);

  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroSlides.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide(
      (slide) => (slide - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const showNextSlide = () => {
    setActiveSlide((slide) => (slide + 1) % heroSlides.length);
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4">
              New Season 2024 Collection
            </p>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-slate-50 leading-tight mb-6">
              Elevate Your Everyday Essentials
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
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
                to="/categories"
                className="text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 flex items-center gap-1 transition-colors"
              >
                View Lookbook <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                className={`relative h-[430px] overflow-hidden rounded-2xl bg-gradient-to-br ${currentSlide.accent} shadow-2xl shadow-slate-300/70 dark:shadow-black/50`}
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-white/10" />

                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  Curated Drop
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
                    {currentSlide.category}
                  </p>
                  <h2 className="text-3xl font-bold leading-tight mb-3">
                    {currentSlide.title}
                  </h2>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-white/60">Starting from</p>
                      <p className="text-2xl font-bold">
                        {currentSlide.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  <button
                    onClick={showPreviousSlide}
                    aria-label="Previous hero slide"
                    className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={showNextSlide}
                    aria-label="Next hero slide"
                    className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 right-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-slate-300/50 dark:shadow-black/40 border border-white/70 dark:border-slate-700 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">Member benefit</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-slate-100">
                      Free premium delivery over $150
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Show ${slide.title}`}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === index
                            ? "w-8 bg-blue-700"
                            : "w-2 bg-gray-300 dark:bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50">Browse Categories</h2>
          <Link
            to="/categories"
            className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-1 hover:underline"
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
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-2">Our Products</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">
          Quality meets craftsmanship in every hand-selected piece.
        </p>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-slate-800 rounded-xl aspect-square mb-3" />
                <div className="bg-gray-200 dark:bg-slate-800 h-4 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-slate-800 h-3 rounded w-1/2" />
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
          <Link
            to="/shop"
            className="border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Discover More Products
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-50 dark:bg-slate-900 py-16 transition-colors duration-300">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mx-auto mb-4">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">
            Join the Luxe List
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
            Subscribe to receive exclusive early access to new collections,
            personalized style recommendations, and premium member-only
            invitations.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500 transition-colors"
            />
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
