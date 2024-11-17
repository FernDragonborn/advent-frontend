import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useHandleAuthErrors } from '@/hooks';

export const useAuthQuery = (options, shouldUseNotFoundHandler = false) => {
  const query = useQuery(options);
  useHandleAuthErrors(query.error?.status);

  useEffect(() => {
    if (!shouldUseNotFoundHandler) {
      return;
    }

    if (query.error?.status === 404) {
      notFound();
    }
  }, [query.error?.status]);

  return query;
};
