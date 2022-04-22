import { User } from "@/lib/session";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../context";

const login = (password: string) => {
  const isLoggedIn = password === process.env.ACCESS_PASSWORD;

  if (!isLoggedIn) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Invalid password'
    })
  }
  const user = { isLoggedIn, date: new Date().toISOString() } as User;
  return user;
}

export const auth = createRouter()
  .query('login', {
    input: z
      .object({
        password: z.string(),
      }),
    resolve: async ({ input, ctx }) => {
      const { req } = ctx;
      const { password } = input;
      const user = login(password);
      req.session.user = user;
      await req.session.save();
      return user;
    },
  })