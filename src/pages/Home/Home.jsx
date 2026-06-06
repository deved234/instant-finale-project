import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../../components/ui/ProductCard";
import { useProducts } from "../../hooks/useProducts";

gsap.registerPlugin(ScrollTrigger);

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

// Framer Motion Variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const slideImageVariant = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.4 } },
};

const slideTextVariant = {
  enter: { opacity: 0, y: 18 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const heroTextRef = useRef(null);
  const marqueeRef = useRef(null);
  const sectionsRef = useRef([]);

  const { data: products, isLoading, isError } = useProducts();

  const filtered =
    activeCategory === "All"
      ? products
      : products?.filter((p) => p.category === activeCategory);

  const currentSlide = heroSlides[activeSlide];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % heroSlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const showPreviousSlide = () =>
    setActiveSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const showNextSlide = () =>
    setActiveSlide((s) => (s + 1) % heroSlides.length);

  // GSAP Hero Text entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-tag", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.1,
        ease: "expo.out",
      });
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.25,
        ease: "expo.out",
      });
      gsap.from(".hero-desc", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        delay: 0.5,
        ease: "expo.out",
      });
      gsap.from(".hero-btns", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.7,
        ease: "expo.out",
      });
    }, heroTextRef);

    return () => ctx.revert();
  }, []);

  // GSAP Marquee infinite scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger for sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.normalizeScroll(false);

      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 overflow-y-hidden">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden pb-10">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div ref={heroTextRef} className="flex-1">
            <p className="hero-tag text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-4">
              New Season 2024 Collection
            </p>
            <h1 className="hero-title text-5xl font-bold text-gray-900 dark:text-slate-50 leading-tight mb-6">
              Elevate Your Everyday Essentials
            </h1>
            <p className="hero-desc text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
              Discover a curated collection of premium apparel designed for the
              modern visionary who values timeless craftsmanship.
            </p>
            <div className="hero-btns flex items-center gap-4">
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

          {/* Right: Slider */}
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                className={`relative h-[430px] overflow-hidden rounded-2xl bg-gradient-to-br ${currentSlide.accent} shadow-2xl shadow-slate-300/70 dark:shadow-black/50`}
              >
                {/* Animated Image */}
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentSlide.image}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    variants={slideImageVariant}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-white/10" />

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  Curated Drop
                </motion.div>

                {/* Animated Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      variants={slideTextVariant}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
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
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Nav Arrows */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={showPreviousSlide}
                    className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={showNextSlide}
                    className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-2 left-6 right-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-slate-300/50 dark:shadow-black/40 border border-white/70 dark:border-slate-700 px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">
                      Member benefit
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-slate-100">
                      Free premium delivery over $150
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <motion.button
                        key={slide.title}
                        onClick={() => setActiveSlide(index)}
                        animate={{ width: activeSlide === index ? 28 : 8 }}
                        transition={{ duration: 0.3 }}
                        className={`h-2 rounded-full transition-colors ${
                          activeSlide === index
                            ? "bg-blue-700"
                            : "bg-gray-300 dark:bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={marqueeRef}
          className="bg-blue-700 dark:bg-blue-800 py-3 mt-8"
        >
          <div className="marquee-track flex gap-10 whitespace-nowrap w-max will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center flex-shrink-0">
                {[
                  "Free Shipping Over $150",
                  "New Arrivals Weekly",
                  "Premium Quality",
                  "Secure Checkout",
                  "Easy Returns",
                  "10K+ Happy Customers",
                ].map((text) => (
                  <span
                    key={text}
                    className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-4 flex-shrink-0"
                  >
                    {text}
                    <span className="text-blue-300 text-base">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section
        ref={addToSectionsRef}
        className="max-w-7xl mx-auto px-6 py-12 mt-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50">
            Browse Categories
          </h2>
          <Link
            to="/categories"
            className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 flex-wrap"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              variants={fadeUpVariant}
              custom={i}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── PRODUCTS ── */}
      <section ref={addToSectionsRef} className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-2">
          Our Products
        </h2>
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

        <AnimatePresence mode="wait">
          {filtered && (
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={fadeUpVariant}
                  custom={i}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/shop"
            className="border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Discover More Products
          </Link>
        </motion.div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section
        ref={addToSectionsRef}
        className="bg-blue-50 dark:bg-slate-900 py-5 transition-colors duration-300"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg mx-auto px-6 text-center"
        >
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
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </motion.button>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
