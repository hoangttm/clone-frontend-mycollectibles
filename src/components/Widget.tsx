import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon } from "./Icons";

interface AssetItem {
  id: string;
  title: string;
  image: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
}

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: string;
}

// Mock data for assets
const myAssets: AssetItem[] = [
  {
    id: "1",
    title:
      "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/4_hires.png",
    price: 99.9,
    priceChange: 9.7,
    priceChangePercent: 8.7,
  },
  {
    id: "2",
    title:
      "Here is the title of the product. This title area is limited to two lines.",
    image: "https://images.pokemontcg.io/base1/2_hires.png",
    price: 99.9,
    priceChange: -9.7,
    priceChangePercent: -8.7,
  },
  {
    id: "3",
    title:
      "Here is the title of the product. This title area is limited to two lin...",
    image: "https://images.pokemontcg.io/swsh35/74_hires.png",
    price: 78.9,
    priceChange: 8.7,
    priceChangePercent: 9.2,
  },
  {
    id: "4",
    title:
      "Here is the title of the product. This title area is limited to two lin...",
    image: "https://images.pokemontcg.io/smp/SM77_hires.png",
    price: 78.9,
    priceChange: 8.7,
    priceChangePercent: 9.2,
  },
];

const transactions: Transaction[] = [
  {
    id: "1",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "Invest in-kind",
  },
  {
    id: "2",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "Invest in cash",
  },
  {
    id: "3",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "Withdrawal",
  },
  {
    id: "4",
    title:
      "The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026",
    date: "01/01/2025 09:30",
    amount: 78.9,
    type: "Cash out",
  },
];

const Widget = () => {
  const [activeTab, setActiveTab] = useState<"assets" | "watchlist">("assets");
  const [selectedAsset, setSelectedAsset] = useState<AssetItem>(myAssets[0]);

  return (
    <div className="bg-white rounded-2xl py-6 flex gap-6">
      {/* Left Panel - Asset List */}
      <div className="w-80 shrink-0">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-4">
          <button
            onClick={() => setActiveTab("assets")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "assets"
                ? "text-brand border-brand"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            My assets
          </button>
          <button
            onClick={() => setActiveTab("watchlist")}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "watchlist"
                ? "text-brand border-brand"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Watchlist
          </button>
        </div>

        {/* Asset List */}
        <div className="flex flex-col">
          {myAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`flex items-start gap-3 p-6 transition-colors text-left border-b border-gray-100 ${
                selectedAsset.id === asset.id
                  ? "bg-brand/10"
                  : "hover:bg-gray-50"
              }`}
            >
              <img
                src={asset.image}
                alt={asset.title}
                className="w-14 h-14 rounded-lg object-cover shrink-0 bg-blue-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 line-clamp-2 mb-1">
                  {asset.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    ${asset.price.toFixed(2)}
                  </span>
                  <div
                    className={`flex items-center gap-0.5 ${asset.priceChange >= 0 ? "text-positive" : "text-negative"}`}
                  >
                    {asset.priceChange >= 0 ? (
                      <ChevronUpIcon size={14} />
                    ) : (
                      <ChevronDownIcon size={14} />
                    )}
                    <span className="text-xs font-medium">
                      +${Math.abs(asset.priceChange).toFixed(2)} (
                      {Math.abs(asset.priceChangePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Asset Detail */}
      <div className="flex-1 px-6">
        {/* Selected Asset Info */}
        <div className="flex gap-4 mb-6">
          <img
            src={selectedAsset.image}
            alt={selectedAsset.title}
            className="w-24 h-24 rounded-xl object-cover bg-blue-100"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {selectedAsset.title}
            </h3>
            <div className="flex items-start gap-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">Your position</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${selectedAsset.price.toFixed(2)}
                  </span>
                  <div
                    className={`flex items-center gap-0.5 ${selectedAsset.priceChange >= 0 ? "text-positive" : "text-negative"}`}
                  >
                    {selectedAsset.priceChange >= 0 ? (
                      <ChevronUpIcon size={16} />
                    ) : (
                      <ChevronDownIcon size={16} />
                    )}
                    <span className="text-sm font-medium">
                      +${Math.abs(selectedAsset.priceChange).toFixed(2)} (
                      {Math.abs(selectedAsset.priceChangePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Ownership</p>
                <span className="text-xl font-bold text-gray-900">78%</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 hover:bg-gray-800 transition-colors">
            <ChevronRightIcon size={20} />
          </button>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <img
                  src={selectedAsset.image}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{tx.title}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">
                  ${tx.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{tx.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
