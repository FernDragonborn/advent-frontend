import { decodeToken } from '@/utils/decodeToken';

export const getCookieOptionsForToken = (token, isHttpOnly = false) => {
  const decodedToken = decodeToken(token);

  return {
    expires: decodedToken?.exp * 1000 || Date.now() + 1000 * 60,
    sameSite: 'strict',
    httpOnly: isHttpOnly,
  };
};
