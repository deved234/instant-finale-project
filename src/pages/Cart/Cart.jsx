import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShieldCheck, Truck, Lock } from "lucide-react";
import useCartStore from "../../store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shipping = 0;
  const tax = subtotal * 0.076;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} item{items.length > 1 ? "s" : ""} in your bag
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 pb-6 border-b border-gray-100"
            >
              {/* Image */}
              <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 capitalize mb-3">
                      {item.category}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated Shipping</span>
                <span className="font-medium text-green-600">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6">
              <div>
                <p className="font-bold text-gray-900">Total</p>
                <p className="text-xs text-gray-400">Including VAT</p>
              </div>
              <span className="text-2xl font-bold text-blue-700">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-700 text-white py-4 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Promo Code */}
            <div className="flex items-center justify-between border border-gray-100 rounded-xl p-4 mb-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  🏷️
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Apply Promo Code
                  </p>
                  <p className="text-xs text-gray-400">
                    LUXE MEMBERS GET 10% OFF
                  </p>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  label: "2-YEAR WARRANTY",
                },
                { icon: <Truck className="w-5 h-5" />, label: "FREE SHIPPING" },
                { icon: <Lock className="w-5 h-5" />, label: "SECURE SSL" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <div className="text-gray-400">{badge.icon}</div>
                  <span className="text-xs text-gray-400">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Support */}
            <p className="text-center text-xs text-gray-400">
              Need help?{" "}
              <Link to="/" className="text-blue-700 underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
