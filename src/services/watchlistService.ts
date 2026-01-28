import api from './api';

// Types
export type WatchlistItemType = 'card' | 'pod';
export type WatchlistSortBy = 'addedAt' | 'changePct' | 'changeUsd' | 'name';
export type SortOrder = 'asc' | 'desc';

export interface WatchlistItem {
  id: string;
  itemType: WatchlistItemType;
  cardId: string | null;
  podId: string | null;
  name: string;
  imageUrl: string | null;
  price: number | null;
  priceChangePct: number | null;
  priceChangeUsd: number | null;
  addedAt: string;
}

export interface WatchlistParams {
  itemType?: WatchlistItemType;
  search?: string;
  sortBy?: WatchlistSortBy;
  sortOrder?: SortOrder;
}

export interface WatchlistResponse {
  items: WatchlistItem[];
}

export interface AddCardToWatchlistRequest {
  itemType: 'card';
  cardId: string;
}

export interface AddPodToWatchlistRequest {
  itemType: 'pod';
  podId: string;
}

export type AddToWatchlistRequest = AddCardToWatchlistRequest | AddPodToWatchlistRequest;

// Watchlist API
export const watchlistService = {
  // Get watchlist with items and performance metrics
  getWatchlist: async (params?: WatchlistParams): Promise<WatchlistResponse> => {
    const response = await api.get<WatchlistResponse>('/api/watchlist/', { params });
    return response.data;
  },

  // Add card to watchlist
  addCard: async (cardId: string): Promise<WatchlistItem> => {
    const response = await api.post<WatchlistItem>('/api/watchlist/', {
      itemType: 'card',
      cardId,
    });
    return response.data;
  },

  // Add pod to watchlist
  addPod: async (podId: string): Promise<WatchlistItem> => {
    const response = await api.post<WatchlistItem>('/api/watchlist/', {
      itemType: 'pod',
      podId,
    });
    return response.data;
  },

  // Add item to watchlist (generic)
  add: async (data: AddToWatchlistRequest): Promise<WatchlistItem> => {
    const response = await api.post<WatchlistItem>('/api/watchlist/', data);
    return response.data;
  },

  // Remove item from watchlist
  remove: async (itemId: string): Promise<void> => {
    await api.delete(`/api/watchlist/${itemId}`);
  },
};

export default watchlistService;
