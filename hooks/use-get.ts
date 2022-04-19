import fetchJson, { FetchError } from "@/lib/fetchJson";
import { useCallback, useEffect, useRef, useState } from "react";

const _cache: Map<string, unknown> = new Map();

type UseGetOptions<T, S> = {
  transformFn?: (data: T) => S,
  skipCache?: boolean;
}

const defaultOptions = {
  skipCache: false
}

/**
 * A simple hook to query GET requests. I didn't want to use 
 */
const useGet = <T = unknown, S = any>(
  key: string | null,
  options?: UseGetOptions<T, S>
) => {
  const [data, setData] = useState<S>();
  const [error, setError] = useState<FetchError>();


  const {
    skipCache,
    transformFn
  } = {
    ...defaultOptions,
    ...options
  }


  useEffect(() => {
    if (!key) {
      return;
    }

    if (!skipCache) {
      // if cache contains key just use that value
      const cache = _cache.get(key);

      if (cache) {
        setData(cache as S);
        return;
      }
    }
    // it's fine to call multiple setStates, the component will be optimized to rerender only once
    // setData(undefined);
    fetchJson<void, T>(key)
      .then((data) => {
        const state = transformFn ? transformFn(data) : data as unknown as S;
        setData(state);
        setError(undefined);
        _cache.set(key, state)
      })
      .catch((error) => setError(error))

  }, [key, transformFn, skipCache]);

  // mutate the local state and set the new cache
  const mutate = useCallback((cb: (s: S | undefined) => S | undefined) => {
    if (!key) return;
    setData((s) => {
      const _s = cb(s);
      _cache.set(key, _s);
      return _s;
    })
  }, [key, setData])


  return {
    data,
    isLoading: !data && !error,
    error,
    mutate
  }
};

export default useGet;