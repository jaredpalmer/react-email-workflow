import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host');

  if (proto !== 'https' && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(
      `https://${host}${request.nextUrl.pathname}`,
      301
    );
  }
}

export const config = {
  matcher: '/:path*',
};
