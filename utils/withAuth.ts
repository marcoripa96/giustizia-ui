import { ProcedureType } from '@trpc/server';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { TRPCError } from '@trpc/server';
import { Context } from '@/server/context';

export const withAuth = <TInput, TOutput>(resolver: ProcedureResolver<Context, TInput, TOutput>) => {
  return (opts: {
    ctx: Context;
    input: TInput;
    type: ProcedureType;
  }) => {
    // when in production check if authenticated
    if (process.env.NODE_ENV === 'production') {
      const { user } = opts.ctx.req.session;
      if (!user) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Resource requires authentication',
        });
      }
    }

    return resolver(opts);
  }
}