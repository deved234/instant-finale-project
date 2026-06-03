import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Heart } from "lucide-react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-blue-700 font-bold text-xl">
          LuxeRetail
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/shop"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Shop
          </Link>
          
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          <Heart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-gray-900" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
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
