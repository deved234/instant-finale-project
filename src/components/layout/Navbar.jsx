import { Link, useNavigate, NavLink } from "react-router-dom";
import { ShoppingBag, Search, Heart, User } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useWishlistStore from "../../store/wishlistStore";

const Navbar = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalWished = useWishlistStore((state) => state.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-blue-700 font-bold text-xl">
          LuxeRetail
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            onClick={() => navigate("/shop")}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Heart className="w-5 h-5" />
            {totalWished > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalWished}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
