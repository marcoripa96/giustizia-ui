import { useRouter } from "next/router"

/**
 * Get a query parameter
 */
const useQueryParam = (key: string) => {
  const router = useRouter();
  if (router.query) {
    return router.query[key] as unknown as string;
  }
  return '';
}

export default useQueryParam;