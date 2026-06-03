import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          🤍
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-sm mb-8">
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} item{items.length > 1 ? "s" : ""} saved
          </p>
        </div>
        <button
          onClick={clearWishlist}
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
            className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <Link to={`/product/${item.id}`}>
              <div className="bg-gray-100 aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Info */}
            <div className="p-4">
              <p className="text-xs text-gray-400 capitalize mb-1">
                {item.category}
              </p>
              <Link to={`/product/${item.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="text-sm font-bold text-blue-700 mb-4">
                ${item.price}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addItem(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
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
