import { FetchError, FetchRequestInit } from "@/lib/fetchJson";
import { useState } from "react";

type MutationFetcher<JSON = unknown> = (fetchOptions?: FetchRequestInit) => Promise<JSON>;

type MutationState<JSON = unknown> = {
  data: JSON | null;
  loading: boolean;
  error: FetchError | null;
}

const useMutation = <JSON = unknown>(mutationFetcher: MutationFetcher<JSON>, initialValue?: JSON) => {
  const [state, setState] = useState<MutationState<JSON>>({ data: initialValue || null, loading: false, error: null });

  const mutate = (fetchOptions: FetchRequestInit = {}) => {
    setState({ data: null, loading: true, error: null });
    return new Promise<JSON>((resolve, reject) => {
      mutationFetcher(fetchOptions).then((data) => {
        setState({ data, loading: false, error: null });
        resolve(data);
      }).catch((error: any) => {
        setState({ data: null, loading: false, error });
      })
    })

    // mutationFetcher().then((data) => {
    //   setState({ data, loading: false, error: null });
    // }).catch((error) => {
    //   setState({ data: null, loading: false, error });
    // })
  }

  return {
    ...state,
    mutate
  }
};

export default useMutation;