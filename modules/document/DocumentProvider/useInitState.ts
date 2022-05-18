import { useParam } from "@/hooks";
import { useQuery } from "@/utils/trpc";
import { useEffect, useReducer } from "react";
import { Document, NERAnnotation } from '@/server/routers/document';
import { documentState } from "./state";
import { documentReducer } from "./reducer";

export type DocumentState = {
  id: number;
  title: string;
  text: string;
  annotation: NERAnnotation[];
  lastIndexId: number;
};

const processDocument = (data: Document): DocumentState => {
  const state = {
    ...data,
    annotation: data.annotation.map((annotation, index) => ({ ...annotation, id: index })),
    lastIndexId: data.annotation.length - 1
  };

  return state;
}


/**
 * Retrieve document data and set initial state
 */
export const useInitState = () => {
  const [id] = useParam<string>('id');
  const { data } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });
  const [state, dispatch] = useReducer(documentReducer, documentState);

  useEffect(() => {
    if (data) {
      const document = processDocument(data);
      dispatch({
        type: 'setData',
        payload: { data: document }
      })
    }
  }, [data]);


  return {
    state,
    dispatch
  };
}