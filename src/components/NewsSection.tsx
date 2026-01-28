import { NewspaperIcon } from './Icons';
import NewsCard from './NewsCard';
import { newsItems } from '../data/mockData';

const NewsSection = () => {
  // Get the first item for the featured large card
  const featuredNews = newsItems[0];
  // Get the rest for the smaller cards
  const otherNews = newsItems.slice(1, 5);

  return (
    <section className="bg-white rounded-2xl p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <NewspaperIcon size={24} className="text-brand" />
          <h2 className="text-lg font-bold text-gray-900">News</h2>
        </div>
        <a href="/news" className="text-sm font-medium text-brand hover:underline">
          View all
        </a>
      </div>

      {/* News Grid */}
      <div className="flex gap-4">
        {/* Featured News - Large Card */}
        <div className="w-[376px] shrink-0">
          <NewsCard
            news={featuredNews}
            size="large"
            showPagination
            showNavigation
          />
        </div>

        {/* Other News - Small Cards Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {otherNews.map((news) => (
            <NewsCard key={news.id} news={news} size="small" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
