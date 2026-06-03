import { Link } from "react-router-dom";
import { Truck, MapPin, Package } from "lucide-react";
import useAuthStore from "../../store/authStore";

const OrderConfirmation = () => {
  const { user } = useAuthStore();

  const orderNumber = `#LX-${Math.floor(Math.random() * 9000000 + 1000000)}`;

  const today = new Date();
  const deliveryStart = new Date(today);
  const deliveryEnd = new Date(today);
  deliveryStart.setDate(today.getDate() + 2);
  deliveryEnd.setDate(today.getDate() + 4);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Truck className="w-10 h-10 text-green-600" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          Confirmation
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Shipped</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Great news! Your premium selection has been carefully packaged and is
          now on its way to you. Get ready for a touch of luxury at your
          doorstep.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        {/* Order Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          {/* Order Number + Delivery */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Order Number
              </p>
              <p className="text-lg font-bold text-blue-700">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Estimated Delivery
              </p>
              <p className="text-lg font-bold text-green-600">
                {formatDate(deliveryStart)} – {formatDate(deliveryEnd)}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
            {[
              {
                name: "Ascend Series Wristwatch",
                variant: "Titanium / Alpine White",
                price: "$249.00",
                img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
              },
              {
                name: "Nomad Leather Weekender",
                variant: "Midnight Black / Full Grain",
                price: "$395.00",
                img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100",
              },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.variant}</p>
                  <p className="text-xs text-gray-400">Quantity: 1</p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors">
              <Package className="w-4 h-4" />
              Track My Package
            </button>
            <button className="text-sm text-blue-700 underline">
              View Order Receipt
            </button>
          </div>
        </div>

        {/* Shipping + Carrier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Shipping Address
              </p>
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1">
              {user?.name || "Guest User"}
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              1280 Boutique Avenue, Suite 402
              <br />
              Manhattan, NY 10012
              <br />
              United States
            </p>
          </div>

          {/* Carrier */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Carrier
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                🚀
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  LuxeExpress Prime
                </p>
                <p className="text-xs text-gray-400">Standard Air Freight</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support + Continue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Support */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <p className="text-sm font-bold text-gray-900 mb-2">
              Need assistance?
            </p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Our dedicated support team is available 24/7 for our premium
              members.
            </p>
            <button className="w-full border border-blue-700 text-blue-700 py-3 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
              Chat with Support
            </button>
          </div>

          {/* Continue Shopping */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
            <p className="text-sm text-gray-500 mb-4">
              Looking for more inspiration?
            </p>
            <Link
              to="/"
              className="w-full border border-gray-200 text-gray-900 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors text-center block"
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
