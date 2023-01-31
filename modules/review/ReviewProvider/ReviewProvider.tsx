import { useParam, useQueryParam } from "@/hooks";
import { GetDocumentProps } from "@/server/routers/review";
import { useQuery } from "@/utils/trpc";
import { PropsWithChildren, useReducer } from "react";
import { reviewReducer } from "./reducer";
import { ReviewDispatchContext, ReviewStateContext } from "./ReviewContext";
import { State } from "./types";

const ReviewProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sourceId, routerReady] = useParam<string>('id');
  const docId = useQueryParam('doc');
  const { data, isFetching } = useQuery(['review.getDocument', { sourceId, docId: Number(docId) }], { enabled: routerReady, staleTime: Infinity });

  if (isFetching || !data) {
    return null;
  }

  return <ReviewStateProvider data={data}>{children}</ReviewStateProvider>;
};

type ReviewStateProviderProps = {
  data: GetDocumentProps;
};

const ReviewStateProvider = ({
  data,
  children,
}: PropsWithChildren<ReviewStateProviderProps>) => {
  const [state, dispatch] = useReducer(reviewReducer, null, () => initializeState(data));

  return (
    <ReviewStateContext.Provider value={state}>
      <ReviewDispatchContext.Provider value={dispatch}>
        {children}
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
};

const initializeState = (data: GetDocumentProps): State => {
  // const cursor = 0;
  const annSet = Object.values(data.currentDocument.annotation_sets)[0];

  if (!annSet) {
    throw new Error('No annotation set to review')
  }

  return {
    ...data,
    ui: {
      totalReviewed: 0,
      currentItemCursor: 0,
      lastItemCursor: 0
    }
  }
}

export default ReviewProvider;