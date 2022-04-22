import { Annotation } from "@/components/NERDocumentViewer";
import { useParam } from "@/hooks";

import { useQuery } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { Document } from '@/server/routers/document';

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: Annotation[];
  lastIndexId: number;
};

const getState = (data: Document): DocumentState => {
  const state = {
    ...data,
    annotations: data.annotations.map((annotation, index) => ({ id: index, ...annotation })),
    lastIndexId: data.annotations.length - 1
  };

  return state;
}

/**
 * Returns a document details and set state to modify it
 */
export const useDocument = () => {
  const [id] = useParam<string>('id');
  const { data } = useQuery(['document.getDocument', { id }]);
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