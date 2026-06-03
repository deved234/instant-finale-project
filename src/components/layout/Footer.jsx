import { Link } from "react-router-dom";

const footerGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "New Arrivals", to: "/shop" },
      { label: "Best Sellers", to: "/shop" },
      { label: "Gift Cards", to: "/about" },
      { label: "Sale & Offers", to: "/shop" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping Policy", to: "/about" },
      { label: "Returns & Exchanges", to: "/about" },
      { label: "Track My Order", to: "/order-confirmation" },
      { label: "Contact Us", to: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/about" },
      { label: "Terms of Service", to: "/about" },
      { label: "Cookie Policy", to: "/about" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-blue-700 font-bold text-xl mb-3">LuxeRetail</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Redefining modern elegance through curated minimalist design and
              premium craftsmanship since 2024.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            (c) 2024 LuxeRetail. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerGroups[2].links.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
