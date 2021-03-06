import { createRouter } from '../context';
import { annotations } from './annotation';
import { documents } from './document';
import { infer } from './infer';

// export type definition of API
export type AppRouter = typeof appRouter;

export const appRouter = createRouter()
  .merge('document.', documents)
  .merge('annotation.', annotations)
  .merge('infer.', infer)