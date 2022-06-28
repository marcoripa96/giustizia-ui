import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export default withAuth(
  // not sure why the typyings are wrong
  // @ts-ignore
  function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/sign-in') {
      return NextResponse.redirect(
        new URL('/infer', req.url)
      );
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/sign-in'
    }
  }
)