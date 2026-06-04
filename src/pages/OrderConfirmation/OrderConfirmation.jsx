import { Link } from "react-router-dom";
import { Truck, MapPin, Package } from "lucide-react";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";

const OrderConfirmation = () => {
  const { user } = useAuthStore();
  const currentOrder = useOrderStore((state) => state.currentOrder);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center px-6 transition-colors duration-300">
        <div className="max-w-md text-center bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-blue-700 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">
            No recent order found
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-8">
            Add products to your cart and complete checkout to see your order
            confirmation here.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(currentOrder.createdAt);
  const deliveryStart = new Date(orderDate);
  const deliveryEnd = new Date(orderDate);
  deliveryStart.setDate(orderDate.getDate() + 2);
  deliveryEnd.setDate(orderDate.getDate() + 4);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const ship = currentOrder.shippingAddress;
  const shipName = ship?.name || user?.name || "Guest User";
  const shipLines = ship
    ? [ship.street, `${ship.city}${ship.zipCode ? `, ${ship.zipCode}` : ""}`, ship.country].filter(
        Boolean,
      )
    : user?.address
      ? [
          user.address.street,
          `${user.address.city}${user.address.zipCode ? `, ${user.address.zipCode}` : ""}`,
          user.address.country,
        ].filter(Boolean)
      : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero confirmation banner */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-900 dark:to-slate-950 py-16 text-center">
        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Truck className="w-10 h-10 text-green-600" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-slate-500 mb-2">
          Confirmation
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-4">
          Order Confirmed
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          Your premium selection has been carefully packaged and is now on its
          way to you.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        {/* Order Details Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1">
                Order Number
              </p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                {currentOrder.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1">
                Estimated Delivery
              </p>
              <p className="text-lg font-bold text-green-600">
                {formatDate(deliveryStart)} - {formatDate(deliveryEnd)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 capitalize">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-slate-100">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-slate-100">
                ${currentOrder.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">Shipping</span>
              <span className="font-medium text-green-600">
                ${currentOrder.shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">Tax</span>
              <span className="font-medium text-gray-900 dark:text-slate-100">${currentOrder.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base pt-3 border-t border-gray-100 dark:border-slate-800">
              <span className="font-bold text-gray-900 dark:text-slate-50">Total</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">
                ${currentOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors">
              <Package className="w-4 h-4" />
              Track My Package
            </button>
            <button className="text-sm text-blue-700 dark:text-blue-400 underline">
              View Order Receipt
            </button>
          </div>
        </div>

        {/* Address & Carrier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                Shipping Address
              </p>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-1">
              {shipName}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              {shipLines ? (
                shipLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))
              ) : (
                <>
                  1280 Boutique Avenue, Suite 402
                  <br />
                  Manhattan, NY 10012
                  <br />
                  United States
                </>
              )}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                Carrier
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">
                  LuxeExpress Prime
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500">Standard Air Freight</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Continue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6">
            <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-2">
              Need assistance?
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
              Our dedicated support team is available 24/7 for our premium
              members.
            </p>
            <button className="w-full border border-blue-700 dark:border-blue-500 text-blue-700 dark:text-blue-400 py-3 rounded-xl text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
              Chat with Support
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Looking for more inspiration?
            </p>
            <Link
              to="/"
              className="w-full border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-slate-100 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
