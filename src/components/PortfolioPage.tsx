import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from "./Icons";
import badgeIcon from "../assets/icons/badge.svg";
import {
  myAssets,
  watchlistAssets,
  transactions,
} from "../data/mockData";
import type { Asset, Transaction } from "../types";
import {
  usersService,
  type PortfolioResponse,
  type PortfolioPeriod,
} from "../services";

const timePeriods = ["7D", "30D", "90D", "All"];

// Mock chart data for detail panels (to be replaced with real API data later)
const detailChartData = [
  { date: "2024-01-01", value: 850000 },
  { date: "2024-01-15", value: 880000 },
  { date: "2024-02-01", value: 920000 },
  { date: "2024-02-15", value: 950000 },
  { date: "2024-03-01", value: 910000 },
  { date: "2024-03-15", value: 940000 },
  { date: "2024-04-01", value: 1000000 },
];

// Performance chart mock data
const performanceAllocation = [
  { label: "Pokemon ponch...", value: 35, color: "#F97316" },
  { label: "Pikachu", value: 32, color: "#47E3FF" },
  { label: "Card abc", value: 33, color: "#C5FF8A" },
  { label: "Card xyz", value: 33, color: "#A855F7" },
  { label: "Other", value: 33, color: "#6B7280" },
];

// Performance items mock data
const performanceItems = [
  {
    id: "1",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "2",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "3",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "4",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "5",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
  {
    id: "6",
    name: "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 78.9,
    priceChange: 6.18,
    priceChangePercent: 5.1,
  },
];

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

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="2"
      width="16"
      height="20"
      rx="2"
      stroke="#9CA3AF"
      strokeWidth="1.5"
    />
    <path
      d="M8 7H16M8 11H16M8 15H12"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12.5" r="3" stroke="#9CA3AF" strokeWidth="1.5" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TransactionBadgeIcon = () => (
  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
        fill="#EABC65"
      />
    </svg>
    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-positive rounded-full flex items-center justify-center">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12L10 17L19 7"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value >= 1000 ? 0 : 2,
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
};

const getTransactionTypeLabel = (type: Transaction["type"]) => {
  switch (type) {
    case "invest_in_kind":
      return "Invest in-kind";
    case "invest_in_cash":
      return "Invest in cash";
    case "withdrawal":
      return "Withdrawal";
    case "cash_out":
      return "Cash out";
  }
};

// Asset List Item Component
const AssetListItem = ({
  asset,
  isSelected,
  onClick,
}: {
  asset: Asset;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const isPositive = asset.priceChange >= 0;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 py-6 px-6 transition-colors text-left relative border-b border-gray-100 ${
        isSelected ? "bg-brand/5" : "hover:bg-gray-50"
      }`}
    >
      {asset.type === "card" && (
        <img
          src={badgeIcon}
          alt="Badge"
          className="absolute top-0 right-2 w-6 h-6"
        />
      )}
      <div className="w-16 h-21.5 shrink-0">
        <img
          src={asset.image}
          alt={asset.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {asset.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-gray-900">
            ${asset.price.toFixed(2)}
          </span>
          <span
            className={`flex items-center text-xs font-medium ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            {isPositive ? (
              <ChevronUpIcon size={12} className="text-positive" />
            ) : (
              <ChevronDownIcon size={12} className="text-negative" />
            )}
            +${Math.abs(asset.priceChange).toFixed(2)} (+
            {Math.abs(asset.priceChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
    </button>
  );
};

// Transaction Item Component
const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <div className="flex items-center gap-3 py-4">
    <div className="w-10 h-10 shrink-0">
      <img
        src="https://images.pokemontcg.io/base1/4_hires.png"
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    </div>
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

// Transaction History Item for Detail View
const TransactionHistoryItem = ({
  title,
  date,
  amount,
  type,
}: {
  title: string;
  date: string;
  amount: number;
  type: "buy" | "sell";
}) => (
  <div className="flex items-center gap-3 py-4 border-b border-gray-100">
    <div className="w-10 h-10 shrink-0">
      <img
        src="https://images.pokemontcg.io/base1/4_hires.png"
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
    <div className="text-right shrink-0">
      <p className="text-sm font-bold text-gray-900">${amount.toFixed(2)}</p>
      <p
        className={`text-xs ${type === "buy" ? "text-positive" : "text-negative"}`}
      >
        {type === "buy" ? "Buy" : "Sell"}
      </p>
    </div>
  </div>
);

// List Item Component
const ListItem = ({
  label,
  value,
  showDivider = true,
}: {
  label: string;
  value: string;
  showDivider?: boolean;
}) => (
  <div
    className={`flex items-center justify-between py-2 ${showDivider ? "border-b border-gray-100" : ""}`}
  >
    <span className="text-sm text-gray-900">{label}</span>
    <span className="text-sm font-bold text-gray-900">{value}</span>
  </div>
);

// Performance Item Card Component
const PerformanceItemCard = ({
  item,
}: {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    priceChange: number;
    priceChangePercent: number;
  };
}) => {
  const isPositive = item.priceChange >= 0;

  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-4 flex gap-4 items-start">
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <p className="text-base font-medium text-gray-900 line-clamp-2">
          {item.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          <span
            className={`flex items-center text-xs font-medium ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            {isPositive ? (
              <ChevronUpIcon size={12} className="text-positive" />
            ) : (
              <ChevronDownIcon size={12} className="text-negative" />
            )}
            +${Math.abs(item.priceChange).toFixed(2)} (+
            {Math.abs(item.priceChangePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

// Allocation item type for pie chart
interface AllocationItem {
  label: string;
  value: number;
  color: string;
}

// Chart point type
interface ChartPoint {
  date: string;
  value: number;
}

// Portfolio Chart Section Props
interface PortfolioChartSectionProps {
  totalValue: number;
  priceChange: number;
  priceChangePercent: number;
  cashAvailable: number;
  holdings: number;
  chartData: ChartPoint[];
  allocation: AllocationItem[];
  selectedPeriod: PortfolioPeriod;
  onPeriodChange: (period: PortfolioPeriod) => void;
  isLoading?: boolean;
}

// Portfolio Chart Section
const PortfolioChartSection = ({
  totalValue,
  priceChange,
  priceChangePercent,
  cashAvailable,
  holdings,
  chartData,
  allocation,
  selectedPeriod,
  onPeriodChange,
  isLoading,
}: PortfolioChartSectionProps) => {
  const isPositive = priceChange >= 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 flex items-stretch gap-5 animate-pulse">
        <div className="flex flex-col justify-between w-80">
          <div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-16 bg-gray-200 rounded w-48 mb-3" />
            <div className="h-6 bg-gray-200 rounded w-32" />
          </div>
          <div className="flex gap-6">
            <div className="h-12 bg-gray-200 rounded w-24" />
            <div className="h-12 bg-gray-200 rounded w-24" />
          </div>
        </div>
        <div className="flex-1 bg-gray-100 rounded-2xl" />
        <div className="w-80 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 flex items-stretch gap-5">
      {/* Balance Info */}
      <div className="flex flex-col justify-between w-80">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold text-gray-900">Total value</p>
          <p
            className="text-6xl font-bold text-black"
            style={{ fontFamily: "'Inria Serif', serif" }}
          >
            {formatCurrency(totalValue)}
          </p>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <ChevronUpIcon size={24} className="text-positive" />
            ) : (
              <ChevronDownIcon size={24} className="text-negative" />
            )}
            <span className={`text-lg font-medium ${isPositive ? "text-positive" : "text-negative"}`}>
              {isPositive ? "+" : ""}${priceChange.toFixed(2)} ({isPositive ? "+" : ""}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Cash Available & Holdings */}
        <div className="flex gap-6">
          <div className="border-l-2 border-brand pl-4">
            <p className="text-[10px] font-medium text-gray-600">
              Cash available
            </p>
            <p className="text-base font-bold text-gray-900">
              {formatCurrency(cashAvailable)}
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4">
            <p className="text-[10px] font-medium text-gray-600">Holdings</p>
            <p className="text-base font-bold text-gray-900">
              {formatCurrency(holdings)}
            </p>
          </div>
        </div>
      </div>

      {/* Line Chart Section */}
      <div
        className="flex-1 flex flex-col border border-dashed border-brand rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
        }}
      >
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="colorValuePortfolio"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4e93d7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4e93d7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={["dataMin - 50000", "dataMax + 50000"]} hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4e93d7"
                strokeWidth={2}
                fill="url(#colorValuePortfolio)"
                dot={{ r: 3, fill: "#4e93d7", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#4e93d7", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time Period Tabs */}
        <div className="flex items-center justify-end">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => onPeriodChange(period as PortfolioPeriod)}
              className={`h-8 px-3 rounded-full text-xs font-normal transition-colors ${
                selectedPeriod === period
                  ? "border border-gray-700 text-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Donut Chart Section */}
      <div
        className="w-80 flex items-center gap-4 border border-dashed border-brand rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
        }}
      >
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocation}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1">
          {allocation.map((item, index) => (
            <div key={index} className="flex items-start gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-600">
                  {item.label}
                </p>
                <p className="text-xs font-bold text-gray-900">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Card Transaction Item Component (for items with badge)
const CardTransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <div className="flex items-center gap-3 py-4">
    <TransactionBadgeIcon />
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

// Simple Asset Detail Panel (before clicking View details)
const AssetDetailPanel = ({
  asset,
  onViewDetails,
  isWatchlist = false,
}: {
  asset: Asset;
  onViewDetails: () => void;
  isWatchlist?: boolean;
}) => {
  const isPositive = asset.priceChange >= 0;
  const assetTransactions = transactions.filter((t) => t.assetId === asset.id);
  const isCardType = asset.type === "card";

  return (
    <div className="flex-1 p-6 flex flex-col h-full">
      {/* Asset Header */}
      <div className="flex gap-4 pb-6 border-b border-gray-100">
        <div className="relative w-20 h-27 shrink-0">
          <img
            src={asset.image}
            alt={asset.name}
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Green check badge for card items (only for my assets, not watchlist) */}
          {asset.type === "card" && !isWatchlist && (
            <img
              src={badgeIcon}
              alt="Badge"
              className="absolute top-0 right-2 w-6 h-6"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
            {asset.name}
          </h2>
          <div className="flex items-center gap-6 mt-3">
            {isWatchlist ? (
              // Watchlist: show price without label
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${asset.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center text-sm font-medium ${
                    isPositive ? "text-positive" : "text-negative"
                  }`}
                >
                  {isPositive ? (
                    <ChevronUpIcon size={16} className="text-positive" />
                  ) : (
                    <ChevronDownIcon size={16} className="text-negative" />
                  )}
                  +${Math.abs(asset.priceChange).toFixed(2)} (+
                  {Math.abs(asset.priceChangePercent).toFixed(2)}%)
                </span>
              </div>
            ) : isCardType ? (
              // Card type: just show price
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${asset.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center text-sm font-medium ${
                    isPositive ? "text-positive" : "text-negative"
                  }`}
                >
                  {isPositive ? (
                    <ChevronUpIcon size={16} className="text-positive" />
                  ) : (
                    <ChevronDownIcon size={16} className="text-negative" />
                  )}
                  +${Math.abs(asset.priceChange).toFixed(2)} (+
                  {Math.abs(asset.priceChangePercent).toFixed(2)}%)
                </span>
              </div>
            ) : (
              // Pod type: show position and ownership
              <>
                <div>
                  <p className="text-xs text-gray-600">Your position</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-gray-900">
                      ${asset.price.toFixed(2)}
                    </span>
                    <span
                      className={`flex items-center text-xs font-medium ${
                        isPositive ? "text-positive" : "text-negative"
                      }`}
                    >
                      {isPositive ? (
                        <ChevronUpIcon size={12} className="text-positive" />
                      ) : (
                        <ChevronDownIcon size={12} className="text-negative" />
                      )}
                      +${Math.abs(asset.priceChange).toFixed(2)} (+
                      {Math.abs(asset.priceChangePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
                {asset.ownership && (
                  <div>
                    <p className="text-xs text-gray-600">Ownership</p>
                    <p className="text-xl font-bold text-gray-900">
                      {asset.ownership}%
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <ShareIcon />
          </button>
          {isWatchlist && (
            <button className="text-gray-400 hover:text-gray-600">
              <BookmarkIcon />
            </button>
          )}
        </div>
      </div>

      {/* Transaction History */}
      <div className="flex-1 overflow-y-auto py-4">
        {assetTransactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {assetTransactions.map((transaction) =>
              isWatchlist || isCardType ? (
                <CardTransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ) : (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ),
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-8">
            No transactions yet
          </p>
        )}
      </div>

      {/* Action Buttons - Different for card vs pod vs watchlist */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
        {isWatchlist ? (
          <button className="px-6 h-10 bg-brand text-white font-medium text-sm rounded-full hover:bg-brand/90 transition-colors">
            Is this yours? Contact us
          </button>
        ) : isCardType ? (
          <>
            <button
              onClick={onViewDetails}
              className="px-6 h-10 text-brand font-medium text-sm border border-brand rounded-full hover:bg-brand/5 transition-colors"
            >
              View details
            </button>
            <button className="px-6 h-10 bg-brand text-white font-medium text-sm rounded-full hover:font-bold hover:tracking-tight transition-colors">
              Invest item
            </button>
          </>
        ) : (
          <>
            <button className="w-1/4 h-10 text-brand font-medium text-sm border-transparent rounded-full hover:font-bold hover:tracking-tight transition-colors">
              Request withdrawal
            </button>
            <button
              onClick={onViewDetails}
              className="w-1/4 h-10 bg-brand text-white font-medium text-sm rounded-full hover:bg-brand/90 transition-colors"
            >
              View details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Full Asset Detail Panel (after clicking View details)
const AssetFullDetailPanel = ({
  asset,
  onBack,
}: {
  asset: Asset;
  onBack: () => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("7D");
  const [performanceTab, setPerformanceTab] = useState<"cash" | "items">(
    "cash",
  );
  const isPositive = asset.priceChange >= 0;

  const detailTransactions = [
    {
      id: "1",
      title: "Crown of the Undying Monarch",
      date: "01/01/2025 09:30",
      amount: 78.9,
      type: "buy" as const,
    },
    {
      id: "2",
      title:
        "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
      date: "01/01/2025 09:30",
      amount: 78.9,
      type: "sell" as const,
    },
    {
      id: "3",
      title:
        "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
      date: "01/01/2025 09:30",
      amount: 78.9,
      type: "sell" as const,
    },
    {
      id: "4",
      title: "Crown of the Undying Monarch",
      date: "01/01/2025 09:30",
      amount: 78.9,
      type: "buy" as const,
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with asset info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 shrink-0">
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
              {asset.name}
            </h2>
            <div className="flex items-center gap-6 mt-3">
              <div>
                <p className="text-xs text-gray-600">Your position</p>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-gray-900">
                    ${asset.price.toFixed(2)}
                  </span>
                  <span
                    className={`flex items-center text-xs font-medium ${
                      isPositive ? "text-positive" : "text-negative"
                    }`}
                  >
                    {isPositive ? (
                      <ChevronUpIcon size={12} className="text-positive" />
                    ) : (
                      <ChevronDownIcon size={12} className="text-negative" />
                    )}
                    +${Math.abs(asset.priceChange).toFixed(2)} (+
                    {Math.abs(asset.priceChangePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              {asset.ownership && (
                <div>
                  <p className="text-xs text-gray-600">Ownership</p>
                  <p className="text-xl font-bold text-gray-900">
                    {asset.ownership}%
                  </p>
                </div>
              )}
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 self-start p-2 border border-gray-200 rounded-full">
            <ShareIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {[
            "Overview",
            "Performance",
            "Transaction history",
            "Terms and conditions",
          ].map((tab) => (
            <button
              key={tab}
              className="pb-3 text-sm font-medium text-gray-900 relative"
            >
              {tab}
              {tab === "Overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Overview Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">Overview</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://images.pokemontcg.io/base1/4_hires.png"
                alt="Manager"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Everlast</p>
              <p className="text-xs text-gray-500">Lorem ipsum ....</p>
            </div>
          </div>
          <div>
            <ListItem
              label="Strategy"
              value="PSA 9-10 WOTC era Pokémon cards"
            />
            <ListItem label="Joined investors" value="2" showDivider={false} />
          </div>
        </div>

        {/* Performance Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Performance</h3>
            <span className="text-xs text-gray-500">
              Last updated 2 hours ago
            </span>
          </div>

          {/* Charts Row */}
          <div className="flex gap-6 mb-6">
            {/* Donut Chart */}
            <div className="flex items-center gap-4">
              <div className="w-36 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={performanceAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {performanceAllocation.map((entry, index) => (
                        <Cell key={`cell-perf-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-1">
                {performanceAllocation.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div
                      className="w-1 h-7 rounded-sm mt-0.5"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="text-[10px] text-gray-500">{item.label}</p>
                      <p className="text-xs font-bold text-gray-900">
                        {item.value}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Chart */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={detailChartData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValueDetail"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#4e93d7"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4e93d7"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <YAxis
                      domain={["dataMin - 50000", "dataMax + 50000"]}
                      hide
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4e93d7"
                      strokeWidth={2}
                      fill="url(#colorValueDetail)"
                      dot={{ r: 3, fill: "#4e93d7", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {timePeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`h-8 px-3 rounded-full text-xs font-normal transition-colors ${
                      selectedPeriod === period
                        ? "border border-gray-700 text-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cash/Items Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setPerformanceTab("cash")}
                className={`px-6 py-3 text-sm font-bold transition-colors relative ${
                  performanceTab === "cash"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Cash
                {performanceTab === "cash" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
              <button
                onClick={() => setPerformanceTab("items")}
                className={`px-6 py-3 text-sm font-bold transition-colors relative ${
                  performanceTab === "items"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Items
                {performanceTab === "items" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {performanceTab === "cash" ? (
            <div className="mt-4">
              <ListItem label="Capital Deployed" value="$400,000" />
              <ListItem
                label="Available Cash"
                value="$500,000"
                showDivider={false}
              />
            </div>
          ) : (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {performanceItems.map((item) => (
                  <PerformanceItemCard key={item.id} item={item} />
                ))}
              </div>
              <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-4 mt-2">
                View more
              </button>
            </div>
          )}
        </div>

        {/* Transaction History Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">
              Transaction history
            </h3>
            <ChevronRightIcon size={20} className="text-gray-400" />
          </div>
          <div>
            {detailTransactions.map((tx) => (
              <TransactionHistoryItem
                key={tx.id}
                title={tx.title}
                date={tx.date}
                amount={tx.amount}
                type={tx.type}
              />
            ))}
          </div>
          <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-4">
            View more
          </button>
        </div>

        {/* Terms and Conditions Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">
            Terms and conditions
          </h3>
          <div>
            <ListItem label="Management fee" value="2% annually" />
            <ListItem label="Performance fee" value="20% over hurdle" />
            <ListItem label="Withdrawals" value="OTC, subject to liquidity" />
            <ListItem
              label="In-kind withdrawal"
              value="Only if 100% owner"
              showDivider={false}
            />
          </div>
        </div>
      </div>

      {/* Back button at bottom */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-brand font-medium text-sm hover:underline"
        >
          &larr; Back to summary
        </button>
      </div>
    </div>
  );
};

// Card Full Detail Panel (for card items with badge)
const CardFullDetailPanel = ({
  asset,
  onBack,
}: {
  asset: Asset;
  onBack: () => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("7D");
  const isPositive = asset.priceChange >= 0;

  const cardDetails = {
    cardName: "Crown of the Phoenix",
    set: "Royal Ascension",
    rarity: "Legendary",
    releaseYear: "2025",
    edition: "1st Edition",
    description:
      "This legendary card draws its power from the ancient Crown, a symbol of authority passed down through generations. Coveted for its limited release and striking artwork, it stands as a centerpiece in any serious collection. Whether displayed or played, this card represents prestige, rarity, and enduring value.",
  };

  const documents = [
    { id: "1", name: "Document 01.pdf" },
    { id: "2", name: "Document 02.pdf" },
    { id: "3", name: "Document 03.pdf" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with asset info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex gap-4">
          <div className="relative w-20 h-27 shrink-0">
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src={badgeIcon}
              alt="Badge"
              className="absolute -top-2 -right-2 w-6 h-6"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
              {asset.name}
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <p className="text-xs text-gray-600">Your position</p>
              <span className="text-xl font-bold text-gray-900">
                ${asset.price.toFixed(2)}
              </span>
              <span
                className={`flex items-center text-sm font-medium ${
                  isPositive ? "text-positive" : "text-negative"
                }`}
              >
                {isPositive ? (
                  <ChevronUpIcon size={16} className="text-positive" />
                ) : (
                  <ChevronDownIcon size={16} className="text-negative" />
                )}
                +${Math.abs(asset.priceChange).toFixed(2)} (+
                {Math.abs(asset.priceChangePercent).toFixed(2)}%)
              </span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 self-start p-2 border border-gray-200 rounded-full">
            <ShareIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {["Overview", "Performance", "Records"].map((tab) => (
            <button
              key={tab}
              className="pb-3 text-sm font-medium text-gray-900 relative"
            >
              {tab}
              {tab === "Overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Overview Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">Overview</h3>
          <div className="space-y-0">
            <ListItem label="Card Name" value={cardDetails.cardName} />
            <ListItem label="Set" value={cardDetails.set} />
            <ListItem label="Rarity" value={cardDetails.rarity} />
            <ListItem label="Release Year" value={cardDetails.releaseYear} />
            <ListItem
              label="Edition"
              value={cardDetails.edition}
              showDivider={false}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {cardDetails.description}
          </p>

          {/* Included in Pod */}
          <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://images.pokemontcg.io/base1/4_hires.png"
                alt="Pod"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Included in Pod</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                This legendary card draws its power from the ancient Crown, a
                symbol of authority pas...
              </p>
            </div>
            <ChevronRightIcon size={20} className="text-gray-400 shrink-0" />
          </div>
        </div>

        {/* Performance Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Performance</h3>
            <span className="text-xs text-gray-500">
              Last updated 2 hours ago
            </span>
          </div>

          {/* Line Chart Only */}
          <div
            className="border border-dashed border-brand rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
            }}
          >
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={detailChartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="colorValueCard"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4e93d7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4e93d7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={["dataMin - 50000", "dataMax + 50000"]} hide />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4e93d7"
                    strokeWidth={2}
                    fill="url(#colorValueCard)"
                    dot={{ r: 3, fill: "#4e93d7", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-1 mt-4">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`h-8 px-3 rounded-full text-xs font-normal transition-colors ${
                    selectedPeriod === period
                      ? "border border-gray-700 text-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Records Section */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">Records</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <DocumentIcon />
                <span className="flex-1 text-sm font-medium text-gray-900">
                  {doc.name}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <EyeIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back button at bottom */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-brand font-medium text-sm hover:underline"
        >
          &larr; Back to summary
        </button>
      </div>
    </div>
  );
};

// Default allocation colors
const allocationColors = ["#EABC65", "#47E3FF", "#C5FF8A", "#F97316", "#A855F7", "#6B7280"];

// Main Portfolio Page
const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState<"my-assets" | "watchlist">(
    "my-assets",
  );
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(
    myAssets[0] || null,
  );
  const [showFullDetail, setShowFullDetail] = useState(false);

  // Portfolio data state
  const [portfolioData, setPortfolioData] = useState<PortfolioResponse | null>(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<PortfolioPeriod>("7D");

  // Fetch portfolio data once on mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoadingPortfolio(true);
      try {
        const data = await usersService.getPortfolio();
        setPortfolioData(data);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      } finally {
        setIsLoadingPortfolio(false);
      }
    };

    fetchPortfolio();
  }, []);

  const assets = activeTab === "my-assets" ? myAssets : watchlistAssets;

  // Map period to lineChart key
  const periodKeyMap: Record<PortfolioPeriod, keyof NonNullable<PortfolioResponse['lineChart']>> = {
    '7D': '7d',
    '30D': '30d',
    '90D': '90d',
    'All': 'all',
  };

  // Prepare chart data based on selected period
  const chartData = portfolioData?.lineChart?.[periodKeyMap[selectedPeriod]] || [];

  // Build allocation from pieChart data
  const allocation = portfolioData?.pieChart
    ? [
        {
          label: 'Cash Available',
          value: portfolioData.pieChart.cashAvailable,
          color: allocationColors[0],
        },
        {
          label: 'Card Holdings',
          value: portfolioData.pieChart.cardHoldings,
          color: allocationColors[1],
        },
        {
          label: 'Pod Investments',
          value: portfolioData.pieChart.podInvestments,
          color: allocationColors[2],
        },
      ].filter((item) => item.value > 0)
    : [];

  // Calculate total holdings value
  const holdingsValue = portfolioData?.pieChart
    ? portfolioData.pieChart.cardHoldings + portfolioData.pieChart.podInvestments
    : 0;

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowFullDetail(false);
  };

  const handleTabChange = (tab: "my-assets" | "watchlist") => {
    setActiveTab(tab);
    const newAssets = tab === "my-assets" ? myAssets : watchlistAssets;
    setSelectedAsset(newAssets[0] || null);
    setShowFullDetail(false);
  };

  const handleViewDetails = () => {
    setShowFullDetail(true);
  };

  const handleBackToSummary = () => {
    setShowFullDetail(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-auto">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <div className="flex gap-6 p-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Portfolio Chart Section */}
          <PortfolioChartSection
            totalValue={portfolioData?.summary.totalValue ?? 0}
            priceChange={portfolioData?.summary.changeUsd ?? 0}
            priceChangePercent={portfolioData?.summary.changePercent ?? 0}
            cashAvailable={portfolioData?.summary.cashAvailable ?? 0}
            holdings={holdingsValue}
            chartData={chartData}
            allocation={allocation}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            isLoading={isLoadingPortfolio}
          />

          {/* Assets Widget */}
          <div
            className={`bg-white rounded-2xl flex overflow-hidden transition-all duration-300 ease-in-out ${
              showFullDetail ? "h-auto" : "h-[calc(100dvh-280px)] "
            }`}
          >
            {/* Asset List */}
            <div className="w-90 shrink-0 flex flex-col border-r border-gray-100">
              {/* Tabs */}
              <div className="flex gap-6 px-6 pt-6 border-b border-gray-100">
                <button
                  onClick={() => handleTabChange("my-assets")}
                  className={`pb-4 text-base font-medium transition-colors relative ${
                    activeTab === "my-assets"
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  My assets
                  {activeTab === "my-assets" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange("watchlist")}
                  className={`pb-4 text-base font-medium transition-colors relative ${
                    activeTab === "watchlist"
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Watchlist
                  {activeTab === "watchlist" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </button>
              </div>

              {/* Asset List */}
              <div className="flex-1 overflow-y-auto">
                {assets.map((asset) => (
                  <AssetListItem
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAsset?.id === asset.id}
                    onClick={() => handleAssetSelect(asset)}
                  />
                ))}
              </div>
            </div>

            {/* Asset Detail Panel */}
            {selectedAsset &&
              (showFullDetail ? (
                selectedAsset.type === "card" ? (
                  <CardFullDetailPanel
                    asset={selectedAsset}
                    onBack={handleBackToSummary}
                  />
                ) : (
                  <AssetFullDetailPanel
                    asset={selectedAsset}
                    onBack={handleBackToSummary}
                  />
                )
              ) : (
                <AssetDetailPanel
                  asset={selectedAsset}
                  onViewDetails={handleViewDetails}
                  isWatchlist={activeTab === "watchlist"}
                />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;
