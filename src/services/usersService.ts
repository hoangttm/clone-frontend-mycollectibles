import api from './api';

// Types
export interface PortfolioCard {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number | null;
  priceChangePct: number | null;
  priceChangeUsd: number | null;
  quantity: number;
  totalValue: number;
}

export interface PortfolioPod {
  id: string;
  name: string;
  imageUrl: string | null;
  totalNav: number | null;
  totalNavChangePct: number | null;
  totalNavChangeUsd: number | null;
  units: number;
  ownership: number;
  value: number;
}

export interface PortfolioChartPoint {
  date: string;
  value: number;
}

export interface PortfolioSummary {
  totalValue: number;
  changePercent: number;
  changeUsd: number;
  cashAvailable: number;
}

export interface PortfolioHoldings {
  cards: PortfolioCard[];
  pods: PortfolioPod[];
}

export interface PortfolioPieChart {
  cashAvailable: number;
  cardHoldings: number;
  podInvestments: number;
}

export interface PortfolioLineChart {
  '7d': PortfolioChartPoint[];
  '30d': PortfolioChartPoint[];
  '90d': PortfolioChartPoint[];
  'all': PortfolioChartPoint[];
}

export interface PortfolioResponse {
  summary: PortfolioSummary;
  holdings: PortfolioHoldings;
  pieChart: PortfolioPieChart;
  lineChart: PortfolioLineChart;
}

export type PortfolioPeriod = '7D' | '30D' | '90D' | 'All';

// Users API
export const usersService = {
  // Get current user's portfolio (holdings and performance)
  getPortfolio: async (): Promise<PortfolioResponse> => {
    const response = await api.get<PortfolioResponse>('/api/users/me/portfolio');
    return response.data;
  },
};

export default usersService;
