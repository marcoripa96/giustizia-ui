import { Candidate } from "@/server/routers/document";
import { createReducer } from "@/utils/createReducer";
import { Action, State } from "./types";
import { addIfUnique, setNextItem } from "./utils";

export const reviewReducer = createReducer<State, Action>({
  setState: (state, payload) => {
    if (payload.data.isLoading) {
      return {
        ...state,
        isLoading: payload.data.isLoading
      }
    }
    return {
      ...state,
      ...payload.data
    }
  },
  setActiveItem: (state, payload) => {
    return {
      ...state,
      ui: {
        ...state.ui,
        currentItemCursor: payload.cursor
      }
    }
  },
  updateTime: (state, payload) => {
    if (!state.currentDocument) {
      return state;
    }

    const annSet = Object.keys(state.currentDocument.annotation_sets)[0];
    const { time, cursor } = payload;

    return {
      ...state,
      currentDocument: {
        ...state.currentDocument,
        annotation_sets: {
          ...state.currentDocument.annotation_sets,
          [annSet]: {
            ...state.currentDocument.annotation_sets[annSet],
            annotations: state.currentDocument.annotation_sets[annSet].annotations.map((ann, index) => {
              if (cursor === index) {
                return {
                  ...ann,
                  features: {
                    ...ann.features,
                    review_time: time
                  }
                }
              }
              return ann;
            })
          }
        }
      }
    }
  },
  addCandidateOptionItem: (state, payload) => {
    if (!state.currentDocument) {
      return state;
    }
    const annSet = Object.keys(state.currentDocument.annotation_sets)[0];
    const { cursor, index, candidate } = payload;

    let selectedCandidate = candidate as Candidate;

    if (!candidate && cursor == null && index == null) {
      return state;
    }

    if (cursor != null && index != null) {
      selectedCandidate = state.currentDocument.annotation_sets[annSet].annotations[cursor].features.additional_candidates[index];
    }

    const newState: State = {
      ...state,
      currentDocument: {
        ...state.currentDocument,
        annotation_sets: {
          ...state.currentDocument.annotation_sets,
          [annSet]: {
            ...state.currentDocument.annotation_sets[annSet],
            annotations: state.currentDocument.annotation_sets[annSet].annotations.map((ann, index) => {
              if (index === cursor) {
                return {
                  ...ann,
                  features: {
                    ...ann.features,
                    additional_candidates: addIfUnique(ann.features.additional_candidates, selectedCandidate)
                  }
                }
              }
              return ann;
            })
          }
        }
      }
    }

    return setNextItem(newState, payload);
  },
  nextAnnotation: (state, payload) => {
    return setNextItem(state, payload);
  },
  prevAnnotation: (state, payload) => {
    const cursor = state.ui.currentItemCursor;
    return {
      ...state,
      ui: {
        ...state.ui,
        currentItemCursor: cursor > 0 ? cursor - 1 : 0
      }
    }
  }
});
