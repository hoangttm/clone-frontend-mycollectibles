import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from "./Icons";
import { exploreService, type ExploreCard, type ExplorePod } from "../services";

// Section title component
interface SectionTitleProps {
  title: string;
  onViewAll?: () => void;
}

const SectionTitle = ({ title, onViewAll }: SectionTitleProps) => (
  <div className="flex items-center justify-between mb-4">
    {onViewAll ? (
      <button
        onClick={onViewAll}
        className="flex items-center justify-between w-full gap-1 text-gray-900 hover:text-brand transition-colors"
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <ChevronRightIcon size={20} />
      </button>
    ) : (
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    )}
  </div>
);

// Price change indicator component
interface PriceChangeProps {
  changePercent: number | null;
  changeUsd: number | null;
  size?: "sm" | "md";
}

const PriceChange = ({
  changePercent,
  changeUsd,
  size = "sm",
}: PriceChangeProps) => {
  if (changePercent === null && changeUsd === null) return null;

  const isPositive = (changePercent ?? 0) >= 0;
  const iconSize = size === "sm" ? 14 : 18;
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`flex items-center gap-0.5 ${isPositive ? "text-positive" : "text-negative"}`}
    >
      {isPositive ? (
        <ChevronUpIcon size={iconSize} />
      ) : (
        <ChevronDownIcon size={iconSize} />
      )}
      <span className={`${textSize} font-medium`}>
        {changeUsd !== null && (
          <>
            {isPositive ? "+" : ""}${changeUsd.toFixed(2)}
          </>
        )}
        {changePercent !== null && (
          <>
            {" "}
            ({isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%)
          </>
        )}
      </span>
    </div>
  );
};

// Featured card (large) component
interface FeaturedCardProps {
  item: ExploreCard | ExplorePod;
  type: "card" | "pod";
}

const FeaturedCard = ({ item, type }: FeaturedCardProps) => {
  const price =
    type === "card"
      ? (item as ExploreCard).price
      : (item as ExplorePod).totalNav;
  const changePct =
    type === "card"
      ? (item as ExploreCard).priceChangePct
      : (item as ExplorePod).totalNavChangePct;
  const changeUsd =
    type === "card"
      ? (item as ExploreCard).priceChangeUsd
      : (item as ExplorePod).totalNavChangeUsd;

  return (
    <div className="relative w-full h-full min-h-71 rounded-2xl overflow-hidden group cursor-pointer">
      {/* Background Image */}
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-200 to-blue-400" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-base font-bold mb-1 line-clamp-2">{item.name}</h3>
        <div className="flex items-center gap-2">
          {price !== null && (
            <span className="text-sm font-bold">${price.toFixed(2)}</span>
          )}
          <PriceChange
            changePercent={changePct}
            changeUsd={changeUsd}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

// List item (small) component
interface ListItemProps {
  item: ExploreCard | ExplorePod;
  type: "card" | "pod";
}

const ListItem = ({ item, type }: ListItemProps) => {
  const price =
    type === "card"
      ? (item as ExploreCard).price
      : (item as ExplorePod).totalNav;
  const changePct =
    type === "card"
      ? (item as ExploreCard).priceChangePct
      : (item as ExplorePod).totalNavChangePct;
  const changeUsd =
    type === "card"
      ? (item as ExploreCard).priceChangeUsd
      : (item as ExplorePod).totalNavChangeUsd;

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
      {/* Thumbnail */}
      <div className="w-20 h-26.5 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
          {item.name}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          {price !== null && (
            <span className="text-xs font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
          )}
          <PriceChange
            changePercent={changePct}
            changeUsd={changeUsd}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

// Section component with grid + list layout
interface ExploreSectionProps {
  title: string;
  items: (ExploreCard | ExplorePod)[];
  type: "card" | "pod";
  isLoading?: boolean;
  onViewAll?: () => void;
}

const ExploreSection = ({
  title,
  items,
  type,
  isLoading,
  onViewAll,
}: ExploreSectionProps) => {
  if (isLoading) {
    return (
      <section className="bg-white rounded-2xl p-6">
        <SectionTitle title={title} onViewAll={onViewAll} />
        <div className="flex gap-6 animate-pulse">
          <div className="w-[275px] h-[275px] bg-gray-200 rounded-2xl flex-shrink-0" />
          <div className="flex-1 grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <div className="w-12 h-12 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-white rounded-2xl p-6">
        <SectionTitle title={title} onViewAll={onViewAll} />
        <div className="text-center py-12 text-gray-500">
          No items available
        </div>
      </section>
    );
  }

  const [featured, ...rest] = items;
  const listItems = rest.slice(0, 6);

  return (
    <section className="bg-white rounded-2xl p-6">
      <SectionTitle title={title} onViewAll={onViewAll} />
      <div className="flex gap-6">
        {/* Featured card on left */}
        <div className="w-84 shrink-0">
          <FeaturedCard item={featured} type={type} />
        </div>

        {/* List items on right (2 columns x 3 rows) */}
        <div className="flex-1 grid grid-cols-2 gap-2 content-start">
          {listItems.map((item) => (
            <ListItem key={item.id} item={item} type={type} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExplorePage = () => {
  const navigate = useNavigate();
  const [featuredCards, setFeaturedCards] = useState<ExploreCard[]>([]);
  const [openPods, setOpenPods] = useState<ExplorePod[]>([]);
  const [hotPods, setHotPods] = useState<ExplorePod[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingOpen, setIsLoadingOpen] = useState(true);
  const [isLoadingHot, setIsLoadingHot] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch featured cards
      try {
        const featuredResponse = await exploreService.getFeatured({ limit: 7 });
        setFeaturedCards(featuredResponse.items);
      } catch (error) {
        console.error("Failed to fetch featured cards:", error);
      } finally {
        setIsLoadingFeatured(false);
      }

      // Fetch open pods
      try {
        const openResponse = await exploreService.getOpenPods({ limit: 7 });
        setOpenPods(openResponse.items);
      } catch (error) {
        console.error("Failed to fetch open pods:", error);
      } finally {
        setIsLoadingOpen(false);
      }

      // Fetch hot pods
      try {
        const hotResponse = await exploreService.getHotPods({ limit: 7 });
        setHotPods(hotResponse.items);
      } catch (error) {
        console.error("Failed to fetch hot pods:", error);
      } finally {
        setIsLoadingHot(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Featured Section */}
          <ExploreSection
            title="Featured"
            items={featuredCards}
            type="card"
            isLoading={isLoadingFeatured}
            onViewAll={() => navigate("/explore/featured")}
          />

          {/* Open Pods Section */}
          <ExploreSection
            title="Open pods"
            items={openPods}
            type="pod"
            isLoading={isLoadingOpen}
            onViewAll={() => navigate("/explore/open")}
          />

          {/* Best Performance Pod Section */}
          <ExploreSection
            title="Best performance pod"
            items={hotPods}
            type="pod"
            isLoading={isLoadingHot}
            onViewAll={() => navigate("/explore/hot")}
          />
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;
