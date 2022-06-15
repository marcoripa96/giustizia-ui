import { useRouter } from "next/router";

const useHashUrlId = () => {
  const { asPath: url } = useRouter();

  if (!url || !url.includes('#')) {
    return undefined;
  }
  const id = url.split('#')[1];
  return id;
};

export default useHashUrlId;