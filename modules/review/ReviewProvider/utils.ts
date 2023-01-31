import { Candidate } from "@/server/routers/document";
import { State } from "./types";

export const addIfUnique = (candidates: Candidate[], candidate: Candidate) => {
  if (candidates.find((cand) => cand.url === candidate.url)) {
    return candidates;
  }
  return candidates.concat(candidate);
}

export const setNextItem = (state: State, candidate: Candidate) => {
  const annSet = Object.keys(state.currentDocument.annotation_sets)[0];

  if (!annSet) {
    return state;
  }
  const { currentItemCursor, lastItemCursor } = state.ui;

  const nAnnotations = state.currentDocument.annotation_sets[annSet].annotations.length;
  const isLastItem = currentItemCursor === nAnnotations - 1;

  const newState: State = {
    ...state,
    currentDocument: {
      ...state.currentDocument,
      annotation_sets: {
        ...state.currentDocument.annotation_sets,
        [annSet]: {
          ...state.currentDocument.annotation_sets[annSet],
          annotations: state.currentDocument.annotation_sets[annSet].annotations.map((ann, index) => {
            if (index === currentItemCursor) {
              return {
                ...ann,
                features: {
                  ...ann.features,
                  title: candidate.title,
                  url: candidate.url
                }
              }
            }
            return ann;
          })
        }
      }
    },
    ui: {
      ...state.ui,
      totalReviewed: state.ui.totalReviewed > lastItemCursor ? state.ui.totalReviewed : state.ui.totalReviewed + 1,
      ...(currentItemCursor === lastItemCursor ? {
        lastItemCursor: isLastItem ? lastItemCursor : lastItemCursor + 1,
        currentItemCursor: isLastItem ? lastItemCursor : lastItemCursor + 1
      } : {
        currentItemCursor: currentItemCursor + 1
      })
    }
  }

  return newState;
}