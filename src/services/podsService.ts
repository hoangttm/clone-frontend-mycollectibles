import api from './api';

// Types
export type PodType = 'fund' | 'syndicate' | 'portfolio';
export type PodStatus = 'pending' | 'active' | 'closed' | 'ended';
export type PodVisibility = 'private' | 'public';

export interface PodAttachment {
  filename: string;
  url: string;
}

export interface Pod {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  type: PodType;
  status: PodStatus;
  visibility: PodVisibility;
  managerId: string;
  totalNav: number | null;
  totalNavChangePct: number | null;
  totalNavChangeUsd: number | null;
  attachments: PodAttachment[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface PodListParams {
  status?: PodStatus;
  visibility?: PodVisibility;
  type?: PodType;
  managerId?: string;
  investorId?: string;
  page?: number;
  limit?: number;
}

export interface PodListResponse {
  items: Pod[];
  total: number;
  page: number;
  limit: number;
}

export interface CreatePodRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  attachments?: PodAttachment[];
  type?: PodType;
}

export interface UpdatePodRequest {
  name?: string;
  description?: string;
  imageUrl?: string | null;
  attachments?: PodAttachment[];
  type?: PodType;
  version: number;
}

export interface PodDetailsResponse extends Pod {
  items: Array<{
    id: string;
    cardId: string;
    card: {
      id: string;
      name: string;
      imageUrl: string | null;
      price: number | null;
    };
    quantity: number;
    averageCost: number;
  }>;
  performance: {
    navHistory: Array<{
      date: string;
      nav: number;
    }>;
  };
  investors: Array<{
    userId: string;
    units: number;
    percentage: number;
  }>;
}

export interface PodBalanceResponse {
  cashBalance: number;
  currency: string;
}

export interface PodVisibilityRequest {
  visibility: PodVisibility;
  version: number;
}

// Pods API
export const podsService = {
  // List pods (admin only)
  list: async (params?: PodListParams): Promise<PodListResponse> => {
    const response = await api.get<PodListResponse>('/api/pods/', { params });
    return response.data;
  },

  // Get pod by ID
  getById: async (id: string): Promise<Pod> => {
    const response = await api.get<Pod>(`/api/pods/${id}`);
    return response.data;
  },

  // Get pod details with items and performance
  getDetails: async (id: string): Promise<PodDetailsResponse> => {
    const response = await api.get<PodDetailsResponse>(`/api/pods/${id}/details`);
    return response.data;
  },

  // Get pod cash balance
  getBalance: async (id: string): Promise<PodBalanceResponse> => {
    const response = await api.get<PodBalanceResponse>(`/api/pods/${id}/balance`);
    return response.data;
  },

  // Create pod (manager only)
  create: async (data: CreatePodRequest): Promise<Pod> => {
    const response = await api.post<Pod>('/api/pods/', data);
    return response.data;
  },

  // Update pod (manager/owner only)
  update: async (id: string, data: UpdatePodRequest): Promise<Pod> => {
    const response = await api.patch<Pod>(`/api/pods/${id}`, data);
    return response.data;
  },

  // Approve pod (admin only)
  approve: async (id: string): Promise<Pod> => {
    const response = await api.post<Pod>(`/api/pods/${id}/approve`);
    return response.data;
  },

  // Close pod (manager only)
  close: async (id: string): Promise<Pod> => {
    const response = await api.post<Pod>(`/api/pods/${id}/close`);
    return response.data;
  },

  // Reopen pod (manager only)
  reopen: async (id: string): Promise<Pod> => {
    const response = await api.post<Pod>(`/api/pods/${id}/reopen`);
    return response.data;
  },

  // End pod (manager only)
  end: async (id: string): Promise<Pod> => {
    const response = await api.post<Pod>(`/api/pods/${id}/end`);
    return response.data;
  },

  // Update pod visibility (manager/owner only)
  updateVisibility: async (id: string, data: PodVisibilityRequest): Promise<Pod> => {
    const response = await api.patch<Pod>(`/api/pods/${id}/visibility`, data);
    return response.data;
  },
};

export default podsService;
