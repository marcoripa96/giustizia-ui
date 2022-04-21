import { useRouter } from "next/router"
import { useMemo } from "react";

const useQueryParams = (queryParams: string[]) => {
  const router = useRouter();

  const getQueryParams = (queryParams: string[]) => {
    return queryParams.reduce((acc, param) => {
      acc[param] = router.query[param];
      return acc;
    }, {} as Record<string, any>);
  }

  const params = useMemo(() => getQueryParams(queryParams), [queryParams])

  return params;
}

export default useQueryParams;