import { useParam, useQueryParam } from "@/hooks";
import { GetDocumentProps, GetSourceProps } from "@/server/routers/review";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { PropsWithChildren, useEffect, useReducer } from "react";
import { reviewReducer } from "./reducer";
import { ReviewDispatchContext, ReviewStateContext } from "./ReviewContext";
import { State } from "./types";

const ReviewProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sourceId, routerReady] = useParam<string>('source');
  const [docId] = useParam<string>('doc');
  const { data: sourceData, isFetching: isFetchingSource } = useQuery(['review.getSource', { sourceId }], { enabled: routerReady, staleTime: Infinity });
  const { data: docData, isFetching: isFetchingDocData } = useQuery(['review.getDocument', { sourceId, docId }], { enabled: routerReady, staleTime: Infinity });

  const isLoading = isFetchingDocData || isFetchingSource || !docData || !sourceData;

  return <ReviewStateProvider sourceData={sourceData} docData={docData} isLoading={isLoading}>{children}</ReviewStateProvider>;
};

type ReviewStateProviderProps = {
  sourceData: GetSourceProps | undefined;
  docData: GetDocumentProps | undefined;
  isLoading: boolean;
}

const initialState = {
  id: '',
  docId: '',
  name: '',
  total: 0,
  done: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  currentDocument: undefined,
  isLoading: true,
  ui: {
    totalReviewed: 0,
    currentItemCursor: 0,
    lastItemCursor: 0,
  }
}

const ReviewStateProvider = ({
  sourceData,
  docData,
  isLoading,
  children,
}: PropsWithChildren<ReviewStateProviderProps>) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'setState',
      payload: {
        data: initializeState({ sourceData, docData, isLoading: false })
      }
    })
  }, [sourceData, docData, isLoading]);

  return (
    <ReviewStateContext.Provider value={state}>
      <ReviewDispatchContext.Provider value={dispatch}>
        {children}
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
};

const initializeState = ({ docData, sourceData, isLoading }: ReviewStateProviderProps): State => {
  if (!docData || !sourceData) {
    return initialState;
  }

  const annSet = Object.values(docData.currentDocument.annotation_sets)[0];

  if (!annSet) {
    throw new Error('No annotation set to review')
  }

  return {
    ...docData,
    ...sourceData,
    isLoading,
    ui: {
      totalReviewed: 0,
      currentItemCursor: 0,
      lastItemCursor: 0
    }
  }
}

export default ReviewProvider;