import { NextRequest, NextResponse } from "next/server"

export default function handler(req: NextRequest) {
  const token = process.env.NODE_ENV === 'development'
    ? req.cookies['next-auth.session-token']
    : req.cookies['__Secure-next-auth.session-token'];


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
