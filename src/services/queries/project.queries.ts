import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import type { ApiResponse, Project } from '@/types/api.types';

/**
 * Fetch projects from API
 */
const fetchProjects = async (page = 1, limit = 10): Promise<ApiResponse<Project>> => {
  const response = await httpClient.get<ApiResponse<Project>>('/project', {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Hook to fetch projects with React Query
 */
export const useProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => fetchProjects(page, limit),
  });
};
