import { decodeToken } from '@/utils';

export const isTokenValid = token => {
  try {
    const decodedToken = decodeToken(token);

    if (!decodedToken) {
      return false;
    }

    return decodedToken.exp * 1000 - Date.now() > 0;
  } catch (error) {
    return false;
  }
};
