import api from './api';

// Types
export type TransactionStatus = 'pending' | 'approved' | 'rejected' | 'reversed';
export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'subscription'
  | 'subscription_in_kind'
  | 'redemption'
  | 'redemption_in_kind'
  | 'buy_asset'
  | 'sell_asset'
  | 'reversal';

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  podId: string | null;
  cardId: string | null;
  initiatorId: string;
  amountUsd: number | null;
  unitsScaled: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionListParams {
  type?: string;
  status?: TransactionStatus;
  podId?: string;
  cardId?: string;
  initiatorId?: string;
  page?: number;
  limit?: number;
}

export interface TransactionListResponse {
  items: Transaction[];
  total: number;
  page: number;
  limit: number;
}

// Asset Trading
export interface BuyAssetRequest {
  podId: string;
  cardId: string;
  priceUsd: number;
  notes?: string;
}

export interface SellAssetRequest {
  podId: string;
  cardId: string;
  buyerId: string;
  priceUsd: number;
  notes?: string;
}

// Invest
export interface SubscriptionRequest {
  podId: string;
  investorId: string;
  amountUsd: number;
  notes?: string;
}

export interface SubscriptionInKindRequest {
  podId: string;
  investorId: string;
  cardId: string;
  priceUsd?: number;
  notes?: string;
}

// Divest
export interface RedemptionRequest {
  podId: string;
  investorId: string;
  unitsScaled: string;
  notes?: string;
}

export interface RedemptionInKindRequest {
  podId: string;
  investorId: string;
  cardId: string;
  priceUsd?: number;
  notes?: string;
}

// Cash Management
export interface DepositRequest {
  amountUsd: number;
  externalReferenceId: string;
  notes?: string;
}

export interface WithdrawalRequest {
  amountUsd: number;
  notes?: string;
}

// Admin
export interface ReversalRequest {
  transactionId: string;
  notes?: string;
}

export interface ApproveRejectRequest {
  notes?: string;
}

// Transactions API
export const transactionsService = {
  // === Transaction Admin ===

  // List transactions
  list: async (params?: TransactionListParams): Promise<TransactionListResponse> => {
    const response = await api.get<TransactionListResponse>('/api/transactions/', { params });
    return response.data;
  },

  // Get transaction by ID
  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get<Transaction>(`/api/transactions/${id}`);
    return response.data;
  },

  // Approve transaction (admin only)
  approve: async (id: string, data?: ApproveRejectRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>(`/api/transactions/${id}/approve`, data);
    return response.data;
  },

  // Reject transaction (admin only)
  reject: async (id: string, data?: ApproveRejectRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>(`/api/transactions/${id}/reject`, data);
    return response.data;
  },

  // Reverse transaction (admin only)
  reversal: async (data: ReversalRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/reversal', data);
    return response.data;
  },

  // === Asset Trading ===

  // Pod buys card from user (admin, auto-approve)
  buyAsset: async (data: BuyAssetRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/buy-asset', data);
    return response.data;
  },

  // Pod sells card to user (admin, auto-approve)
  sellAsset: async (data: SellAssetRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/sell-asset', data);
    return response.data;
  },

  // === Invest ===

  // Create subscription (cash for units)
  subscription: async (data: SubscriptionRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/subscription', data);
    return response.data;
  },

  // Create subscription in-kind (card for units)
  subscriptionInKind: async (data: SubscriptionInKindRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/subscription-in-kind', data);
    return response.data;
  },

  // === Divest ===

  // Create redemption (units for cash)
  redemption: async (data: RedemptionRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/redemption', data);
    return response.data;
  },

  // Create redemption in-kind (units for card)
  redemptionInKind: async (data: RedemptionInKindRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>('/api/transactions/redemption-in-kind', data);
    return response.data;
  },

  // === Cash Management ===

  // Deposit cash to user account (admin, auto-approve)
  deposit: async (userId: string, data: DepositRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>(`/api/transactions/deposit/${userId}`, data);
    return response.data;
  },

  // Withdraw cash from user account (admin, auto-approve)
  withdrawal: async (userId: string, data: WithdrawalRequest): Promise<Transaction> => {
    const response = await api.post<Transaction>(`/api/transactions/withdrawal/${userId}`, data);
    return response.data;
  },
};

export default transactionsService;
