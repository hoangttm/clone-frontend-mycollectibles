import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronUpIcon, ChevronDownIcon } from "./Icons";

// Search results mock data
const searchResultCards = [
  {
    id: "s1",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s2",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s3",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s4",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s5",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s6",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s7",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "s8",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 89.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
];

// Recently viewed mock data
const recentlyViewedCards = [
  {
    id: "1",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "2",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "3",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "4",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "5",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "6",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "7",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "8",
    name: "The New Pokemon...",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 125.8,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
];

// Copy Icon (dark version for white backgrounds)
const CopyIconDark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
  </svg>
);

// Copy Icon (light version for colored backgrounds)
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

// Large Search Icon for No Results
const LargeSearchIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle
      cx="35"
      cy="35"
      r="22"
      stroke="#D1D5DB"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M52 52L68 68"
      stroke="#D1D5DB"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

// Search Result Card - White background variant (for first row)
const SearchResultCard = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceChange: number;
    priceChangePercent: number;
  };
}) => {
  const isPositive = product.priceChange >= 0;

  return (
    <div className="w-40 shrink-0">
      {/* Image Container */}
      <div className="relative h-36 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Copy Button */}
        <button className="absolute top-2 right-2 p-1 bg-white/80 rounded-md hover:bg-white transition-colors">
          <CopyIconDark />
        </button>
      </div>

      {/* Info - Below image */}
      <div className="pt-2">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-1">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ChevronUpIcon size={12} className="text-positive" />
          ) : (
            <ChevronDownIcon size={12} className="text-negative" />
          )}
          <span
            className={`text-xs font-medium ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            +${Math.abs(product.priceChange).toFixed(2)} (+
            {Math.abs(product.priceChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

// Product Card Component - Blue background variant (for second row)
const ProductCard = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceChange: number;
    priceChangePercent: number;
  };
}) => {
  const isPositive = product.priceChange >= 0;

  return (
    <div className="w-40 shrink-0">
      {/* Image Container - Light blue/lavender background */}
      <div className="relative h-36 rounded-2xl overflow-hidden bg-blue-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Copy Button */}
        <button className="absolute top-2 right-2 p-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors">
          <CopyIcon />
        </button>
      </div>

      {/* Info - Below image */}
      <div className="pt-2">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-1">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ChevronUpIcon size={12} className="text-positive" />
          ) : (
            <ChevronDownIcon size={12} className="text-negative" />
          )}
          <span
            className={`text-xs font-medium ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            +${Math.abs(product.priceChange).toFixed(2)} (+
            {Math.abs(product.priceChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

// Search Page Component
const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const hasResults = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-2xl">
          {hasResults ? (
            /* Results Section */
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Results</h3>

              {/* First Row - 2 cards with white background */}
              <div className="flex gap-4 mb-6">
                {searchResultCards.slice(0, 2).map((card) => (
                  <SearchResultCard key={card.id} product={card} />
                ))}
              </div>

              {/* Second Row - 6 cards with blue background */}
              <div className="flex gap-4 flex-wrap">
                {searchResultCards.slice(2).map((card) => (
                  <ProductCard key={card.id} product={card} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* No Results Section */}
              <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center mb-6">
                <LargeSearchIcon />
                <h2 className="text-xl font-bold text-gray-900 mt-6">
                  No results found
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Please try another keyword.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Recently Viewed Card Section */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Recently viewed card
                </h3>

                {/* First Row - 2 cards with different style */}
                <div className="flex gap-4 mb-4">
                  {recentlyViewedCards.slice(0, 2).map((card) => (
                    <div
                      key={card.id}
                      className="w-40 shrink-0 rounded-2xl overflow-hidden relative"
                    >
                      {/* Full Image Background */}
                      <div className="relative h-44">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Copy Button */}
                        <button className="absolute top-2 right-2 p-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors">
                          <CopyIcon />
                        </button>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <p className="text-sm font-medium truncate">
                            {card.name}
                          </p>
                          <p className="text-sm font-bold">
                            ${card.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-1">
                            <ChevronUpIcon size={12} className="text-positive" />
                            <span className="text-xs font-medium text-positive">
                              +${card.priceChange.toFixed(2)} (+
                              {card.priceChangePercent.toFixed(2)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second Row - Scrollable cards */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {recentlyViewedCards.slice(2).map((card) => (
                    <ProductCard key={card.id} product={card} />
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
