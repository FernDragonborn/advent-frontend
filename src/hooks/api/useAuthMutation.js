import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useHandleAuthErrors } from '@/hooks';

export const useAuthMutation = (options, shouldShowNotifications = true) => {
  const mutation = useMutation({
    ...options,
    onSuccess: res => {
      shouldShowNotifications && toast('Успіх', { type: 'success' });
      options?.onSuccess?.(res);
    },
    onError: res => {
      shouldShowNotifications &&
        toast(
          res?.status >= 500 || !res?.status ? 'Помилка сервера' : 'Помилка',
          {
            type: 'error',
          },
        );
      options?.onError?.(res);
    },
  });
  useHandleAuthErrors(mutation.error?.status);

  return mutation;
};
