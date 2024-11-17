'use server';

import { cookies } from 'next/headers';

import { getCookieOptionsForToken } from '@/utils';
import { COOKIES } from '@/constants';
import { api } from '@/services';

export const appendTokenToCookieAction = async (tokenName, value) => {
  cookies().set(
    tokenName,
    value,
    getCookieOptionsForToken(value, tokenName === COOKIES.REFRESH_TOKEN),
  );
};

export const updateTokensInCookiesAction = async ({
  accessToken,
  refreshToken,
}) => {
  appendTokenToCookieAction(COOKIES.ACCESS_TOKEN, accessToken);
  appendTokenToCookieAction(COOKIES.REFRESH_TOKEN, refreshToken);
};

export const loginAction = async ({ email, password }) => {
  try {
    const { data } = await api.auth.login({ email, password });
    const { accessToken, refreshToken } = data;
    updateTokensInCookiesAction({ accessToken, refreshToken });

    return { data: { accessToken }, success: true };
  } catch (error) {
    return error;
  }
};

export const logoutAction = async () => {
  cookies().delete(COOKIES.ACCESS_TOKEN);
  cookies().delete(COOKIES.REFRESH_TOKEN);

  return { success: true };
};

export const refreshTokenAction = async () => {
  const currentRefreshToken = cookies().get(COOKIES.REFRESH_TOKEN)?.value;

  if (!currentRefreshToken) {
    throw new Error('Відсутній токен');
  }

  const { data } = await api.auth.refreshToken({
    refreshToken: currentRefreshToken,
  });

  return data;
};
