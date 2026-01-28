export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
}

export interface Activity {
  id: string;
  type: 'buy' | 'sell' | 'price_alert';
  title: string;
  description: string;
  price?: number;
  priceChange?: number;
  priceChangePercent?: number;
  timestamp: string;
  image?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PortfolioData {
  totalValue: number;
  priceChange: number;
  priceChangePercent: number;
  chartData: ChartDataPoint[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  active?: boolean;
}

export interface Asset {
  id: string;
  name: string;
  image: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  ownership?: number;
  type: 'card' | 'pod';
}

export interface Transaction {
  id: string;
  assetId: string;
  title: string;
  date: string;
  amount: number;
  type: 'invest_in_kind' | 'invest_in_cash' | 'withdrawal' | 'cash_out';
}

export interface AllocationData {
  label: string;
  value: number;
  color: string;
}

export interface PortfolioSummary {
  totalValue: number;
  priceChange: number;
  priceChangePercent: number;
  cashAvailable: number;
  holdings: number;
  chartData: ChartDataPoint[];
  allocation: AllocationData[];
}
