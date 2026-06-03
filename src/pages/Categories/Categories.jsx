import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";

const categoryImages = {
  electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
  jewelery:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
  "men's clothing":
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500",
  "women's clothing":
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500",
};

const categoryDescriptions = {
  electronics: "Cutting-edge tech and premium gadgets",
  jewelery: "Timeless pieces crafted with precision",
  "men's clothing": "Refined essentials for the modern man",
  "women's clothing": "Elegant styles for every occasion",
};

const Categories = () => {
  const { data: products, isLoading, isError } = useProducts();

  const categories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-2">Categories</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Explore our curated collections by category
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-slate-800 rounded-2xl h-64" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm text-center py-12">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Categories Grid */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category}`}
              className="group relative overflow-hidden rounded-2xl h-64 block"
            >
              {/* Image */}
              <img
                src={
                  categoryImages[category] ||
                  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"
                }
                alt={category}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-xs mb-1">
                  {products?.filter((p) => p.category === category).length}{" "}
                  products
                </p>
                <h2 className="text-white text-xl font-bold capitalize mb-1">
                  {category}
                </h2>
                <p className="text-white/60 text-xs mb-3">
                  {categoryDescriptions[category]}
                </p>
                <div className="flex items-center gap-2 text-white text-sm font-semibold">
                  Shop Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
