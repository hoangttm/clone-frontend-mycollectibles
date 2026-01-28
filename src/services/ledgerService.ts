import api from './api';

// Types
export type LedgerOwnerType = 'user' | 'pod';
export type LedgerSortBy = 'createdAt' | 'amountUsd';
export type SortOrder = 'asc' | 'desc';

export interface LedgerEntry {
  id: string;
  ownerType: LedgerOwnerType;
  ownerId: string;
  transactionId: string;
  amountUsd: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface LedgerListParams {
  ownerType?: LedgerOwnerType;
  ownerId?: string;
  transactionId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: LedgerSortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface LedgerListResponse {
  items: LedgerEntry[];
  total: number;
  page: number;
  limit: number;
}

export interface BalanceParams {
  userId?: string;
  podId?: string;
}

export interface BalanceResponse {
  balance: number;
  currency: string;
}

// Ledger API
export const ledgerService = {
  // List ledger entries (admin only)
  list: async (params?: LedgerListParams): Promise<LedgerListResponse> => {
    const response = await api.get<LedgerListResponse>('/api/ledger/', { params });
    return response.data;
  },

  // Check balance by user ID or pod ID (admin only)
  getBalance: async (params: BalanceParams): Promise<BalanceResponse> => {
    const response = await api.get<BalanceResponse>('/api/ledger/balance', { params });
    return response.data;
  },
};

export default ledgerService;
