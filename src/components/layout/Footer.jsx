import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-blue-700 font-bold text-xl mb-3">LuxeRetail</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Redefining modern elegance through curated minimalist design and
              premium craftsmanship since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "New Arrivals",
                "Best Sellers",
                "Gift Cards",
                "Sale & Offers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {[
                "Shipping Policy",
                "Returns & Exchanges",
                "Track My Order",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2024 LuxeRetail. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
