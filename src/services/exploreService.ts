import api from './api';

// Types
export interface ExploreCard {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  set: string | null;
  rarity: string | null;
  releaseYear: number | null;
  edition: string | null;
  price: number | null;
  priceChangePct: number | null;
  priceChangeUsd: number | null;
  createdAt: string;
}

export interface ExplorePod {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  type: string;
  status: string;
  totalNav: number | null;
  totalNavChangePct: number | null;
  totalNavChangeUsd: number | null;
  createdAt: string;
}

export interface ExploreParams {
  cursor?: string;
  limit?: number;
  daysWindow?: number;
}

export interface ExploreFeaturedResponse {
  items: ExploreCard[];
  nextCursor: string | null;
}

export interface ExplorePodsResponse {
  items: ExplorePod[];
  nextCursor: string | null;
}

// Explore API
export const exploreService = {
  // Get featured cards (admin-created public cards)
  getFeatured: async (params?: ExploreParams): Promise<ExploreFeaturedResponse> => {
    const response = await api.get<ExploreFeaturedResponse>('/api/explore/featured', { params });
    return response.data;
  },

  // Get open pods (active public pods)
  getOpenPods: async (params?: ExploreParams): Promise<ExplorePodsResponse> => {
    const response = await api.get<ExplorePodsResponse>('/api/explore/open', { params });
    return response.data;
  },

  // Get hot pods (best performing over daysWindow)
  getHotPods: async (params?: ExploreParams): Promise<ExplorePodsResponse> => {
    const response = await api.get<ExplorePodsResponse>('/api/explore/hot', { params });
    return response.data;
  },
};

export default exploreService;
