import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import type { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  size?: 'large' | 'small';
  showPagination?: boolean;
  showNavigation?: boolean;
}

const NewsCard = ({
  news,
  size = 'small',
  showPagination = false,
  showNavigation = false
}: NewsCardProps) => {
  const isLarge = size === 'large';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
        isLarge ? 'h-[376px]' : 'h-[180px]'
      }`}
    >
      {/* Background Image */}
      <img
        src={news.image}
        alt={news.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Navigation Buttons */}
      {showNavigation && (
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-6">
          <button className="w-8 h-8 rounded-2xl bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors">
            <ChevronLeftIcon size={20} className="text-white" />
          </button>
          <button className="w-8 h-8 rounded-2xl bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors">
            <ChevronRightIcon size={20} className="text-white" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className={`font-bold line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
          {news.title}
        </h3>

        {/* Pagination Dots */}
        {showPagination && (
          <div className="flex items-center gap-1 mt-4">
            <div className="w-6 h-0.5 bg-white rounded-full" />
            <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            <div className="w-4 h-0.5 bg-white/20 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
