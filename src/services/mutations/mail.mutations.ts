import { useMutation } from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import type { EmailPayload } from '@/types/api.types';

/**
 * Send email via API
 */
const sendEmail = async (payload: EmailPayload): Promise<void> => {
  await httpClient.post('/mail', payload);
};

/**
 * Hook to send email with React Query mutation
 */
export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
  });
};
