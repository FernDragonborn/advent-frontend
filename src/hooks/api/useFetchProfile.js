import { useAuthQuery } from '@/hooks';
import { api } from '@/services';

export const useFetchProfile = () =>
  useAuthQuery({ queryFn: api.auth.getUser, queryKey: ['profile'] });
