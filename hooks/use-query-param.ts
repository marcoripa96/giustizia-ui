import { useRouter } from "next/router"

/**
 * Get a query parameter
 */
const useQueryParam = <T = any>(key: string) => {
  const router = useRouter();
  const param = router.query[key] as unknown as T;
  return param;
}

export default useQueryParam;