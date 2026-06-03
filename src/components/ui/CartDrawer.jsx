import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import useCartStore from "../../store/cartStore";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore();

  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Close drawer on clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isCartOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        // Check if click was on the toggle cart button or wishlist cart button to avoid conflict
        if (!e.target.closest("a[href='/cart']") && !e.target.closest("button[aria-label='Toggle menu']")) {
          setCartOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCartOpen, setCartOpen]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCheckoutRedirect = () => {
    setCartOpen(false);
    navigate("/cart");
  };

  if (!isCartOpen) return null;

  const subtotal = getTotalPrice();

  return (
    <div className="fixed inset-0 z-100 flex justify-end bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform translate-x-0 border-l border-gray-100 dark:border-slate-800"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-700 dark:text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-50">Your Bag</h2>
            <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-gray-300 dark:text-slate-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Your bag is empty</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-[200px] mx-auto">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 bg-blue-700 dark:bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-4 border-b border-gray-100 dark:border-slate-800/60"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-slate-100 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 capitalize mb-2">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-md">
                      <button
                        onClick={() =>
                          item.quantity === 1
                            ? removeItem(item.id)
                            : updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-gray-700 dark:text-slate-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-gray-900 dark:text-slate-100">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-slate-800 p-6 bg-gray-50 dark:bg-slate-900/60 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="font-bold text-gray-900 dark:text-slate-50">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed">
              Shipping and taxes calculated at checkout. Free shipping on orders over $150.
            </p>

            <div className="grid gap-2">
              <button
                onClick={handleCheckoutRedirect}
                className="w-full bg-blue-700 dark:bg-blue-600 text-white py-3 rounded-xl text-xs font-semibold hover:bg-blue-800 dark:hover:bg-blue-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCartOpen(false)}
                className="w-full border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3 rounded-xl text-xs font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
