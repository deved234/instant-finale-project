import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "../../components/ui/ProductCard";
import { useProducts } from "../../hooks/useProducts";

const Category = () => {
  const { name } = useParams();

  const { data: products, isLoading, isError } = useProducts();

  const filtered = products?.filter((p) => p.category === name);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back */}
      <Link
        to="/categories"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">
          {name}
        </h1>
        <p className="text-sm text-gray-500">
          {filtered?.length || 0} products found
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-square mb-3" />
              <div className="bg-gray-200 h-4 rounded mb-2" />
              <div className="bg-gray-200 h-3 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-red-500 text-sm text-center py-12">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Empty */}
      {filtered?.length === 0 && !isLoading && (
        <div className="text-center py-24">
          <p className="text-gray-400 text-sm">No products found in "{name}"</p>
          <Link
            to="/categories"
            className="mt-4 inline-block text-blue-700 text-sm font-semibold"
          >
            Back to Categories
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {filtered && filtered.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
