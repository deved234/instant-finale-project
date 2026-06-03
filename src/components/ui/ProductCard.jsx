import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    items: wishlistItems,
  } = useWishlistStore();
  const wished = wishlistItems.some(
    (item) => String(item.id) === String(product.id),
  );

  return (
    <div className="group relative">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 aspect-square mb-3">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() =>
            wished ? removeFromWishlist(product.id) : addToWishlist(product)
          }
          className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${wished ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-slate-400"}`}
          />
        </button>

        {/* Sale Badge */}
        {product.sale && (
          <span className="absolute top-3 left-3 bg-blue-700 text-white text-xs px-2 py-1 rounded-full">
            SALE
          </span>
        )}

        {/* Quick Add */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-0 left-0 right-0 bg-blue-700 text-white text-sm py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <Link to={`/product/${product.id}`}>
        <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
            ${product.price}
          </span>
          {product.rating && (
            <span className="text-xs text-gray-400 dark:text-slate-500">⭐ {product.rating}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
