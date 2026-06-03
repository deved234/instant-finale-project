import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Truck, Minus, Plus } from "lucide-react";
import axios from "axios";
import useCartStore from "../../store/cartStore";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      axios
        .get(`https://6a1f9defe96c1d13b5860ddd.mockapi.io/products/${id}`)
        .then((res) => res.data),
  });

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    navigate("/cart");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-200 rounded-2xl aspect-square" />
          <div className="space-y-4">
            <div className="bg-gray-200 h-6 rounded w-1/3" />
            <div className="bg-gray-200 h-10 rounded w-2/3" />
            <div className="bg-gray-200 h-8 rounded w-1/4" />
            <div className="bg-gray-200 h-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-red-500">Something went wrong. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square mb-4">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {[product?.image, product?.image, product?.image].map(
                (img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`bg-gray-100 rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
                      activeImg === i ? "border-blue-700" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700 mb-2">
              {product?.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product?.title}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-700">
                ${product?.price}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              {product?.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                  navigate("/cart");
                }}
                className="flex-1 bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-blue-700 text-blue-700 py-3 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            {/* Perks */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-blue-700" />
                <span className="text-sm text-gray-600">
                  Complimentary shipping on orders over $150
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span className="text-sm text-gray-600">
                  2-year premium quality guarantee
                </span>
              </div>
            </div>

            {/* Accordion */}
            <div className="mt-6 border-t border-gray-100 pt-4">
              <button className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-900">
                Product Specifications
                <span>↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <section className="bg-amber-50 py-20 text-center mt-8">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">
          The Art of Radiance
        </h2>
        <p className="text-amber-700 text-sm max-w-md mx-auto mb-6">
          Discover a collection where science meets serenity, and every
          application is a moment of pure luxury designed to elevate your
          spirit.
        </p>
        <button className="border border-amber-900 text-amber-900 px-6 py-3 rounded-full text-sm hover:bg-amber-100 transition-colors">
          Explore the Science
        </button>
      </section>
    </div>
  );
};

export default Product;
