import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";
import useToastStore from "../../store/toastStore";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const handleAddToCart = (item) => {
    addItem(item);
    showToast("Added to your bag");
  };

  const handleRemove = (id) => {
    removeItem(id);
    showToast("Removed from wishlist", "info");
  };

  const handleClearAll = () => {
    clearWishlist();
    showToast("Wishlist cleared", "info");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          🤍
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">
          Save items you love and come back to them later.
        </p>
        <Link
          to="/shop"
          className="bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Wishlist</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {items.length} item{items.length > 1 ? "s" : ""} saved
          </p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-md dark:hover:shadow-black/30 transition-shadow"
          >
            {/* Image */}
            <Link to={`/product/${item.id}`}>
              <div className="bg-gray-100 dark:bg-slate-800 aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Info */}
            <div className="p-4">
              <p className="text-xs text-gray-400 dark:text-slate-500 capitalize mb-1">
                {item.category}
              </p>
              <Link to={`/product/${item.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1 truncate hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-4">
                ${item.price}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-slate-700 rounded-lg text-gray-500 dark:text-slate-400 hover:border-red-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
