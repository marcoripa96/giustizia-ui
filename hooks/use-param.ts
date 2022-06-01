import { useRouter } from "next/router";

/**
 * Get a route parameter.
 */
const useParam = <T>(param: string) => {
  const router = useRouter();
  return [router.query[param] as unknown as T, router.isReady] as const;
};

export default useParam;