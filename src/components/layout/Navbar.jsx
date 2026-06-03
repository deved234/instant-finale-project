import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { ShoppingBag, Search, Heart, User, Menu, X } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useWishlistStore from "../../store/wishlistStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalWished = useWishlistStore((state) => state.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
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
            <div className="hidden sm:flex items-center gap-3">
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
              className="hidden sm:inline-flex text-sm font-semibold text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden max-w-7xl mx-auto pt-5">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-slate-200/60">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
