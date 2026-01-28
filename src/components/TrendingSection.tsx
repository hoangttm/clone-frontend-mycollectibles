import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, TrendingIcon } from './Icons';
import ProductCard from './ProductCard';
import { trendingProducts } from '../data/mockData';

const TrendingSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(trendingProducts.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const visibleProducts = trendingProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="bg-white rounded-2xl p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingIcon size={24} className="text-brand" />
          <h2 className="text-lg font-bold text-gray-900">Trending</h2>
        </div>
        <a href="/trending" className="text-sm font-medium text-brand hover:underline">
          View all
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeftIcon size={20} className="text-gray-600" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRightIcon size={20} className="text-gray-600" />
        </button>
      </div>
    </section>
  );
};

export default TrendingSection;
