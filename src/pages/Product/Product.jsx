import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, Minus, Plus, Star, MessageSquare } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useToastStore from "../../store/toastStore";
import { useProduct } from "../../hooks/useProducts";

const categoryGalleries = {
  electronics: [
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80"
  ],
  jewelery: [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80"
  ],
  "men's clothing": [
    "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80"
  ],
  "women's clothing": [
    "https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
  ]
};

const defaultReviews = [
  {
    id: 1,
    author: "Eleanor Vance",
    rating: 5,
    date: "2026-05-12",
    comment: "Absolutely outstanding quality. Exceeded all my expectations. Will definitely buy again."
  },
  {
    id: 2,
    author: "Julian Thorne",
    rating: 4,
    date: "2026-05-28",
    comment: "Very elegant design. Packaging was exquisite. Delivery took one day longer than expected, but the product is worth it."
  }
];

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);
  const { user, isAuthenticated } = useAuthStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(false);

  // Zoom States
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center" });
  const [isZoomed, setIsZoomed] = useState(false);

  // Reviews States
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitError, setSubmitError] = useState("");

  const { data: product, isLoading, isError } = useProduct(id);

  // Load reviews from localStorage
  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`reviews-${id}`);
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(defaultReviews);
        localStorage.setItem(`reviews-${id}`, JSON.stringify(defaultReviews));
      }
    }
  }, [id]);

  // Pre-fill user name in review form if authenticated
  useEffect(() => {
    if (user?.name) {
      setReviewName(user.name);
    } else {
      setReviewName("");
    }
  }, [user]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    showToast(
      quantity > 1
        ? `Added ${quantity} items to your bag`
        : "Added to your bag",
    );
  };

  const handleZoomMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2.2)"
    });
  };

  const handleZoomMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleZoomMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({ transformOrigin: "center", transform: "scale(1)" });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!reviewName.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (reviewText.trim().length < 5) {
      setSubmitError("Your review must be at least 5 characters long.");
      return;
    }

    const newReview = {
      id: Date.now(),
      author: reviewName.trim(),
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewText.trim(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));

    // Reset Form (except name if user is logged in)
    setReviewText("");
    if (!isAuthenticated) {
      setReviewName("");
    }
    setReviewRating(5);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 dark:bg-slate-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-200 dark:bg-slate-800 rounded-2xl aspect-square" />
          <div className="space-y-4">
            <div className="bg-gray-200 dark:bg-slate-800 h-6 rounded w-1/3" />
            <div className="bg-gray-200 dark:bg-slate-800 h-10 rounded w-2/3" />
            <div className="bg-gray-200 dark:bg-slate-800 h-8 rounded w-1/4" />
            <div className="bg-gray-200 dark:bg-slate-800 h-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center dark:bg-slate-950">
        <p className="text-red-500">Something went wrong. Please try again.</p>
      </div>
    );
  }

  // Gallery compilation
  const alternateImages = categoryGalleries[product?.category] || [];
  const gallery = [
    product?.image,
    alternateImages[0] || product?.image,
    alternateImages[1] || product?.image,
  ];

  // Ratings calculation
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const starPercentages = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      starPercentages[r.rating - 1]++;
    }
  });

  return (
    <div className="dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images Gallery */}
          <div>
            <div 
              className="relative overflow-hidden bg-gray-100 dark:bg-slate-900 rounded-2xl aspect-square mb-4 cursor-zoom-in border border-gray-100 dark:border-slate-800"
              onMouseMove={handleZoomMouseMove}
              onMouseEnter={handleZoomMouseEnter}
              onMouseLeave={handleZoomMouseLeave}
            >
              <img
                src={gallery[activeImg]}
                alt={product?.title}
                className="w-full h-full object-cover transition-transform duration-100 ease-out"
                style={isZoomed ? zoomStyle : {}}
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    activeImg === i ? "border-blue-700 dark:border-blue-500 scale-[0.98]" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-2">
                {product?.category}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-3">
                {product?.title}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {avgRating} ({totalReviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  ${product?.price}
                </span>
                <span className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  In Stock
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {product?.description}
              </p>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <Minus className="w-4 h-4 text-gray-500" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-gray-800 dark:text-slate-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800"
                    >
                      <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addItem(product);
                    showToast("Added to your bag — proceeding to checkout");
                    navigate("/cart");
                  }}
                  className="flex-1 bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-400 py-3 rounded-lg text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Perks */}
              <div className="bg-gray-50 dark:bg-slate-900/60 rounded-xl p-4 space-y-3 border border-gray-100 dark:border-slate-850">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Complimentary shipping on orders over $150
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    2-year premium quality guarantee
                  </span>
                </div>
              </div>

              {/* Specs Accordion */}
              <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4">
                <button 
                  onClick={() => setSpecsOpen(!specsOpen)}
                  className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-900 dark:text-slate-100"
                >
                  Product Specifications
                  <span className={`transform transition-transform ${specsOpen ? "rotate-180" : ""}`}>↓</span>
                </button>
                {specsOpen && (
                  <div className="pb-4 pt-2 text-xs text-gray-500 dark:text-gray-400 space-y-2 leading-relaxed animate-fadeIn">
                    <p>• <strong>Origin:</strong> Crafted by licensed partners globally</p>
                    <p>• <strong>Material:</strong> Premium selected elements</p>
                    <p>• <strong>Dimensions:</strong> Designed for compact fit & everyday convenience</p>
                    <p>• <strong>Care instructions:</strong> Store in clean space, wipe with dry microfibre cloth</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 pt-12 border-t border-gray-100 dark:border-slate-850">
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews Statistics */}
            <div className="lg:col-span-1 bg-gray-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-100 dark:border-slate-850 h-fit">
              <div className="text-center mb-6">
                <p className="text-5xl font-extrabold text-gray-900 dark:text-slate-50 mb-2">{avgRating}</p>
                <div className="flex items-center justify-center text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">Based on {totalReviews} reviews</p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = starPercentages[stars - 1] || 0;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-gray-500 font-semibold">{stars}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-gray-400">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List & Write Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Form */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
                <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-4">Write a review</h3>
                
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {submitError && (
                    <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">{submitError}</p>
                  )}

                  {/* Rating Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Your Rating:</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= (hoverRating || reviewRating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 dark:text-slate-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      disabled={isAuthenticated}
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-4 py-3 border-none outline-none focus:ring-1 focus:ring-blue-700 dark:focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed text-gray-800 dark:text-slate-100"
                    />
                  </div>

                  {/* Textarea */}
                  <div>
                    <textarea
                      placeholder="Write your review here... (min. 5 characters)"
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full text-xs bg-gray-50 dark:bg-slate-800 rounded-lg px-4 py-3 border-none outline-none focus:ring-1 focus:ring-blue-700 dark:focus:ring-blue-500 text-gray-800 dark:text-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-900 dark:bg-blue-600 text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-black dark:hover:bg-blue-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div 
                    key={r.id} 
                    className="p-5 rounded-2xl border border-gray-100 dark:border-slate-850 bg-gray-50/50 dark:bg-slate-900/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-slate-50">{r.author}</p>
                        <div className="flex items-center text-amber-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Banner */}
      <section className="bg-amber-50 dark:bg-slate-900 py-20 text-center transition-colors">
        <h2 className="text-4xl font-bold text-amber-900 dark:text-amber-200 mb-4">
          The Art of Radiance
        </h2>
        <p className="text-amber-700 dark:text-amber-400/80 text-sm max-w-md mx-auto mb-6">
          Discover a collection where science meets serenity, and every
          application is a moment of pure luxury designed to elevate your
          spirit.
        </p>
        <button className="border border-amber-900 dark:border-amber-400 text-amber-900 dark:text-amber-400 px-6 py-3 rounded-full text-sm hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors">
          Explore the Science
        </button>
      </section>
    </div>
  );
};

export default Product;

