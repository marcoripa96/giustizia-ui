import { NextRequest, NextResponse } from "next/server"



export default function handler(req: NextRequest) {
  if (process.env.NO_LOGIN === 'true') {
    if (process.env.STATALE_MODE === 'true') {
      if (!(req.nextUrl.pathname.match(/\/documents\/\d+/)) && !req.nextUrl.pathname.includes('api')) {
        const url = req.nextUrl.clone();

        url.pathname = `/404`;
        return NextResponse.rewrite(url);
      }
    }
    return NextResponse.next();
  }

  const token = req.cookies['next-auth.session-token'] || req.cookies['__Secure-next-auth.session-token'];

  const authorized = !!token;

  if (authorized) {
    if (req.nextUrl.pathname === '/sign-in') {
      const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/infer`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    if (req.nextUrl.pathname !== '/sign-in' && !req.nextUrl.pathname.includes('/api/auth')) {
      const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_PATH}/sign-in`, req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
