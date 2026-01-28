import { ChevronUpIcon, ChevronDownIcon } from './Icons';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isPositive = product.priceChange >= 0;

  return (
    <div className="relative w-full h-[275px] rounded-2xl overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover bg-gradient-to-br from-blue-200 to-blue-400"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-base font-bold mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
          <div className={`flex items-center gap-0.5 ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {isPositive ? (
              <ChevronUpIcon size={18} />
            ) : (
              <ChevronDownIcon size={18} />
            )}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}${product.priceChange.toFixed(2)} ({isPositive ? '+' : ''}{product.priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
