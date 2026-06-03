import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { ShoppingBag, Search, Heart, User, Menu, X, Sun, Moon } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useWishlistStore from "../../store/wishlistStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalWished = useWishlistStore((state) => state.getTotalItems());
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  // Dark/Light Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
    <nav className="border-b border-gray-100 dark:border-slate-800 px-6 py-4 sticky top-0 bg-white dark:bg-slate-950/80 dark:backdrop-blur-md z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-blue-700 dark:text-blue-500 font-bold text-xl transition-colors">
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
                    ? "text-blue-700 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100"
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
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <Heart className="w-5 h-5" />
            {totalWished > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalWished}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 dark:text-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
                aria-label="User Profile"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold max-w-[100px] truncate text-gray-700 dark:text-slate-350">{user?.name || "Profile"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-gray-405 dark:text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm font-semibold text-white bg-blue-700 dark:bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden max-w-7xl mx-auto pt-5">
          <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl shadow-slate-200/60 dark:shadow-black/40">
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
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-100 dark:border-slate-800 pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full rounded-xl border border-gray-200 dark:border-slate-800 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-slate-350 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-gray-900 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-black dark:hover:bg-slate-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-xl bg-blue-700 dark:bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors"
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
