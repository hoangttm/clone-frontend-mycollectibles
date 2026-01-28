import api from './api';

// Types
export interface PodUnit {
  id: string;
  podId: string;
  userId: string;
  unitsScaled: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface PodUnitWithDetails extends PodUnit {
  pod?: {
    id: string;
    name: string;
    imageUrl: string | null;
    totalNav: number | null;
  };
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface PodUnitsListParams {
  podId?: string;
  userId?: string;
  page?: number;
  limit?: number;
}

export interface PodUnitsListResponse {
  items: PodUnitWithDetails[];
  total: number;
  page: number;
  limit: number;
}

// Pod Units API
export const podUnitsService = {
  // List pod units (admin only, filterable by pod/investor)
  list: async (params?: PodUnitsListParams): Promise<PodUnitsListResponse> => {
    const response = await api.get<PodUnitsListResponse>('/api/pod-units/', { params });
    return response.data;
  },
};

export default podUnitsService;
