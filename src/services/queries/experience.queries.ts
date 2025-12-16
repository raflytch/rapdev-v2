import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import type { ApiResponse, Experience } from '@/types/api.types';

/**
 * Fetch experiences from API
 */
const fetchExperiences = async (page = 1, limit = 10): Promise<ApiResponse<Experience>> => {
  const response = await httpClient.get<ApiResponse<Experience>>('/experience', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Hook to fetch experiences with React Query
 */
export const useExperiences = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['experiences', page, limit],
    queryFn: () => fetchExperiences(page, limit),
  });
};
