import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/constants';

/**
 * Axios HTTP client configured with base URL
 */
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
