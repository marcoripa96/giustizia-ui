import { useParam } from "@/hooks";
import { useQuery } from "@/utils/trpc";
import { useEffect, useReducer } from "react";
import { documentState } from "./state";
import { documentReducer } from "./reducer";

/**
 * Retrieve document data and set initial state
 */
export const useInitState = () => {
  const [id] = useParam<string>('id');
  const { data } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });
  const [state, dispatch] = useReducer(documentReducer, documentState);

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'setData',
        payload: { data }
      })
    }
  }, [data]);


  return {
    state,
    dispatch
  };
}