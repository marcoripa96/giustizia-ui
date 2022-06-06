import { useParam } from "@/hooks";
import { useQuery } from "@/utils/trpc";
import { useEffect, useReducer } from "react";
import { documentState } from "./state";
import { documentReducer } from "./reducer";



// const processDocument = (data: Document): DocumentState => {
//   const state = {
//     ...data,
//     annotation: data.annotation.map((annotation, index) => ({ ...annotation, id: index })),
//     lastIndexId: data.annotation.length - 1
//   };

//   return state;
// }


/**
 * Retrieve document data and set initial state
 */
export const useInitState = () => {
  const [id] = useParam<string>('id');
  const { data } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });
  const [state, dispatch] = useReducer(documentReducer, documentState);

  useEffect(() => {
    if (data) {
      // const document = processDocument(data);
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