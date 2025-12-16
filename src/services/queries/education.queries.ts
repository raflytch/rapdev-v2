import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import type { ApiResponse, Education } from '@/types/api.types';

/**
 * Fetch education from API
 */
const fetchEducation = async (page = 1, limit = 10): Promise<ApiResponse<Education>> => {
  const response = await httpClient.get<ApiResponse<Education>>('/education', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Hook to fetch education with React Query
 */
export const useEducation = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['education', page, limit],
    queryFn: () => fetchEducation(page, limit),
  });
};
