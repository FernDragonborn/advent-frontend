import { NextResponse } from 'next/server';

import { decodeToken, getCookieOptionsForToken, isTokenValid } from '@/utils';
import {
  COOKIES,
  // roleProperty, USER_ROLE
} from '@/constants';
import { refreshTokenAction } from '@/actions';

const publicRoutes = ['/login/student', '/login/educator', '/admin/login'];

export function logoutRedirect(url) {
  const response = NextResponse.redirect(url);
  response.cookies.delete(COOKIES.ACCESS_TOKEN);
  response.cookies.delete(COOKIES.REFRESH_TOKEN);
  return response;
}

export async function middleware(request) {
  const accessToken = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIES.REFRESH_TOKEN)?.value;
  const url = request.nextUrl.clone();
  const isAdminPanelRoute = url.pathname.startsWith('/admin');

  // public routes handler
  if (publicRoutes.includes(url.pathname)) {
    if (!isTokenValid(accessToken)) {
      return NextResponse.next();
    }
    url.pathname = isAdminPanelRoute ? '/admin' : '/';
    return NextResponse.redirect(url);
  }

  // protected routes handler
  if (isTokenValid(accessToken)) {
    return NextResponse.next();

    // const userRole = decodeToken(accessToken)?.[roleProperty];
    // const isAdmin =
    //   userRole === USER_ROLE.SUPER_ADMIN || userRole === USER_ROLE.ADMIN;

    // if ((isAdminPanelRoute && isAdmin) || (!isAdminPanelRoute && !isAdmin)) {
    //   return NextResponse.next();
    // }

    // url.pathname = isAdmin ? '/admin' : '/';
    // return NextResponse.redirect(url);
  }

  if (isTokenValid(refreshToken)) {
    try {
      const { accessToken, refreshToken } = await refreshTokenAction();
      const response = NextResponse.next();

      response.cookies.set(
        COOKIES.ACCESS_TOKEN,
        accessToken,
        getCookieOptionsForToken(accessToken),
      );
      response.cookies.set(
        COOKIES.REFRESH_TOKEN,
        refreshToken,
        getCookieOptionsForToken(refreshToken, true),
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  url.pathname = isAdminPanelRoute ? '/admin/login' : '/login/student';

  return logoutRedirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
};
