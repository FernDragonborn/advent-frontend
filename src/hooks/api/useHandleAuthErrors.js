import { useCallback, useEffect } from 'react';

import {
  logoutAction,
  refreshTokenAction,
  updateTokensInCookiesAction,
} from '@/app/actions';

export const useHandleAuthErrors = status => {
  const handleAuthError = useCallback(async () => {
    try {
      const { access, refresh } = await refreshTokenAction();
      updateTokensInCookiesAction({
        accessToken: access,
        refreshToken: refresh,
      });
    } catch (error) {
      logoutAction().then(() => {
        // toast('Помилка авторизації', { type: 'error' });
      });
    }
  }, []);

  useEffect(() => {
    if (status === 401 || status === 403) {
      handleAuthError();
    }
  }, [handleAuthError, status]);
};
