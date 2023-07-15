import { createRouter } from '../context';
import { annotations } from './annotation';
import { documents } from './document';
import { infer } from './infer';
import { review } from './review';
import { search } from './search';
import { taxonomy } from './taxonomy';
import { wikipedia } from './wikipedia';

// export type definition of API
export type AppRouter = typeof appRouter;

export const appRouter = createRouter()
  .merge('document.', documents)
  .merge('annotation.', annotations)
  .merge('infer.', infer)
  .merge('taxonomy', taxonomy)
  .merge('review.', review)
  .merge('wikipedia.', wikipedia)
  .merge('search.', search)