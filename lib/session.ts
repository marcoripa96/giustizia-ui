// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session'
// import type { User } from 'pages/api/user'

export const sessionOptions: IronSessionOptions = {
  password: process.env.NODE_ENV === 'development'
    ? 'LUP6uig17jURpgGyiMoC1q1FJRFT1MXR'
    : process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'user-session-gui',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export type User = {
  isLoggedIn: boolean;
  date: string;
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}