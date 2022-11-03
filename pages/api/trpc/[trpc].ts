import { appRouter } from '@/server/routers/_app';
import * as trpcNext from '@trpc/server/adapters/next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter
})