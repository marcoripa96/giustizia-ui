import { Candidate } from "@/server/routers/document";
import { useContext } from "react";
import { createSelector } from "reselect";
import { ReviewDispatchContext, ReviewStateContext } from "./ReviewContext";
import { State } from "./types";

export const useReviewState = () => {
  const context = useContext(ReviewStateContext);

  if (context === undefined) {
    throw new Error('useReviewState must be used within a ReviewProvider');
  }

  return context;
};

/**
 * Access the document disptach within the DocumentProvider.
 */
export const useReviewDispatch = () => {
  const context = useContext(ReviewDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useReviewDispatch must be used within a ReviewProvider'
    );
  }

  return context;
};

/**
 * An hook to select the state partially
 */
export function useSelector<T>(cb: (state: State) => T) {
  const _state = useReviewState();
  return cb(_state);
}

export const selectCurrentDocument = (state: State) => state.currentDocument;
export const selectUIState = (state: State) => state.ui;
export const selectDocId = (state: State) => state.docId;
export const selectDoneIds = (state: State) => state.doneIds;
export const selectSourceInfo = (state: State) => ({
  id: state.id,
  name: state.name,
  done: state.doneIds.length,
  total: state.total,
  doneIds: state.doneIds,
  hasNextPage: state.hasNextPage,
  hasPreviousPage: state.hasPreviousPage
})

export const selectIsDocDone = createSelector(
  selectDocId,
  selectDoneIds,
  (docId, doneIds) => new Set(doneIds).has(docId)
)

export const selectListAnnotations = createSelector(
  selectCurrentDocument,
  selectUIState,
  (doc, uiState) => {
    if (!doc) {
      return [];
    }
    const annSet = Object.values(doc.annotation_sets)[0];
    const { lastItemCursor } = uiState;
    const { text } = doc;
    const currentAnnotationItems = annSet.annotations.slice(0, lastItemCursor + 1);

    return currentAnnotationItems.map((ann) => {
      const startTextOffset = ann.start - 500 < 0 ? 0 : ann.start - 500;
      const endTextOffset = ann.end + 500 > text.length ? text.length : ann.end + 500;
      const startAnnRelativeOffset = ann.start - startTextOffset;
      const endAnnRelativeOffset = startAnnRelativeOffset + (ann.end - ann.start);
      return {
        text: text.slice(startTextOffset, endTextOffset),
        annotation: ann,
        startAnnRelativeOffset,
        endAnnRelativeOffset
      }
    })
  }
);

export const selectCurrentEntities = createSelector(
  selectCurrentDocument,
  (doc) => {
    if (!doc) {
      return [];
    }
    const annSet = Object.keys(doc.annotation_sets)[0];

    const candidatesIndex = doc.annotation_sets[annSet].annotations.reduce((acc, ann) => {
      if (!ann?.features?.additional_candidates) {
        return acc;
      }
      for (const candidate of ann.features.additional_candidates) {
        if (!(candidate.url in acc)) {
          acc[candidate.url] = candidate;
        }
      }
      return acc;
    }, {} as Record<string, Candidate>);

    return Object.values(candidatesIndex);
  }
);

export const selectCurrentAnnotation = createSelector(
  selectCurrentDocument,
  selectUIState,
  (doc, uiState) => {
    if (!doc) {
      return undefined;
    }
    const annSet = Object.values(doc.annotation_sets)[0];

    const { currentItemCursor } = uiState;
    return annSet.annotations[currentItemCursor];
  }
);

export const selectProgress = createSelector(
  selectCurrentDocument,
  selectUIState,
  (doc, uiState) => {
    if (!doc) {
      return {
        completion: 0,
        totalReviewed: 0,
        total: 0,
        cursor: 0
      };
    }
    const annSet = Object.values(doc.annotation_sets)[0];
    // const totalWithAnnotation = annSet.annotations.reduce((acc, ann) => ann.features.url ? acc + 1 : acc, 0);
    return {
      completion: (uiState.totalReviewed / annSet.annotations.length) * 100,
      done: uiState.totalReviewed,
      total: annSet.annotations.length,
      cursor: uiState.currentItemCursor
    };
  }
);

export const selectAvgTime = createSelector(
  selectCurrentDocument,
  selectUIState,
  (doc, uiState) => {
    if (!doc) {
      return 0
    }

    const annSet = Object.values(doc.annotation_sets)[0];

    const { lastItemCursor } = uiState;
    const items = annSet.annotations.slice(0, lastItemCursor)
    // TODO: there should be a property indicating whether or not the item is already been reviewed
    // const items = listAnnotations.slice(0, listAnnotations.length - 1);
    return items.length === 0 ? 0 : items.reduce((acc, item) => acc + (item.features.review_time || 0), 0) / items.length;
  }
);

export const selectDocumentToSave = createSelector(
  selectCurrentDocument,
  selectAvgTime,
  (doc, avgTime) => {
    if (!doc) {
      return undefined;
    }

    return {
      ...doc,
      features: {
        ...doc.features,
        avgReviewTime: avgTime
      }
    }
  }
);



