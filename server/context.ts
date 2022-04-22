import { sessionOptions } from "@/lib/session";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getIronSession, IronSession, } from "iron-session";


function getPropertyDescriptorForReqSession(
  session: IronSession,
): PropertyDescriptor {
  return {
    enumerable: true,
    get() {
      return session;
    },
    set(value) {
      const keys = Object.keys(value);
      const currentKeys = Object.keys(session);

      currentKeys.forEach((key) => {
        if (!keys.includes(key)) {
          // @ts-ignore See comment in IronSessionData interface
          delete session[key];
        }
      });

      keys.forEach((key) => {
        // @ts-ignore See comment in IronSessionData interface
        session[key] = value[key];
      });
    },
  };
}



// The app's context - is generated for each incoming request
export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const session = await getIronSession(req, res, sessionOptions);

  Object.defineProperty(
    req,
    "session",
    getPropertyDescriptorForReqSession(session),
  );

  return {
    req,
    res
  }
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}