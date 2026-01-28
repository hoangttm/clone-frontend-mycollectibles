import api from './api';

// Types
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type CardVisibility = 'private' | 'public';
export type CardOwnerType = 'user' | 'pod';

export interface CardAttachment {
  filename: string;
  url: string;
}

export interface Card {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  set: string | null;
  rarity: CardRarity | null;
  releaseYear: number | null;
  edition: string | null;
  price: number | null;
  priceChangePct: number | null;
  priceChangeUsd: number | null;
  attachments: CardAttachment[];
  visibility: CardVisibility;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardListParams {
  ownerType?: CardOwnerType;
  ownerId?: string;
  state?: CardVisibility;
  rarity?: CardRarity;
  page?: number;
  limit?: number;
}

export interface CardListResponse {
  items: Card[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateCardRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  attachments?: CardAttachment[];
  set?: string;
  rarity?: CardRarity;
  releaseYear?: number;
  edition?: string;
  initialPriceUsd: number;
}

export interface UpdateCardRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  attachments?: CardAttachment[];
  set?: string;
  rarity?: CardRarity;
  releaseYear?: number;
  edition?: string;
  version: number;
}

export interface CardDetailsResponse extends Card {
  performance: {
    priceHistory: Array<{
      date: string;
      price: number;
    }>;
  };
}

export interface CardPriceRequest {
  priceUsd: number;
  version: number;
}

export interface CardVisibilityRequest {
  visibility: CardVisibility;
  version: number;
}

export interface CardReviewTransaction {
  id: string;
  type: string;
  amountUsd: number | null;
  date: string;
}

export interface CardReviewResponse {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number | null;
  priceChangePct: number | null;
  priceChangeUsd: number | null;
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
  transactions: CardReviewTransaction[];
}

// Cards API
export const cardsService = {
  // List cards (admin only)
  list: async (params?: CardListParams): Promise<CardListResponse> => {
    const response = await api.get<CardListResponse>('/api/cards/', { params });
    return response.data;
  },

  // Get card by ID
  getById: async (id: string): Promise<Card> => {
    const response = await api.get<Card>(`/api/cards/${id}`);
    return response.data;
  },

  // Get card details with performance data
  getDetails: async (id: string): Promise<CardDetailsResponse> => {
    const response = await api.get<CardDetailsResponse>(`/api/cards/${id}/details`);
    return response.data;
  },

  // Create card (admin only)
  create: async (data: CreateCardRequest): Promise<Card> => {
    const response = await api.post<Card>('/api/cards/', data);
    return response.data;
  },

  // Update card (admin only)
  update: async (id: string, data: UpdateCardRequest): Promise<Card> => {
    const response = await api.patch<Card>(`/api/cards/${id}`, data);
    return response.data;
  },

  // Delete card (admin only)
  delete: async (id: string, version: number, permanent?: boolean): Promise<void> => {
    await api.delete(`/api/cards/${id}`, {
      params: permanent ? { permanent: true } : undefined,
      data: { version },
    });
  },

  // Update card price (admin only)
  updatePrice: async (id: string, data: CardPriceRequest): Promise<Card> => {
    const response = await api.patch<Card>(`/api/cards/${id}/price`, data);
    return response.data;
  },

  // Update card visibility (owner only)
  updateVisibility: async (id: string, data: CardVisibilityRequest): Promise<Card> => {
    const response = await api.patch<Card>(`/api/cards/${id}/visibility`, data);
    return response.data;
  },

  // Get card review with price metrics and transaction history
  getReview: async (id: string): Promise<CardReviewResponse> => {
    const response = await api.get<CardReviewResponse>(`/api/cards/${id}/review`);
    return response.data;
  },
};

export default cardsService;
