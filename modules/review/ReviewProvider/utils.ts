import { Candidate } from "@/server/routers/document";
import { State } from "./types";

export const addIfUnique = (candidates: Candidate[], candidate: Candidate) => {
  if (candidates.find((cand) => cand.url === candidate.url)) {
    return candidates;
  }

  return candidates.concat(candidate);
}

export const setNextItem = (state: State, { cursor, index, candidate }: { cursor?: number; index?: number; candidate?: Candidate; }) => {
  if (!state.currentDocument) {
    return state;
  }
  const annSet = Object.keys(state.currentDocument.annotation_sets)[0];

  let selectedCandidate = candidate as Candidate;

  if (!candidate && cursor == null && index == null) {
    return state;
  }

  if (cursor != null && index != null) {
    selectedCandidate = state.currentDocument.annotation_sets[annSet].annotations[cursor].features.additional_candidates[index];
  }

  const { currentItemCursor, lastItemCursor } = state.ui;

  const nAnnotations = state.currentDocument.annotation_sets[annSet].annotations.length;
  const isLastItem = currentItemCursor === nAnnotations - 1;
  const doneIdsSet = new Set(state.doneIds);

  const newDoneIds = isLastItem && doneIdsSet.has(state.docId) ? [...state.doneIds, state.docId] : state.doneIds;

  const newState: State = {
    ...state,
    doneIds: newDoneIds,
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
                  title: selectedCandidate?.title,
                  url: selectedCandidate?.url
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
      totalReviewed: currentItemCursor < lastItemCursor ? state.ui.totalReviewed : state.ui.totalReviewed + 1,
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

export const createNewCandidate = (candidate: Partial<Candidate>): Candidate => {
  return {
    id: 0,
    indexer: 0,
    norm_score: 0,
    raw_score: 0,
    score: 0,
    title: '',
    url: '',
    ...candidate
  }
}