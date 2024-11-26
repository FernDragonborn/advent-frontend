'use server';

import { cookies } from 'next/headers';

import { getCookieOptionsForToken } from '@/utils';
import { COOKIES } from '@/constants';
import { api } from '@/services';

export const updateTokensInCookiesAction = async ({
  accessToken,
  refreshToken,
}) => {
  (await cookies()).set(
    COOKIES.ACCESS_TOKEN,
    accessToken,
    getCookieOptionsForToken(accessToken),
  );
  (await cookies()).set(
    COOKIES.REFRESH_TOKEN,
    refreshToken,
    getCookieOptionsForToken(refreshToken, true),
  );
};

export const loginAction = async ({ email, password }) => {
  try {
    const data = await api.auth.login({ email, password });
    const { access, refresh } = data;

    (await cookies()).set(
      COOKIES.ACCESS_TOKEN,
      access,
      getCookieOptionsForToken(access),
    );
    (await cookies()).set(
      COOKIES.REFRESH_TOKEN,
      refresh,
      getCookieOptionsForToken(refresh, true),
    );

    return { data: { accessToken: access }, success: true };
  } catch (error) {
    return error;
  }
};

export const logoutAction = async () => {
  (await cookies()).delete(COOKIES.ACCESS_TOKEN);
  (await cookies()).delete(COOKIES.REFRESH_TOKEN);

  return { success: true };
};

export const refreshTokenAction = async () => {
  const currentRefreshToken = await cookies().then(
    res => res.get(COOKIES.REFRESH_TOKEN)?.value,
  );

  if (!currentRefreshToken) {
    throw new Error('Відсутній токен');
  }

  const data = await api.auth.refreshToken({
    refresh: currentRefreshToken,
  });

  return data;
};
