import api from './api';

// Types
export type UploadCategory = 'image' | 'attachment';

export interface UploadResponse {
  url: string;
  filename: string;
}

// Storage API
export const storageService = {
  // Upload file (admin only)
  upload: async (file: File, category: UploadCategory): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadResponse>('/api/storage/upload', formData, {
      params: { category },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default storageService;
