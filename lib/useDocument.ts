import { Annotation } from "@/components/NERDocumentViewer";
import { useGet, useParam } from "@/hooks";
import { DocumentByIdResponse } from "@/pages/api/document/[id]";

export type DocumentState = {
  id: string;
  title: string;
  content: string;
  annotations: Annotation[];
  lastIndexId: number;
};

const getState = (data: DocumentByIdResponse): DocumentState => {
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
  const [id] = useParam('id');
  const data = useGet(id ? `/api/document/${id}` : '', {
    transformFn: getState
  });
  return data;
}