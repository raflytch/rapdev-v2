/**
 * API response types
 */

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  logo: string;
  startDate: string;
  endDate: string;
  tags: string[];
  description: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  logo: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

