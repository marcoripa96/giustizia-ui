import { User } from "@/lib/session";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

const login = (username: string, password: string) => {
  const isLoggedIn = password === process.env.ACCESS_PASSWORD && username === process.env.ACCESS_USERNAME;

  if (!isLoggedIn) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Invalid password'
    })
  }
  const user = { username, isLoggedIn, date: new Date().toISOString() } as User;
  return user;
}

export const auth = createRouter()
  .query('login', {
    input: z
      .object({
        username: z.string(),
        password: z.string(),
      }),
    resolve: async ({ input, ctx }) => {
      const { req } = ctx;
      const { username, password } = input;
      const user = login(username, password);
      req.session.user = user;
      await req.session.save();
      return user;
    },
  })
  .query('logout', {
    resolve: async ({ ctx }) => {
      const { req } = ctx;
      req.session.destroy();
      return {
        isLoggedIn: false,
        date: '',
        username: ''
      };
    },
  })
  .query('user', {
    resolve: async ({ ctx }) => {
      const { req } = ctx;
      if (req.session.user) {
        return req.session.user;
      }
      return {
        isLoggedIn: false,
        date: '',
        username: ''
      }
    },
  })