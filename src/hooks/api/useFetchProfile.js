import { QUERY_KEYS } from '@/constants';
import { useAuthQuery } from '@/hooks';
import { api } from '@/services';

export const useFetchProfile = () =>
  useAuthQuery({
    queryFn: api.auth.getUser,
    queryKey: QUERY_KEYS.auth.profile,
  });
