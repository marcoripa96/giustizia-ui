import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./session";

type WithAuthSsrOptions = {
  destination?: string;
  redirectWhen?: 'isLoggedIn' | 'isNotLoggedIn';
}

const defaultOptions = {
  destination: '/login',
  redirectWhen: 'isNotLoggedIn'
} as WithAuthSsrOptions;

export const withAuthSsr = (handler: GetServerSideProps, options?: WithAuthSsrOptions) => withIronSessionSsr(async (context: GetServerSidePropsContext) => {
  if (process.env.NODE_ENV === 'production') {
    const { req } = context
    const user = req.session.user

    const { destination, redirectWhen } = { ...defaultOptions, ...options };

    const condition = redirectWhen === 'isNotLoggedIn' ? !user : !(!user);

    if (condition) {
      return {
        redirect: {
          destination: destination || '/login',
          statusCode: 302,
        },
      }
    }
  }

  return handler(context)
}, sessionOptions)
