import { useRouter } from "next/router";

const useParam = (param: string) => {
  const router = useRouter();
  return [router.query[param], router.isReady] as const;
};

export default useParam;