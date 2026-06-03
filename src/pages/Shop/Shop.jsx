import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Star } from "lucide-react";
import ProductCard from "../../components/ui/ProductCard";
import { useProducts } from "../../hooks/useProducts";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: products, isLoading, isError } = useProducts();

  // Dynamically extract categories
  const categoriesList = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  // Determine max product price dynamically for slider limits
  const maxProductPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  // Handle category multi-selection
  const handleCatToggle = (cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearch("");
    setSort("latest");
    setSelectedCats([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRating(0);
  };

  // Filter & Sort Logic
  const filtered = useMemo(() => {
    if (!products) return [];
    return products
      .filter((p) => {
        // Search text
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        
        // Category selection
        const matchesCat = selectedCats.length === 0 || selectedCats.includes(p.category);
        
        // Price limits
        const numericMin = minPrice !== "" ? parseFloat(minPrice) : 0;
        const numericMax = maxPrice !== "" ? parseFloat(maxPrice) : Infinity;
        const matchesPrice = p.price >= numericMin && p.price <= numericMax;
        
        // Rating limit
        const matchesRating = !p.rating || p.rating >= minRating;

        return matchesSearch && matchesCat && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        if (sort === "price_asc") return a.price - b.price;
        if (sort === "price_desc") return b.price - a.price;
        if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0; // Default to latest (as API order)
      });
  }, [products, search, selectedCats, minPrice, maxPrice, minRating, sort]);

  const FilterSidebarContent = () => (
    <div className="space-y-8">
      {/* Search (Desktop only shows it in search bar, sidebar is additional) */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 uppercase tracking-wider">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-xs text-blue-700 dark:text-blue-400 font-semibold hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category Multi-select */}
      <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
        <h4 className="text-xs font-bold text-gray-800 dark:text-slate-350 uppercase tracking-wider mb-4">Categories</h4>
        <div className="space-y-2">
          {categoriesList.map((cat) => (
            <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat)}
                onChange={() => handleCatToggle(cat)}
                className="rounded border-gray-300 dark:border-slate-700 text-blue-700 focus:ring-blue-500 w-4 h-4 accent-blue-750"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Limit inputs */}
      <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
        <h4 className="text-xs font-bold text-gray-800 dark:text-slate-350 uppercase tracking-wider mb-4">Price Range</h4>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full text-xs bg-gray-100 dark:bg-slate-800 rounded-lg pl-6 pr-3 py-2.5 outline-none focus:ring-1 focus:ring-blue-700 text-gray-800 dark:text-slate-100"
            />
          </div>
          <span className="text-gray-400 text-xs">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">$</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-xs bg-gray-100 dark:bg-slate-800 rounded-lg pl-6 pr-3 py-2.5 outline-none focus:ring-1 focus:ring-blue-700 text-gray-800 dark:text-slate-100"
            />
          </div>
        </div>
        {/* Simple slider as helper */}
        <input
          type="range"
          min="0"
          max={maxProductPrice}
          value={maxPrice === "" ? maxProductPrice : maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full mt-4 accent-blue-700 dark:accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>$0</span>
          <span>Max: ${maxProductPrice}</span>
        </div>
      </div>

      {/* Ratings stars selector */}
      <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
        <h4 className="text-xs font-bold text-gray-800 dark:text-slate-350 uppercase tracking-wider mb-4">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => setMinRating(stars)}
              className={`flex items-center gap-2 text-xs w-full text-left p-1.5 rounded-lg transition-colors ${
                minRating === stars
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-semibold"
                  : "text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < stars ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-slate-700"
                    }`}
                  />
                ))}
              </div>
              <span>& Up</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMinRating(0)}
            className={`flex items-center gap-2 text-xs w-full text-left p-1.5 rounded-lg transition-colors ${
              minRating === 0
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-semibold"
                : "text-gray-650 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
            }`}
          >
            <span>Show All Ratings</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50 mb-2">All Products</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-900 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Desktop Sidebar (lg:block, otherwise hidden) */}
        <div className="hidden lg:block lg:col-span-1 border border-gray-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 rounded-2xl h-fit sticky top-28">
          <FilterSidebarContent />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-100 dark:bg-slate-900 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-1 focus:ring-blue-700 text-gray-800 dark:text-slate-100"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-450 dark:text-gray-400 whitespace-nowrap">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-gray-100 dark:bg-slate-900 text-gray-850 dark:text-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-blue-700 cursor-pointer border-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-slate-800 rounded-xl aspect-square mb-3" />
                  <div className="bg-gray-200 dark:bg-slate-800 h-4 rounded mb-2" />
                  <div className="bg-gray-200 dark:bg-slate-800 h-3 rounded w-1/2" />
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

          {/* Empty */}
          {filtered.length === 0 && !isLoading && (
            <div className="text-center py-24 bg-gray-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                No products found matching your filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 bg-blue-700 dark:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Slide-over */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-100 lg:hidden flex bg-black/45 dark:bg-black/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setMobileFiltersOpen(false)} />
          
          <div className="relative w-full max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col p-6 overflow-y-auto border-r border-gray-100 dark:border-slate-800 animate-slideRight">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-150 dark:border-slate-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50">Filter Options</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-850 flex items-center justify-center text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <FilterSidebarContent />

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 bg-blue-700 dark:bg-blue-600 text-white py-3.5 rounded-xl text-xs font-semibold hover:bg-blue-800 transition-colors text-center w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

