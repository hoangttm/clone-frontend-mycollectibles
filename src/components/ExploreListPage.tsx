import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon } from "./Icons";
import { exploreService, type ExploreCard, type ExplorePod } from "../services";

// Type definitions
type ExploreType = "featured" | "open" | "hot";
type ExploreItem = ExploreCard | ExplorePod;

// Page titles mapping
const pageTitles: Record<ExploreType, string> = {
  featured: "Featured",
  open: "Open pods",
  hot: "Best performance pod",
};

// Helper to determine if item is a card
const isCardItem = (
  _item: ExploreItem,
  type: ExploreType,
): _item is ExploreCard => {
  return type === "featured";
};

// Icons
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.19071C7.54305 8.46214 6.6582 8 5.66667 8C4.00028 8 2.66667 9.33361 2.66667 11C2.66667 12.6664 4.00028 14 5.66667 14C6.6582 14 7.54305 13.5379 8.08261 12.8093L15.0227 16.6294C15.0077 16.7508 15 16.8745 15 17C15 18.6569 16.3431 20 18 20C19.6569 20 21 18.6569 21 17C21 15.3431 19.6569 14 18 14C17.0085 14 16.1236 14.4621 15.5841 15.1907L8.64398 11.3706C8.65904 11.2492 8.66667 11.1255 8.66667 11C8.66667 10.8745 8.65904 10.7508 8.64398 10.6294L15.5841 6.80929C16.1236 7.53786 17.0085 8 18 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TransactionIcon = ({ type }: { type: string }) => {
  // Different colors based on transaction type
  const getColor = () => {
    switch (type) {
      case "invest_in_kind":
        return "bg-blue-100";
      case "invest_in_cash":
        return "bg-green-100";
      case "withdrawal":
        return "bg-orange-100";
      case "cash_out":
        return "bg-gray-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      className={`w-10 h-10 rounded-full ${getColor()} flex items-center justify-center`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
          fill="#EABC65"
        />
      </svg>
    </div>
  );
};

// Price change component
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

// List item component
interface ListItemProps {
  item: ExploreItem;
  type: ExploreType;
  isSelected: boolean;
  onClick: () => void;
}

const ListItem = ({ item, type, isSelected, onClick }: ListItemProps) => {
  const isCard = isCardItem(item, type);
  const price = isCard
    ? (item as ExploreCard).price
    : (item as ExplorePod).totalNav;
  const changePct = isCard
    ? (item as ExploreCard).priceChangePct
    : (item as ExplorePod).totalNavChangePct;
  const changeUsd = isCard
    ? (item as ExploreCard).priceChangeUsd
    : (item as ExplorePod).totalNavChangeUsd;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 py-6 px-6 transition-colors text-left border-b border-gray-100 ${
        isSelected ? "bg-brand/5" : "hover:bg-gray-50"
      }`}
    >
      <div className="w-16 h-21.5 shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {price !== null && (
            <span className="text-sm font-bold text-gray-900">
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
    </button>
  );
};

// Transaction type labels
const getTransactionTypeLabel = (type: string) => {
  switch (type) {
    case "invest_in_kind":
      return "Invest in-kind";
    case "invest_in_cash":
      return "Invest in cash";
    case "withdrawal":
      return "Withdrawal";
    case "cash_out":
      return "Cash out";
    default:
      return type;
  }
};

// Mock transaction data (would come from API in real app)
const mockTransactions = [
  {
    id: "1",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "invest_in_kind",
  },
  {
    id: "2",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "invest_in_cash",
  },
  {
    id: "3",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "withdrawal",
  },
  {
    id: "4",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "cash_out",
  },
  {
    id: "5",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "cash_out",
  },
  {
    id: "6",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "cash_out",
  },
  {
    id: "7",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "cash_out",
  },
  {
    id: "8",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "cash_out",
  },
];

// Transaction item component
interface TransactionItemProps {
  transaction: {
    id: string;
    title: string;
    date: string;
    amount: number;
    type: string;
  };
}

const TransactionItem = ({ transaction }: TransactionItemProps) => (
  <div className="flex items-center gap-3 py-4 border-b border-gray-100">
    <TransactionIcon type={transaction.type} />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">
        {transaction.title}
      </p>
      <p className="text-xs text-gray-500">{transaction.date}</p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-sm font-bold text-gray-900">
        ${transaction.amount.toFixed(2)}
      </p>
      <p className="text-xs text-gray-500">
        {getTransactionTypeLabel(transaction.type)}
      </p>
    </div>
  </div>
);

// Detail panel component
interface DetailPanelProps {
  item: ExploreItem;
  type: ExploreType;
}

const DetailPanel = ({ item }: DetailPanelProps) => {
  return (
    <div className="flex-1 p-6 flex flex-col h-full">
      {/* Item Header */}
      <div className="flex gap-4 pb-6 border-b border-gray-100">
        <div className="w-20 h-27 shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
            {item.name}
          </h2>
        </div>
        <button className="text-gray-400 hover:text-gray-600 self-start">
          <ShareIcon />
        </button>
      </div>

      {/* Transaction History */}
      <div className="flex-1 overflow-y-auto py-4">
        <div>
          {mockTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
        {/* {isCard ? (
          <button className="px-6 h-10 bg-brand text-white font-medium text-sm rounded-full hover:bg-brand/90 transition-colors">
            View details
          </button>
        ) : (
          <> */}
        <button className="px-6 h-10 text-brand font-medium text-sm hover:underline transition-colors">
          Request withdrawal
        </button>
        <button className="px-6 h-10 bg-brand text-white font-medium text-sm rounded-full hover:bg-brand/90 transition-colors">
          View details
        </button>
        {/* </>
        )} */}
      </div>
    </div>
  );
};

// Loading skeleton
const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl flex overflow-hidden h-[calc(100vh-180px)] animate-pulse">
    <div className="w-90 shrink-0 border-r border-gray-100">
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 py-6 px-6 border-b border-gray-100"
        >
          <div className="w-16 h-21.5 bg-gray-200 rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
    <div className="flex-1 p-6">
      <div className="flex gap-4 pb-6">
        <div className="w-20 h-27 bg-gray-200 rounded-xl" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  </div>
);

// Main component
const ExploreListPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const exploreType = (type || "featured") as ExploreType;
  const pageTitle = pageTitles[exploreType] || "Explore";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        switch (exploreType) {
          case "featured":
            response = await exploreService.getFeatured({ limit: 20 });
            break;
          case "open":
            response = await exploreService.getOpenPods({ limit: 20 });
            break;
          case "hot":
            response = await exploreService.getHotPods({ limit: 20 });
            break;
          default:
            response = await exploreService.getFeatured({ limit: 20 });
        }
        setItems(response.items);
        if (response.items.length > 0) {
          setSelectedItem(response.items[0]);
        }
      } catch (error) {
        console.error("Failed to fetch explore items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [exploreType]);

  const handleBack = () => {
    navigate("/explore");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex gap-6 p-6">
          <Sidebar />
          <main className="flex-1">
            <LoadingSkeleton />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-6 p-6">
        <Sidebar />
        <main className="flex-1">
          <div className="bg-white rounded-2xl flex overflow-hidden h-[calc(100vh-180px)]">
            {/* Item List */}
            <div className="w-90 shrink-0 flex flex-col border-r border-gray-100">
              {/* Header with back button and title */}
              <div className="p-6 border-b border-gray-100">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ChevronLeftIcon size={20} />
                  <span className="text-sm">Back</span>
                </button>
                <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {items.length > 0 ? (
                  items.map((item) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      type={exploreType}
                      isSelected={selectedItem?.id === item.id}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No items available
                  </div>
                )}
              </div>
            </div>

            {/* Detail Panel */}
            {selectedItem && (
              <DetailPanel item={selectedItem} type={exploreType} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExploreListPage;
