import { decodeToken } from '@/utils';

// {
//   token_type: 'access' | 'refresh',
//   exp: 1732651281,
//   iat: 1732650381,
//   jti: 'string',
//   user_id: number
// }

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
