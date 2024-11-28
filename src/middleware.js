import { NextResponse } from 'next/server';

import { getCookieOptionsForToken, isTokenValid } from '@/utils';
import { COOKIES } from '@/constants';
import { refreshTokenAction } from '@/actions';

const publicRoutes = ['/', '/terms', '/privacy-policy'];
const restrictedRoutes = ['/signup', '/login', '/reset-password'];
const protectedRoutes = ['/settings', '/calendar'];

export function logoutRedirect(url) {
  const response = NextResponse.redirect(url);
  response.cookies.delete(COOKIES.ACCESS_TOKEN);
  response.cookies.delete(COOKIES.REFRESH_TOKEN);
  return response;
}

export async function middleware(request) {
  const currentAccessToken = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const currentRefreshToken = request.cookies.get(COOKIES.REFRESH_TOKEN)?.value;
  const url = request.nextUrl.clone();

  // restricted routes handler
  if (restrictedRoutes.includes(url.pathname)) {
    if (!isTokenValid(currentAccessToken)) {
      return NextResponse.next();
    }
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // protected routes handler
  if (protectedRoutes.includes(url.pathname)) {
    if (isTokenValid(currentAccessToken)) {
      return NextResponse.next();
    }

    if (isTokenValid(currentRefreshToken)) {
      try {
        const { access, refresh } = await refreshTokenAction();
        const response = NextResponse.next();

        response.cookies.set(
          COOKIES.ACCESS_TOKEN,
          access,
          getCookieOptionsForToken(access),
        );
        response.cookies.set(
          COOKIES.REFRESH_TOKEN,
          refresh,
          getCookieOptionsForToken(refresh, true),
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    }

    url.pathname = '/login';

    return logoutRedirect(url);
  }

  // public routes handler
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|files).*)',
  ],
};
