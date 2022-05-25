import { useParam } from "@/hooks";

import { useQuery } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { Document, NERAnnotation } from '@/server/routers/document';

export type DocumentState = {
  id: number;
  title: string;
  text: string;
  annotation: NERAnnotation[];
  lastIndexId: number;
};

const getState = (data: Document): DocumentState => {
  const state = {
    ...data,
    annotation: data.annotation.map((annotation, index) => ({ ...annotation, id: index })),
    lastIndexId: data.annotation.length - 1
  };

  return state;
}

/**
 * Returns a document details and set state to modify it
 */
export const useQueryDocument = () => {
  const [id] = useParam<string>('id');
  const { data } = useQuery(['document.getDocument', { id: parseInt(id) }], { staleTime: Infinity });
  const [document, setDocument] = useState<DocumentState | undefined>();

  useEffect(() => {
    if (data) {
      setDocument(getState(data));
    }
  }, [data]);

  const mutate = (cb: (s: DocumentState | undefined) => DocumentState | undefined) => {
    setDocument((s) => {
      const _s = cb(s);
      return _s;
    })
  };

  return {
    document,
    setDocument: mutate
  };
}