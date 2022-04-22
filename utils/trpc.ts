
import { AppRouter } from '@/server/routers/_app';
import { createReactQueryHooks } from '@trpc/react';


export const { useQuery, useMutation, useInfiniteQuery, useSubscription } = createReactQueryHooks<AppRouter>();